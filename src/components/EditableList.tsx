'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface EditableListProps {
  items: string[]
  onSave: (items: string[]) => Promise<boolean>
  className?: string
  renderItem?: (item: string, index: number) => React.ReactNode
}

export default function EditableList({ 
  items, 
  onSave, 
  className = '',
  renderItem 
}: EditableListProps) {
  const { isAdmin } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editItems, setEditItems] = useState(items)
  const [saving, setSaving] = useState(false)

  if (!isAdmin) {
    return (
      <div className={className}>
        {items.map((item, index) => 
          renderItem ? renderItem(item, index) : (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#50A69F] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{item}</p>
            </div>
          )
        )}
      </div>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    const filteredItems = editItems.filter(item => item.trim() !== '')
    const success = await onSave(filteredItems)
    if (success) {
      setIsEditing(false)
    }
    setSaving(false)
  }

  const handleCancel = () => {
    setEditItems(items)
    setIsEditing(false)
  }

  const addItem = () => {
    setEditItems([...editItems, ''])
  }

  const removeItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...editItems]
    newItems[index] = value
    setEditItems(newItems)
  }

  if (isEditing) {
    return (
      <div className={className}>
        <div className="space-y-3 mb-4">
          {editItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                placeholder={`項目 ${index + 1}`}
              />
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
                title="削除"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2 mb-4">
          <button
            onClick={addItem}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
          >
            + 項目を追加
          </button>
        </div>

        <div className="flex space-x-2">
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
        {items.map((item, index) => 
          renderItem ? renderItem(item, index) : (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#50A69F] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{item}</p>
            </div>
          )
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