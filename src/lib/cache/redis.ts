/**
 * Redis Cache Configuration with Enterprise Security
 * Multi-tenant caching with encryption and security
 */

import Redis from 'ioredis';
import { createHash } from 'crypto';

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  retryDelayOnFailover: number;
  maxRetriesPerRequest: number;
  lazyConnect: boolean;
  keepAlive: number;
  connectTimeout: number;
  commandTimeout: number;
}

const getRedisConfig = (): RedisConfig => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || (isProduction ? undefined : 'redis_password_2024'),
    db: parseInt(process.env.REDIS_DB || '0'),
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    keepAlive: 30000,
    connectTimeout: 10000,
    commandTimeout: 5000
  };
};

// Create Redis connection
const config = getRedisConfig();
export const redis = new Redis(config);

// Handle Redis connection events
redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error);
});

redis.on('close', () => {
  console.log('⚠️ Redis connection closed');
});

// Cache key generation with tenant isolation
export const generateCacheKey = (tenantId: string, prefix: string, ...parts: string[]): string => {
  const keyParts = [tenantId, prefix, ...parts];
  return keyParts.join(':');
};

// Secure cache key with hashing for sensitive data
export const generateSecureCacheKey = (tenantId: string, prefix: string, data: any): string => {
  const dataHash = createHash('sha256').update(JSON.stringify(data)).digest('hex').substring(0, 16);
  return generateCacheKey(tenantId, prefix, dataHash);
};

// Cache operations with encryption
export class SecureCache {
  private redis: Redis;
  private encryptionKey: string;

  constructor(redisInstance: Redis, encryptionKey: string) {
    this.redis = redisInstance;
    this.encryptionKey = encryptionKey;
  }

  // Set cache with TTL and encryption
  async set(
    key: string, 
    value: any, 
    ttlSeconds: number = 3600,
    encrypt: boolean = true
  ): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      const finalValue = encrypt ? this.encrypt(serializedValue) : serializedValue;
      
      await this.redis.setex(key, ttlSeconds, finalValue);
    } catch (error) {
      console.error('Cache set error:', error);
      throw error;
    }
  }

  // Get cache with decryption
  async get(key: string, decrypt: boolean = true): Promise<any> {
    try {
      const value = await this.redis.get(key);
      if (!value) return null;

      const finalValue = decrypt ? this.decrypt(value) : value;
      return JSON.parse(finalValue);
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Delete cache
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
      throw error;
    }
  }

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  // Set multiple keys
  async mset(keyValuePairs: Record<string, any>, ttlSeconds: number = 3600): Promise<void> {
    try {
      const pipeline = this.redis.pipeline();
      
      for (const [key, value] of Object.entries(keyValuePairs)) {
        const serializedValue = JSON.stringify(value);
        const encryptedValue = this.encrypt(serializedValue);
        pipeline.setex(key, ttlSeconds, encryptedValue);
      }
      
      await pipeline.exec();
    } catch (error) {
      console.error('Cache mset error:', error);
      throw error;
    }
  }

  // Get multiple keys
  async mget(keys: string[]): Promise<any[]> {
    try {
      const values = await this.redis.mget(...keys);
      return values.map(value => {
        if (!value) return null;
        const decryptedValue = this.decrypt(value);
        return JSON.parse(decryptedValue);
      });
    } catch (error) {
      console.error('Cache mget error:', error);
      return [];
    }
  }

  // Increment counter
  async incr(key: string, ttlSeconds: number = 3600): Promise<number> {
    try {
      const pipeline = this.redis.pipeline();
      pipeline.incr(key);
      pipeline.expire(key, ttlSeconds);
      const results = await pipeline.exec();
      return results?.[0]?.[1] as number || 0;
    } catch (error) {
      console.error('Cache incr error:', error);
      throw error;
    }
  }

  // Set with lock (for distributed locks)
  async setWithLock(
    key: string, 
    value: any, 
    ttlSeconds: number = 3600,
    lockTtlSeconds: number = 10
  ): Promise<boolean> {
    try {
      const lockKey = `${key}:lock`;
      const lockValue = Date.now().toString();
      
      // Try to acquire lock
      const lockAcquired = await this.redis.set(lockKey, lockValue, 'PX', lockTtlSeconds * 1000, 'NX');
      
      if (!lockAcquired) {
        return false; // Lock already exists
      }
      
      // Set the actual value
      await this.set(key, value, ttlSeconds);
      
      // Release lock
      await this.redis.del(lockKey);
      
      return true;
    } catch (error) {
      console.error('Cache setWithLock error:', error);
      return false;
    }
  }

  // Simple encryption/decryption (for demo - use proper encryption in production)
  private encrypt(text: string): string {
    // In production, use proper encryption like AES-256
    return Buffer.from(text).toString('base64');
  }

  private decrypt(encryptedText: string): string {
    // In production, use proper decryption
    return Buffer.from(encryptedText, 'base64').toString('utf-8');
  }
}

// Cache strategies
export class CacheStrategies {
  private cache: SecureCache;

  constructor(cache: SecureCache) {
    this.cache = cache;
  }

  // Cache-aside pattern
  async cacheAside<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    ttlSeconds: number = 3600
  ): Promise<T> {
    try {
      // Try to get from cache first
      let data = await this.cache.get(key);
      
      if (data === null) {
        // Cache miss - fetch from source
        data = await fetchFunction();
        
        // Store in cache
        if (data !== null) {
          await this.cache.set(key, data, ttlSeconds);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Cache-aside error:', error);
      // Fallback to direct fetch
      return await fetchFunction();
    }
  }

  // Write-through pattern
  async writeThrough<T>(
    key: string,
    value: T,
    writeFunction: (value: T) => Promise<void>,
    ttlSeconds: number = 3600
  ): Promise<void> {
    try {
      // Write to source first
      await writeFunction(value);
      
      // Then update cache
      await this.cache.set(key, value, ttlSeconds);
    } catch (error) {
      console.error('Write-through error:', error);
      throw error;
    }
  }

  // Write-behind pattern
  async writeBehind<T>(
    key: string,
    value: T,
    writeFunction: (value: T) => Promise<void>,
    ttlSeconds: number = 3600
  ): Promise<void> {
    try {
      // Update cache immediately
      await this.cache.set(key, value, ttlSeconds);
      
      // Queue for background write (implement with job queue)
      // For now, write immediately
      await writeFunction(value);
    } catch (error) {
      console.error('Write-behind error:', error);
      throw error;
    }
  }
}

// Create cache instance
const encryptionKey = process.env.CACHE_ENCRYPTION_KEY || 'intellecty_cache_key_2024';
export const secureCache = new SecureCache(redis, encryptionKey);
export const cacheStrategies = new CacheStrategies(secureCache);

// Cache key constants
export const CACHE_KEYS = {
  USER_SESSION: (tenantId: string, userId: string) => 
    generateCacheKey(tenantId, 'session', userId),
  FORECAST_DATA: (tenantId: string, productId: string, horizon: number) => 
    generateCacheKey(tenantId, 'forecast', productId, horizon.toString()),
  INVENTORY_DATA: (tenantId: string, productId: string) => 
    generateCacheKey(tenantId, 'inventory', productId),
  EXTERNAL_API: (apiName: string, params: string) => 
    generateCacheKey('global', 'api', apiName, params),
  ANALYTICS_DATA: (tenantId: string, reportType: string, dateRange: string) => 
    generateCacheKey(tenantId, 'analytics', reportType, dateRange),
  MODEL_PREDICTION: (tenantId: string, modelType: string, inputHash: string) => 
    generateSecureCacheKey(tenantId, 'model', { modelType, inputHash })
};

// Test Redis connection
export const testRedisConnection = async (): Promise<boolean> => {
  try {
    await redis.ping();
    console.log('✅ Redis connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Redis connection test failed:', error);
    return false;
  }
};

export default redis;
