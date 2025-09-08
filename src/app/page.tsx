'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import CardsCatalog from '@/components/CardsCatalog'
import CardDetail from '@/components/CardDetail'
import { Card } from '@/types/card'

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card)
    setShowDetail(true)
  }

  const handleBackToCatalog = () => {
    setShowDetail(false)
    setTimeout(() => setSelectedCard(null), 400)
  }

  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="relative overflow-hidden">
        <div className={`page-transition ${showDetail ? '-translate-x-full' : 'translate-x-0'}`}>
          <CardsCatalog onCardSelect={handleCardSelect} />
        </div>

        <div className={`absolute top-0 left-0 w-full page-transition ${showDetail ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedCard && (
            <CardDetail
              card={selectedCard}
              onBack={handleBackToCatalog}
            />
          )}
        </div>
      </div>
    </main>
  )
}
