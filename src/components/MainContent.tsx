'use client'

import { useContent } from '@/hooks/useContent'
import EditableText from '@/components/EditableText'
import EditableList from '@/components/EditableList'

export default function MainContent() {
  const { getContent, getContentArray, updateContent, updateContentArray, loading } = useContent()

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-gray-600">読み込み中...</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <nav className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    目次
                  </div>
                  <a href="#overview" className="block text-sm text-gray-700 hover:text-[#50A69F] py-1 border-l-2 border-transparent hover:border-[#50A69F] pl-3 transition-colors">
                    概要
                  </a>
                  <a href="#partner-strategy" className="block text-sm text-gray-700 hover:text-[#50A69F] py-1 border-l-2 border-transparent hover:border-[#50A69F] pl-3 transition-colors">
                    イノベーションパートナー戦略
                  </a>
                  <a href="#iot-achievements" className="block text-sm text-gray-700 hover:text-[#50A69F] py-1 border-l-2 border-transparent hover:border-[#50A69F] pl-3 transition-colors">
                    IoT開発の実績
                  </a>
                  <a href="#mock-sales" className="block text-sm text-gray-700 hover:text-[#50A69F] py-1 border-l-2 border-transparent hover:border-[#50A69F] pl-3 transition-colors">
                    モック先行営業
                  </a>
                  <a href="#collaboration-vision" className="block text-sm text-gray-700 hover:text-[#50A69F] py-1 border-l-2 border-transparent hover:border-[#50A69F] pl-3 transition-colors">
                    協業ビジョン
                  </a>
                  <a href="#conclusion" className="block text-sm text-gray-700 hover:text-[#50A69F] py-1 border-l-2 border-transparent hover:border-[#50A69F] pl-3 transition-colors">
                    最後に
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-8 py-6 border-b border-gray-200">
                <EditableText
                  value={getContent('main-title', 'ハウディ × ソラコム協業提案')}
                  onSave={(value) => updateContent('main-title', value)}
                  className="text-3xl font-bold text-gray-900 mb-2"
                />
                <EditableText
                  value={getContent('main-subtitle', '技術とスピードで日本のIoT市場を共に盛り上げる提案資料')}
                  onSave={(value) => updateContent('main-subtitle', value)}
                  className="text-gray-600"
                />
              </div>
              
              <div className="px-8 py-6 space-y-12">

                {/* Section 1: ハウディのイノベーションパートナー戦略 */}
                <section id="partner-strategy">
                  <EditableText
                    value={getContent('partner-strategy-title', 'ハウディのイノベーションパートナー戦略')}
                    onSave={(value) => updateContent('partner-strategy-title', value)}
                    className="text-2xl font-bold text-gray-900 mb-6"
                  />
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">提供価値</h3>
                      <EditableList
                        items={getContentArray('partner-strategy-values')}
                        onSave={(items) => updateContentArray('partner-strategy-values', items)}
                        className="grid gap-3"
                        renderItem={(item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-[#50A69F] rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">{item}</p>
                          </div>
                        )}
                      />
                    </div>

                    <div className="bg-gradient-to-r from-[#50A69F]/5 to-[#459089]/5 border border-[#50A69F]/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">ブランドポジション</h3>
                      <EditableText
                        value={getContent('partner-strategy-position', '「イノベーションを最速で形にするパートナー」')}
                        onSave={(value) => updateContent('partner-strategy-position', value)}
                        className="text-[#50A69F] font-semibold text-lg"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">強み</h3>
                      <EditableText
                        value={getContent('partner-strategy-strength', '技術力 × スピード × 大企業稟議対応力 → 大企業の新規事業に最適な"潤滑油"かつ"加速装置"')}
                        onSave={(value) => updateContent('partner-strategy-strength', value)}
                        className="text-gray-700 leading-relaxed text-lg"
                        multiline
                      />
                    </div>
                  </div>
                </section>

                {/* Section 2: IoT開発の実績 */}
                <section id="iot-achievements">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">IoT開発の実績</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">大手との受託・共同開発実績</h3>
                      <div className="grid gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">JR東日本</p>
                              <p className="text-sm text-gray-600">エスカレーター歩行検知システム</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">能美防災</p>
                              <p className="text-sm text-gray-600">防災イノベーション開発</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">その他多数</p>
                              <p className="text-sm text-gray-600">建設、防災、小売、エネルギー、交通分野でのPoC多数</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">自社プロダクト群</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">エッジAI BOX</h4>
                          <p className="text-sm text-gray-600">既存カメラをAI化するソリューション</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Familia</h4>
                          <p className="text-sm text-gray-600">IoTプラットフォーム（エネルギーマネジメント、遠隔制御、データ可視化）</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 md:col-span-2">
                          <h4 className="font-medium text-gray-900 mb-2">RxT プラットフォーム</h4>
                          <p className="text-sm text-gray-600">研究開発DXを支援する総合プラットフォーム</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">特徴</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-[#50A69F] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <p className="text-gray-700">プロダクトパッケージを揃えているため、0から作る必要がなくスピーディーに開発可能</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-[#50A69F] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <p className="text-gray-700">日本企業のニーズに即したカスタマイズ・PoC経験を豊富に持つ</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: モック先行営業と事業化までの流れ */}
                <section id="mock-sales">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">モック先行営業と事業化までの流れ</h2>
                  
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="inline-flex items-center bg-gradient-to-r from-[#50A69F] to-[#459089] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                        ⚡ 圧倒的スピード：モックは数日で作成可能
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">営業プロセス</h3>
                      <div className="flex flex-wrap justify-center items-center gap-4">
                        <div className="bg-white border-2 border-[#50A69F] rounded-lg px-4 py-2 font-medium text-gray-900">ヒアリング</div>
                        <div className="text-[#50A69F] text-2xl">→</div>
                        <div className="bg-[#50A69F] text-white rounded-lg px-4 py-2 font-medium">モック作成</div>
                        <div className="text-[#50A69F] text-2xl">→</div>
                        <div className="bg-white border-2 border-[#50A69F] rounded-lg px-4 py-2 font-medium text-gray-900">再ヒアリング</div>
                        <div className="text-[#50A69F] text-2xl">→</div>
                        <div className="bg-[#50A69F] text-white rounded-lg px-4 py-2 font-medium">社内稟議支援</div>
                        <div className="text-[#50A69F] text-2xl">→</div>
                        <div className="bg-gradient-to-r from-[#50A69F] to-[#459089] text-white rounded-lg px-4 py-2 font-medium shadow-lg">開発スタート</div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 成果</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <p className="text-gray-700">PoCを単発で終わらせず、量産・事業化実績まで多数あり</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <p className="text-gray-700">「モック営業 → 実証 → 社内承認 → 導入」と流れる仕組みを確立</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4: ソラコムとの協業ビジョン */}
                <section id="collaboration-vision">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">ソラコムとの協業ビジョン</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">共通点</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <h4 className="font-semibold text-gray-900">ソラコム</h4>
                          </div>
                          <p className="text-gray-700 text-sm">IoT通信・プラットフォームを軸に幅広い顧客ネットワークを持つ</p>
                        </div>
                        <div className="bg-[#50A69F]/10 border border-[#50A69F]/30 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-[#50A69F] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">H</span>
                            </div>
                            <h4 className="font-semibold text-gray-900">ハウディ</h4>
                          </div>
                          <p className="text-gray-700 text-sm">ハード～クラウド～AIまで一気通貫でPoC・事業化を実装</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-[#50A69F]/5 border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">🤝 協業イメージ</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">ソラコム紹介</div>
                          <span className="text-gray-600">→</span>
                          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium">アイデアを形に</div>
                          <span className="text-gray-600">→</span>
                          <div className="bg-[#50A69F] text-white px-4 py-2 rounded-lg font-medium">ハウディが実現</div>
                        </div>
                        <p className="text-gray-700">双方の強みを組み合わせ、大規模IoTプロジェクトを共創</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 ハウディの正直なニーズ</h3>
                      <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>何度かピボットを繰り返していたが、最近はイノベーションパートナービジネスが乗りつつある</p>
                        <p>大型案件の受注が増えてきて、会社はようやく成長してきた</p>
                        <p><strong>Arentさんのような成長ストーリーを描いている</strong>（既にマーケットを持っている日本の大手企業と協業し、IoTを普及・推進していきたい）。そのため、常に大手企業との大型案件の種を探している</p>
                        <p>アウトバウンド型の営業を推進しているが、課題や事業の種にたどり着くまでに時間を要する</p>
                        <p><strong>プル型での営業網を構築されているソラコムさんに色々とサポートいただけると非常にありがたい</strong></p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 5: 最後に */}
                <section id="conclusion">
                  <EditableText
                    value={getContent('conclusion-title', '最後に')}
                    onSave={(value) => updateContent('conclusion-title', value)}
                    className="text-2xl font-bold text-gray-900 mb-6"
                  />
                  <div className="bg-gradient-to-r from-[#50A69F]/10 via-[#459089]/10 to-[#50A69F]/10 border-l-4 border-[#50A69F] rounded-lg p-8">
                    <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
                      <EditableText
                        value={getContent('conclusion-message', 'ハウディは「どこでも行きます」。\n\nソラコムさんの合理的な判断の範囲内で、もしご紹介いただけるお客様がいれば、ぜひ繋いでいただきたいと思っています。\n\n一緒に「大きなIoT案件を獲得し、日本のIoT市場を盛り上げていく」ことを強く願っています。')}
                        onSave={(value) => updateContent('conclusion-message', value)}
                        className="space-y-4"
                        multiline
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}