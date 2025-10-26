import { prisma } from '@/lib/database/prisma'

export interface TierLimits {
  maxSKUs: number
  maxUsers: number
  maxForecastDays: number
  features: string[]
}

export const TIER_LIMITS: { [key: string]: TierLimits } = {
  FREE: {
    maxSKUs: 100,
    maxUsers: 1,
    maxForecastDays: 7,
    features: [
      'basic_forecasting',
      'inventory_health',
      'excel_templates',
      'basic_analytics'
    ]
  },
  GROWTH: {
    maxSKUs: 1000,
    maxUsers: 5,
    maxForecastDays: 30,
    features: [
      'basic_forecasting',
      'inventory_health',
      'excel_templates',
      'basic_analytics',
      'full_ai_ensemble',
      'external_data_integration',
      'automated_replenishment',
      'advanced_analytics',
      'api_access',
      'multi_user_collaboration'
    ]
  },
  PREMIUM: {
    maxSKUs: -1, // Unlimited
    maxUsers: -1, // Unlimited
    maxForecastDays: 365,
    features: [
      'basic_forecasting',
      'inventory_health',
      'excel_templates',
      'basic_analytics',
      'full_ai_ensemble',
      'external_data_integration',
      'automated_replenishment',
      'advanced_analytics',
      'api_access',
      'multi_user_collaboration',
      'white_label_options',
      'custom_ai_models',
      'dedicated_support',
      'sso_integration',
      'advanced_security',
      'custom_deployments',
      'unlimited_forecasting',
      'unlimited_users',
      'unlimited_skus'
    ]
  }
}

export class TierGatingService {
  async checkFeatureAccess(tenantId: string, feature: string): Promise<boolean> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      })

      if (!tenant) {
        return false
      }

      const tierLimits = TIER_LIMITS[tenant.tier]
      return tierLimits.features.includes(feature)
    } catch (error) {
      console.error('Error checking feature access:', error)
      return false
    }
  }

  async checkSKULimit(tenantId: string): Promise<{ allowed: boolean; current: number; limit: number }> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      })

      if (!tenant) {
        return { allowed: false, current: 0, limit: 0 }
      }

      const currentSKUs = await prisma.product.count({
        where: { tenantId }
      })

      const tierLimits = TIER_LIMITS[tenant.tier]
      const limit = tierLimits.maxSKUs

      return {
        allowed: limit === -1 || currentSKUs < limit,
        current: currentSKUs,
        limit: limit === -1 ? -1 : limit
      }
    } catch (error) {
      console.error('Error checking SKU limit:', error)
      return { allowed: false, current: 0, limit: 0 }
    }
  }

  async checkUserLimit(tenantId: string): Promise<{ allowed: boolean; current: number; limit: number }> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      })

      if (!tenant) {
        return { allowed: false, current: 0, limit: 0 }
      }

      const currentUsers = await prisma.user.count({
        where: { tenantId }
      })

      const tierLimits = TIER_LIMITS[tenant.tier]
      const limit = tierLimits.maxUsers

      return {
        allowed: limit === -1 || currentUsers < limit,
        current: currentUsers,
        limit: limit === -1 ? -1 : limit
      }
    } catch (error) {
      console.error('Error checking user limit:', error)
      return { allowed: false, current: 0, limit: 0 }
    }
  }

  async checkForecastLimit(tenantId: string, requestedDays: number): Promise<{ allowed: boolean; limit: number }> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      })

      if (!tenant) {
        return { allowed: false, limit: 0 }
      }

      const tierLimits = TIER_LIMITS[tenant.tier]
      const limit = tierLimits.maxForecastDays

      return {
        allowed: limit === -1 || requestedDays <= limit,
        limit: limit === -1 ? -1 : limit
      }
    } catch (error) {
      console.error('Error checking forecast limit:', error)
      return { allowed: false, limit: 0 }
    }
  }

  async getTierInfo(tenantId: string): Promise<{ tier: string; limits: TierLimits; usage: any }> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      })

      if (!tenant) {
        throw new Error('Tenant not found')
      }

      const limits = TIER_LIMITS[tenant.tier]
      
      const [skuCount, userCount] = await Promise.all([
        prisma.product.count({ where: { tenantId } }),
        prisma.user.count({ where: { tenantId } })
      ])

      const usage = {
        skus: { current: skuCount, limit: limits.maxSKUs },
        users: { current: userCount, limit: limits.maxUsers },
        forecastDays: { limit: limits.maxForecastDays }
      }

      return {
        tier: tenant.tier,
        limits,
        usage
      }
    } catch (error) {
      console.error('Error getting tier info:', error)
      throw error
    }
  }

  async upgradeTier(tenantId: string, newTier: string): Promise<boolean> {
    try {
      await prisma.tenant.update({
        where: { id: tenantId },
        data: { tier: newTier as any }
      })

      return true
    } catch (error) {
      console.error('Error upgrading tier:', error)
      return false
    }
  }

  async enforceLimits(tenantId: string, action: string, data?: any): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      })

      if (!tenant) {
        return { allowed: false, reason: 'Tenant not found' }
      }

      const tierLimits = TIER_LIMITS[tenant.tier]

      switch (action) {
        case 'create_product':
          const skuCheck = await this.checkSKULimit(tenantId)
          if (!skuCheck.allowed) {
            return { 
              allowed: false, 
              reason: `SKU limit exceeded. Current: ${skuCheck.current}, Limit: ${skuCheck.limit}` 
            }
          }
          break

        case 'create_user':
          const userCheck = await this.checkUserLimit(tenantId)
          if (!userCheck.allowed) {
            return { 
              allowed: false, 
              reason: `User limit exceeded. Current: ${userCheck.current}, Limit: ${userCheck.limit}` 
            }
          }
          break

        case 'generate_forecast':
          if (data?.horizon) {
            const forecastCheck = await this.checkForecastLimit(tenantId, data.horizon)
            if (!forecastCheck.allowed) {
              return { 
                allowed: false, 
                reason: `Forecast horizon limit exceeded. Requested: ${data.horizon} days, Limit: ${forecastCheck.limit} days` 
              }
            }
          }
          break

        case 'use_feature':
          if (data?.feature && !tierLimits.features.includes(data.feature)) {
            return { 
              allowed: false, 
              reason: `Feature '${data.feature}' not available in ${tenant.tier} tier` 
            }
          }
          break

        default:
          return { allowed: true }
      }

      return { allowed: true }
    } catch (error) {
      console.error('Error enforcing limits:', error)
      return { allowed: false, reason: 'Internal error' }
    }
  }
}

export const tierGatingService = new TierGatingService()
