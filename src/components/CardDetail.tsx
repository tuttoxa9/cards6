'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Star, Calendar, Tag } from 'lucide-react'
import { Card } from '@/types/card'

interface CardDetailProps {
  card: Card
  onBack: () => void
}

export default function CardDetail({ card, onBack }: CardDetailProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Image (60%) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    isHovered ? 'scale-105' : 'scale-100'
                  }`}
                />
                {isHovered && (
                  <div className="absolute inset-0 holographic-effect" />
                )}
              </div>

              {/* Image Info */}
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {card.category === 'auto' ? 'Automotive Collection' : 'Marvel Universe'}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  card.rarity === 'Legendary' ? 'bg-yellow-100 text-yellow-800' :
                  card.rarity === 'Ultra Rare' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {card.rarity}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details (40%) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-fit">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {card.title}
              </h1>

              {/* Price */}
              <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6">
                {card.price}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-800">Specifications</h3>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-gray-600">Year</span>
                  </div>
                  <span className="font-medium">{card.year}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-gray-500" />
                    <span className="text-gray-600">Rarity</span>
                  </div>
                  <span className="font-medium">{card.rarity}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-500" />
                    <span className="text-gray-600">Category</span>
                  </div>
                  <span className="font-medium capitalize">{card.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
