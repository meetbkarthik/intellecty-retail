/**
 * Enterprise Security Middleware
 * Comprehensive security at all layers
 */

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { validate } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Security configuration
export const SECURITY_CONFIG = {
  JWT_SECRET: process.env.NEXTAUTH_SECRET || 'intellecty-secret-key-2024',
  JWT_EXPIRES_IN: '24h',
  BCRYPT_ROUNDS: 12,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex')
};

// Rate limiting configuration
export const createRateLimit = (options: {
  windowMs?: number;
  max?: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
}) => {
  return rateLimit({
    windowMs: options.windowMs || SECURITY_CONFIG.RATE_LIMIT_WINDOW_MS,
    max: options.max || SECURITY_CONFIG.RATE_LIMIT_MAX_REQUESTS,
    message: options.message || 'Too many requests from this IP, please try again later.',
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Authentication middleware
export const authenticateRequest = async (request: NextRequest): Promise<{
  isAuthenticated: boolean;
  user?: any;
  tenantId?: string;
  error?: string;
}> => {
  try {
    const token = await getToken({ 
      req: request, 
      secret: SECURITY_CONFIG.JWT_SECRET 
    });

    if (!token) {
      return { isAuthenticated: false, error: 'No authentication token provided' };
    }

    // Validate token structure
    if (!token.sub || !token.email) {
      return { isAuthenticated: false, error: 'Invalid token structure' };
    }

    // Extract tenant information
    const tenantId = token.tenantId as string;
    if (!tenantId) {
      return { isAuthenticated: false, error: 'No tenant context found' };
    }

    return {
      isAuthenticated: true,
      user: {
        id: token.sub,
        email: token.email,
        name: token.name,
        role: token.role,
        tenantId: tenantId
      },
      tenantId: tenantId
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { isAuthenticated: false, error: 'Authentication failed' };
  }
};

// Authorization middleware
export const authorizeRequest = (requiredRoles: string[]) => {
  return async (request: NextRequest): Promise<{
    isAuthorized: boolean;
    error?: string;
  } => {
    try {
      const authResult = await authenticateRequest(request);
      
      if (!authResult.isAuthenticated) {
        return { isAuthorized: false, error: authResult.error };
      }

      const userRole = authResult.user?.role;
      if (!userRole || !requiredRoles.includes(userRole)) {
        return { isAuthorized: false, error: 'Insufficient permissions' };
      }

      return { isAuthorized: true };
    } catch (error) {
      console.error('Authorization error:', error);
      return { isAuthorized: false, error: 'Authorization failed' };
    }
  };
};

// Tenant isolation middleware
export const enforceTenantIsolation = async (request: NextRequest): Promise<{
  isIsolated: boolean;
  tenantId?: string;
  error?: string;
}> => {
  try {
    const authResult = await authenticateRequest(request);
    
    if (!authResult.isAuthenticated) {
      return { isIsolated: false, error: authResult.error };
    }

    const tenantId = authResult.tenantId;
    if (!tenantId) {
      return { isIsolated: false, error: 'No tenant context available' };
    }

    // Set tenant context for database queries
    request.headers.set('x-tenant-id', tenantId);

    return { isIsolated: true, tenantId };
  } catch (error) {
    console.error('Tenant isolation error:', error);
    return { isIsolated: false, error: 'Tenant isolation failed' };
  }
};

// Input validation middleware
export const validateInput = (validationRules: any[]) => {
  return async (request: NextRequest): Promise<{
    isValid: boolean;
    errors?: any[];
    data?: any;
  }> => {
    try {
      const body = await request.json();
      const errors = [];

      for (const rule of validationRules) {
        const result = await rule.run({ body });
        if (!result.isEmpty()) {
          errors.push(...result.array());
        }
      }

      if (errors.length > 0) {
        return { isValid: false, errors };
      }

      return { isValid: true, data: body };
    } catch (error) {
      console.error('Input validation error:', error);
      return { isValid: false, errors: [{ msg: 'Invalid request body' }] };
    }
  };
};

// Encryption utilities
export class EncryptionService {
  private algorithm: string;
  private key: Buffer;

  constructor() {
    this.algorithm = SECURITY_CONFIG.ENCRYPTION_ALGORITHM;
    this.key = Buffer.from(SECURITY_CONFIG.ENCRYPTION_KEY, 'hex');
  }

  encrypt(text: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipher(this.algorithm, this.key);
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Encryption failed');
    }
  }

  decrypt(encryptedText: string): string {
    try {
      const parts = encryptedText.split(':');
      const iv = Buffer.from(parts[0], 'hex');
      const encrypted = parts[1];
      
      const decipher = crypto.createDecipher(this.algorithm, this.key);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Decryption failed');
    }
  }
}

// Password utilities
export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, SECURITY_CONFIG.BCRYPT_ROUNDS);
    } catch (error) {
      console.error('Password hashing error:', error);
      throw new Error('Password hashing failed');
    }
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  }

  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// JWT utilities
export class JWTService {
  static generateToken(payload: any): string {
    try {
      return jwt.sign(payload, SECURITY_CONFIG.JWT_SECRET, {
        expiresIn: SECURITY_CONFIG.JWT_EXPIRES_IN,
        issuer: 'intellecty-retail',
        audience: 'intellecty-users'
      });
    } catch (error) {
      console.error('JWT generation error:', error);
      throw new Error('Token generation failed');
    }
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, SECURITY_CONFIG.JWT_SECRET, {
        issuer: 'intellecty-retail',
        audience: 'intellecty-users'
      });
    } catch (error) {
      console.error('JWT verification error:', error);
      throw new Error('Token verification failed');
    }
  }

  static decodeToken(token: string): any {
    try {
      return jwt.decode(token);
    } catch (error) {
      console.error('JWT decode error:', error);
      return null;
    }
  }
}

// Security headers middleware
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
};

// Audit logging
export class AuditLogger {
  static async logAction(
    tenantId: string,
    userId: string,
    action: string,
    details: any,
    request: NextRequest
  ): Promise<void> {
    try {
      const auditEntry = {
        tenantId,
        userId,
        action,
        details,
        ipAddress: request.ip || request.headers.get('x-forwarded-for'),
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString(),
        requestId: request.headers.get('x-request-id')
      };

      // In production, send to audit service
      console.log('AUDIT:', JSON.stringify(auditEntry));
    } catch (error) {
      console.error('Audit logging error:', error);
    }
  }
}

// CORS configuration
export const corsConfig = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || SECURITY_CONFIG.CORS_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Security middleware wrapper
export const withSecurity = (handler: Function, options: {
  requireAuth?: boolean;
  requiredRoles?: string[];
  rateLimit?: any;
  validateInput?: any[];
}) => {
  return async (request: NextRequest, context: any) => {
    try {
      // Apply rate limiting
      if (options.rateLimit) {
        // Rate limiting logic here
      }

      // Apply authentication
      if (options.requireAuth) {
        const authResult = await authenticateRequest(request);
        if (!authResult.isAuthenticated) {
          return NextResponse.json(
            { error: authResult.error || 'Authentication required' },
            { status: 401 }
          );
        }
      }

      // Apply authorization
      if (options.requiredRoles) {
        const authzResult = await authorizeRequest(options.requiredRoles)(request);
        if (!authzResult.isAuthorized) {
          return NextResponse.json(
            { error: authzResult.error || 'Authorization required' },
            { status: 403 }
          );
        }
      }

      // Apply input validation
      if (options.validateInput) {
        const validationResult = await validateInput(options.validateInput)(request);
        if (!validationResult.isValid) {
          return NextResponse.json(
            { error: 'Invalid input', details: validationResult.errors },
            { status: 400 }
          );
        }
      }

      // Apply tenant isolation
      const isolationResult = await enforceTenantIsolation(request);
      if (!isolationResult.isIsolated) {
        return NextResponse.json(
          { error: isolationResult.error || 'Tenant isolation failed' },
          { status: 403 }
        );
      }

      // Call the actual handler
      return await handler(request, context);
    } catch (error) {
      console.error('Security middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
};

export const encryptionService = new EncryptionService();
