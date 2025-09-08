'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/types/card'

const sampleCards: Card[] = [
  {
    id: 1,
    title: "Ferrari F40 Limited Edition",
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    description: "Rare collectible card featuring the iconic Ferrari F40. This limited edition card showcases the legendary supercar in stunning detail.",
    rarity: "Ultra Rare",
    year: "1987",
    price: "$299"
  },
  {
    id: 2,
    title: "Spider-Man Classic",
    category: 'marvel',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop',
    description: "Classic Spider-Man trading card from the original Marvel series. Features the web-slinger in his iconic red and blue suit.",
    rarity: "Rare",
    year: "2023",
    price: "$89"
  },
  {
    id: 3,
    title: "Lamborghini Countach",
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    description: "Vintage Lamborghini Countach collectible card. A true masterpiece of automotive design captured in card form.",
    rarity: "Legendary",
    year: "1974",
    price: "$399"
  },
  {
    id: 4,
    title: "Iron Man Mark VII",
    category: 'marvel',
    image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=300&fit=crop',
    description: "Premium Iron Man trading card featuring the Mark VII armor. Holographic finish with incredible detail.",
    rarity: "Ultra Rare",
    year: "2023",
    price: "$249"
  },
  {
    id: 5,
    title: "Porsche 911 Turbo",
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    description: "Classic Porsche 911 Turbo collectible card. Features the timeless sports car in pristine condition.",
    rarity: "Rare",
    year: "1975",
    price: "$189"
  },
  {
    id: 6,
    title: "Captain America Shield",
    category: 'marvel',
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=300&fit=crop',
    description: "Iconic Captain America trading card featuring his legendary shield. Premium foil treatment.",
    rarity: "Legendary",
    year: "2023",
    price: "$349"
  }
]

interface CardsCatalogProps {
  onCardSelect: (card: Card) => void
}

export default function CardsCatalog({ onCardSelect }: CardsCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'auto' | 'marvel'>('all')

  const filteredCards = sampleCards.filter(card =>
    activeFilter === 'all' || card.category === activeFilter
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Filter Buttons */}
      <div className="flex justify-center mb-12 md:mb-16">
        <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-gray-100 flex flex-wrap justify-center gap-1 sm:gap-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            All Cards
          </button>
          <button
            onClick={() => setActiveFilter('auto')}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
              activeFilter === 'auto'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Automobiles
          </button>
          <button
            onClick={() => setActiveFilter('marvel')}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
              activeFilter === 'marvel'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Marvel
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => onCardSelect(card)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer card-hover hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 sm:h-52 md:h-56">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  card.rarity === 'Legendary' ? 'bg-yellow-100 text-yellow-800' :
                  card.rarity === 'Ultra Rare' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {card.rarity}
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="font-bold text-gray-900 mb-2 md:mb-3 text-base md:text-lg leading-tight">{card.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">{card.year}</span>
                <span className="text-lg sm:text-xl font-bold text-indigo-600">{card.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
