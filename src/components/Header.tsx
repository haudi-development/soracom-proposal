'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth()
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-r from-[#50A69F] to-[#459089] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ハウディ × ソラコム</h1>
                <p className="text-sm text-gray-500">協業提案資料</p>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              提案資料
            </Link>
            {isAdmin && (
              <Link 
                href="/admin" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                モック管理
              </Link>
            )}
            
            {isAuthenticated && (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <span className="text-xs text-gray-600">
                    {isAdmin ? '管理者' : 'ユーザー'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  ログアウト
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}