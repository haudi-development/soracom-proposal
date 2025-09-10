import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    let userRole = null
    
    if (password === process.env.ADMIN_PASSWORD) {
      userRole = 'admin'
    } else if (password === process.env.USER_PASSWORD) {
      userRole = 'user'
    }
    
    if (userRole) {
      const response = NextResponse.json({ success: true, role: userRole })
      
      // Set authentication cookies
      response.cookies.set('authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      })
      
      response.cookies.set('user_role', userRole, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      })
      
      return response
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}