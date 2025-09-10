'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface EditableTextProps {
  value: string
  onSave: (value: string) => Promise<boolean>
  className?: string
  multiline?: boolean
  placeholder?: string
}

export default function EditableText({ 
  value, 
  onSave, 
  className = '', 
  multiline = false,
  placeholder = ''
}: EditableTextProps) {
  const { isAdmin } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [saving, setSaving] = useState(false)

  if (!isAdmin) {
    return (
      <div className={className}>
        {multiline ? (
          <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br>') }} />
        ) : (
          value
        )}
      </div>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    const success = await onSave(editValue)
    if (success) {
      setIsEditing(false)
    }
    setSaving(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50A69F] ${className}`}
            rows={4}
            placeholder={placeholder}
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50A69F] ${className}`}
            placeholder={placeholder}
          />
        )}
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1 bg-[#50A69F] text-white rounded hover:bg-[#459089] disabled:opacity-50 text-sm"
          >
            {saving ? '保存中...' : '保存'}
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
          >
            キャンセル
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <div className={className}>
        {multiline ? (
          <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br>') }} />
        ) : (
          value
        )}
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-300 rounded p-1 shadow-sm hover:bg-gray-50"
        title="編集"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    </div>
  )
}