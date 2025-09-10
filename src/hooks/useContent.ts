'use client'

import { useState, useEffect } from 'react'

export function useContent() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContent(data.content)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (key: string, value: string) => {
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      })

      if (response.ok) {
        setContent(prev => ({ ...prev, [key]: value }))
        return true
      } else {
        throw new Error('Failed to update content')
      }
    } catch (error) {
      console.error('Error updating content:', error)
      return false
    }
  }

  const getContent = (key: string, defaultValue = '') => {
    return content[key] || defaultValue
  }

  const getContentArray = (key: string): string[] => {
    try {
      const value = content[key]
      if (!value) return []
      return JSON.parse(value)
    } catch {
      return []
    }
  }

  const updateContentArray = async (key: string, value: string[]) => {
    return updateContent(key, JSON.stringify(value))
  }

  return {
    content,
    loading,
    fetchContent,
    updateContent,
    getContent,
    getContentArray,
    updateContentArray
  }
}