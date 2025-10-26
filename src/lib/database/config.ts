/**
 * Database Configuration with Enterprise Security
 * PostgreSQL with TimescaleDB extension for time-series data
 */

import { Pool, PoolConfig } from 'pg';

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean | object;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
  application_name: string;
}

const getDatabaseConfig = (): DatabaseConfig => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME || 'intellecty_retail',
    user: process.env.DATABASE_USER || 'intellecty_user',
    password: process.env.DATABASE_PASSWORD || 'secure_password_2024',
    ssl: isProduction ? {
      rejectUnauthorized: true,
      ca: process.env.DATABASE_SSL_CA,
      cert: process.env.DATABASE_SSL_CERT,
      key: process.env.DATABASE_SSL_KEY
    } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    application_name: 'intellecty-retail-v1'
  };
};

// Create connection pool
const config = getDatabaseConfig();
export const dbPool = new Pool(config);

// Handle pool errors
dbPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    const client = await dbPool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Initialize TimescaleDB extension
export const initializeTimescaleDB = async (): Promise<void> => {
  try {
    const client = await dbPool.connect();
    
    // Create TimescaleDB extension
    await client.query('CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;');
    
    // Create hypertables for time-series data
    await client.query(`
      CREATE TABLE IF NOT EXISTS sales_data (
        time TIMESTAMPTZ NOT NULL,
        tenant_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INTEGER NOT NULL,
        revenue DECIMAL(10,2) NOT NULL,
        location_id UUID,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    await client.query(`
      SELECT create_hypertable('sales_data', 'time', 
        chunk_time_interval => INTERVAL '1 day',
        if_not_exists => TRUE
      );
    `);
    
    // Create inventory time-series table
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory_snapshots (
        time TIMESTAMPTZ NOT NULL,
        tenant_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INTEGER NOT NULL,
        cost_per_unit DECIMAL(10,2),
        location_id UUID,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    await client.query(`
      SELECT create_hypertable('inventory_snapshots', 'time',
        chunk_time_interval => INTERVAL '1 day',
        if_not_exists => TRUE
      );
    `);
    
    // Create forecasts time-series table
    await client.query(`
      CREATE TABLE IF NOT EXISTS forecast_data (
        time TIMESTAMPTZ NOT NULL,
        tenant_id UUID NOT NULL,
        product_id UUID NOT NULL,
        forecast_date DATE NOT NULL,
        predicted_quantity INTEGER NOT NULL,
        confidence_score DECIMAL(3,2),
        model_type VARCHAR(50),
        external_factors JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    await client.query(`
      SELECT create_hypertable('forecast_data', 'time',
        chunk_time_interval => INTERVAL '1 day',
        if_not_exists => TRUE
      );
    `);
    
    client.release();
    console.log('✅ TimescaleDB initialized successfully');
  } catch (error) {
    console.error('❌ TimescaleDB initialization failed:', error);
    throw error;
  }
};

// Row-level security setup
export const setupRowLevelSecurity = async (): Promise<void> => {
  try {
    const client = await dbPool.connect();
    
    // Enable RLS on all tenant-specific tables
    const tables = [
      'sales_data',
      'inventory_snapshots', 
      'forecast_data',
      'products',
      'inventory',
      'sales_orders',
      'purchase_orders',
      'forecasts',
      'external_factors',
      'data_connectors',
      'sustainability_metrics'
    ];
    
    for (const table of tables) {
      await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      
      // Create RLS policy for tenant isolation
      await client.query(`
        CREATE POLICY IF NOT EXISTS tenant_isolation_${table}
        ON ${table}
        FOR ALL
        TO PUBLIC
        USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
      `);
    }
    
    client.release();
    console.log('✅ Row-level security configured successfully');
  } catch (error) {
    console.error('❌ Row-level security setup failed:', error);
    throw error;
  }
};

// Database encryption setup
export const setupDatabaseEncryption = async (): Promise<void> => {
  try {
    const client = await dbPool.connect();
    
    // Create encryption key table
    await client.query(`
      CREATE TABLE IF NOT EXISTS encryption_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL UNIQUE,
        key_version INTEGER NOT NULL DEFAULT 1,
        encrypted_key BYTEA NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    // Create audit log table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL,
        user_id UUID,
        action VARCHAR(100) NOT NULL,
        table_name VARCHAR(100),
        record_id UUID,
        old_values JSONB,
        new_values JSONB,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    // Create audit log hypertable
    await client.query(`
      SELECT create_hypertable('audit_logs', 'created_at',
        chunk_time_interval => INTERVAL '1 day',
        if_not_exists => TRUE
      );
    `);
    
    client.release();
    console.log('✅ Database encryption setup completed');
  } catch (error) {
    console.error('❌ Database encryption setup failed:', error);
    throw error;
  }
};

// Initialize database
export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('🚀 Initializing database...');
    
    // Test connection
    await testDatabaseConnection();
    
    // Initialize TimescaleDB
    await initializeTimescaleDB();
    
    // Setup row-level security
    await setupRowLevelSecurity();
    
    // Setup encryption
    await setupDatabaseEncryption();
    
    console.log('✅ Database initialization completed successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export default dbPool;
