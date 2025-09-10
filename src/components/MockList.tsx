'use client'

import { useState, useEffect } from 'react'
import { supabase, type Mock } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export default function MockList() {
  const { isAdmin } = useAuth()
  const [mocks, setMocks] = useState<Mock[]>([])
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState<number | null>(null)

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">モック一覧</h3>
        <div className="text-center py-8">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (mocks.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-8 py-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">関連リンク・モック一覧</h3>
              <p className="text-gray-600">開発実績とデモサイトへのアクセス情報</p>
            </div>
            
            <div className="p-8">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">モックが登録されていません</h4>
                <p className="text-gray-600 mb-6">管理画面からモックサイトを追加してください</p>
                {isAdmin && (
                  <a 
                    href="/admin" 
                    className="inline-flex items-center px-4 py-2 bg-[#50A69F] text-white font-medium rounded-lg hover:bg-[#459089] transition-colors"
                  >
                    管理画面へ移動
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">関連リンク・モック一覧</h3>
            <p className="text-gray-600">開発実績とデモサイトへのアクセス情報</p>
          </div>
          
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mocks.map((mock) => (
                <div key={mock.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{mock.client_name}</h4>
                      {mock.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{mock.description}</p>
                      )}
                    </div>
                    {(mock.auth_id || mock.auth_password) && (
                      <div className="ml-4">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" title="認証が必要です"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={mock.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#50A69F] hover:text-[#459089] font-medium text-sm transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      デモサイトを開く
                    </a>
                    
                    {(mock.auth_id || mock.auth_password) && (
                      <div>
                        <button
                          onClick={() => setShowAuth(showAuth === mock.id ? null : mock.id)}
                          className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                          {showAuth === mock.id ? '認証情報を隠す' : '認証情報を表示'}
                        </button>
                        
                        {showAuth === mock.id && (
                          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="font-medium text-gray-700 mb-3 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              ログイン情報
                            </div>
                            <div className="space-y-2 text-sm">
                              {mock.auth_id && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-500 w-16">ID:</span>
                                  <code className="bg-white px-2 py-1 rounded border text-gray-900">{mock.auth_id}</code>
                                </div>
                              )}
                              {mock.auth_password && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-500 w-16">パスワード:</span>
                                  <code className="bg-white px-2 py-1 rounded border text-gray-900">{mock.auth_password}</code>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}