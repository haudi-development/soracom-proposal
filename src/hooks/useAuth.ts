'use client'

import { useState, useEffect } from 'react'

export type UserRole = 'admin' | 'user' | null

export function useAuth() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/user-role')
      const data = await response.json()
      setUserRole(data.role)
      setIsAuthenticated(data.isAuthenticated)
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setLoading(false)
    }
  }

  const isAdmin = userRole === 'admin'

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      setUserRole(null)
      setIsAuthenticated(false)
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    userRole,
    isAuthenticated,
    isAdmin,
    loading,
    checkAuthStatus,
    logout
  }
}