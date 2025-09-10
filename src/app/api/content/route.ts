import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// デフォルトコンテンツ
const DEFAULT_CONTENT = {
  'partner-strategy-intro': 'ハウディのイノベーションパートナー戦略',
  'partner-strategy-values': JSON.stringify([
    'アイデアを高速で形にする力（デモ／モック／PoCを短期間で量産）',
    'IoTハード～クラウド～AIを一気通貫で実装可能',
    'UI/UX設計力：技術を「使えるかたち」にする',
    'コンサルティング機能：課題抽出～事業計画～稟議支援まで伴走'
  ]),
  'partner-strategy-position': '「イノベーションを最速で形にするパートナー」',
  'partner-strategy-strength': '技術力 × スピード × 大企業稟議対応力 → 大企業の新規事業に最適な"潤滑油"かつ"加速装置"',
  'iot-achievements-intro': 'IoT開発の実績',
  'conclusion-message': 'ハウディは「どこでも行きます」。ソラコムさんの合理的な判断の範囲内で、もしご紹介いただけるお客様がいれば、ぜひ繋いでいただきたいと思っています。一緒に「大きなIoT案件を獲得し、日本のIoT市場を盛り上げていく」ことを強く願っています。'
}

export async function GET() {
  try {
    if (!supabase) {
      // Supabaseが設定されていない場合はメモリコンテンツとデフォルトコンテンツをマージして返す
      const mergedContent = { ...DEFAULT_CONTENT, ...memoryContent }
      return NextResponse.json({ content: mergedContent })
    }

    const { data, error } = await supabase
      .from('content')
      .select('*')

    if (error) throw error

    // データベースからコンテンツを取得し、オブジェクト形式に変換
    const content: Record<string, string> = {}
    data?.forEach(item => {
      content[item.key] = item.value
    })

    // デフォルトコンテンツで不足分を補完
    const mergedContent = { ...DEFAULT_CONTENT, ...content }

    return NextResponse.json({ content: mergedContent })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ content: DEFAULT_CONTENT })
  }
}

// メモリストレージ（Supabaseが設定されていない場合の代替）
const memoryContent: Record<string, string> = {}

export async function PUT(request: NextRequest) {
  try {
    const userRole = request.cookies.get('user_role')?.value
    
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { key, value } = await request.json()

    if (!supabase) {
      // Supabaseが設定されていない場合はメモリに保存
      memoryContent[key] = value
      return NextResponse.json({ success: true })
    }

    const { error } = await supabase
      .from('content')
      .upsert({ key, value, updated_at: new Date().toISOString() })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}