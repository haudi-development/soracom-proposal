import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userRole = request.cookies.get('user_role')?.value || 'user'
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true'
  
  return NextResponse.json({ 
    role: isAuthenticated ? userRole : null,
    isAuthenticated 
  })
}