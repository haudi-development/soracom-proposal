'use client'

import { useState, useEffect } from 'react'
import { supabase, type Mock } from '@/lib/supabase'
import Header from '@/components/Header'
import { useAuth } from '@/hooks/useAuth'

export default function AdminPage() {
  const { isAdmin, loading: authLoading } = useAuth()
  const [mocks, setMocks] = useState<Mock[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMock, setEditingMock] = useState<Mock | null>(null)
  const [formData, setFormData] = useState({
    client_name: '',
    url: '',
    auth_id: '',
    auth_password: '',
    description: '',
    display_order: 0,
  })

  useEffect(() => {
    fetchMocks()
  }, [])

  const fetchMocks = async () => {
    try {
      if (!supabase) {
        console.log('Supabase not configured')
        setMocks([])
        return
      }

      const { data, error } = await supabase
        .from('mocks')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setMocks(data || [])
    } catch (error) {
      console.error('Error fetching mocks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!supabase) {
      alert('Supabaseが設定されていません')
      return
    }
    
    try {
      if (editingMock) {
        const { error } = await supabase
          .from('mocks')
          .update(formData)
          .eq('id', editingMock.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('mocks')
          .insert([formData])
        if (error) throw error
      }

      setFormData({
        client_name: '',
        url: '',
        auth_id: '',
        auth_password: '',
        description: '',
        display_order: 0,
      })
      setEditingMock(null)
      setShowForm(false)
      fetchMocks()
    } catch (error) {
      console.error('Error saving mock:', error)
      alert('保存に失敗しました')
    }
  }

  const handleEdit = (mock: Mock) => {
    setEditingMock(mock)
    setFormData({
      client_name: mock.client_name,
      url: mock.url,
      auth_id: mock.auth_id || '',
      auth_password: mock.auth_password || '',
      description: mock.description || '',
      display_order: mock.display_order,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return

    if (!supabase) {
      alert('Supabaseが設定されていません')
      return
    }

    try {
      const { error } = await supabase
        .from('mocks')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchMocks()
    } catch (error) {
      console.error('Error deleting mock:', error)
      alert('削除に失敗しました')
    }
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingMock(null)
    setFormData({
      client_name: '',
      url: '',
      auth_id: '',
      auth_password: '',
      description: '',
      display_order: 0,
    })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-6xl mx-auto bg-white p-8">
          <div className="text-center">
            <div className="text-gray-600">認証確認中...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-6xl mx-auto bg-white p-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">アクセス権限がありません</h1>
            <p className="text-gray-600 mb-6">この機能は管理者のみ利用できます。管理者パスワードでログインしてください。</p>
            <a 
              href="/login" 
              className="inline-flex items-center px-4 py-2 bg-[#50A69F] text-white font-medium rounded-lg hover:bg-[#459089] transition-colors"
            >
              再ログイン
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto bg-white">
        <div className="p-6">
          <div className="mb-6 pb-3 border-b border-gray-200">
            <h1 className="text-3xl font-normal text-black mb-2">モック管理</h1>
            <div className="text-sm text-gray-500">
              <span>管理画面</span>
              <span className="ml-2 px-2 py-1 bg-[#50A69F] text-white text-xs rounded">管理者</span>
            </div>
          </div>
          
          <div className="mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-blue-600 hover:underline text-sm"
            >
              {showForm ? 'キャンセル' : '+ 新規追加'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-normal text-black mb-6 pb-2 border-b border-gray-300">
              {editingMock ? 'モック編集' : 'モック追加'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  クライアント名 *
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    認証ID
                  </label>
                  <input
                    type="text"
                    value={formData.auth_id}
                    onChange={(e) => setFormData({ ...formData, auth_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    認証パスワード
                  </label>
                  <input
                    type="text"
                    value={formData.auth_password}
                    onChange={(e) => setFormData({ ...formData, auth_password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  表示順序
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#50A69F]"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-[#50A69F] text-white px-4 py-2 rounded hover:bg-[#459089] transition-colors"
                >
                  {editingMock ? '更新' : '追加'}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-gray-300 mt-8 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-300 px-4 py-2">
            <h2 className="text-lg font-normal text-black">登録済みモック</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-600">読み込み中...</div>
          ) : mocks.length === 0 ? (
            <div className="p-8 text-center text-gray-600">モックが登録されていません</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      クライアント名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      認証
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      順序
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mocks.map((mock) => (
                    <tr key={mock.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{mock.client_name}</div>
                        {mock.description && (
                          <div className="text-sm text-gray-500">{mock.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={mock.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#50A69F] hover:text-[#459089] break-all"
                        >
                          {mock.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mock.auth_id || mock.auth_password ? '有' : '無'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mock.display_order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(mock)}
                          className="text-[#50A69F] hover:text-[#459089]"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDelete(mock.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}