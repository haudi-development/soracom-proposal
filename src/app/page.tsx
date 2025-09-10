import Header from '@/components/Header'
import MainContent from '@/components/MainContent'
import MockList from '@/components/MockList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainContent />
      <MockList />
    </div>
  )
}
