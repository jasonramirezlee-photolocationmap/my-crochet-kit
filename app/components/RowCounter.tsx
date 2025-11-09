// /vercel/path0/components/RowCounter.tsx

'use client'

import { useState } from 'react'
import { Plus, Minus, RotateCcw } from 'lucide-react'

/**
 * RowCounter Component
 * A simple, stateful component for tracking rows in a crochet project.
 */
export default function RowCounter() {
  // State to hold the current row count
  const [count, setCount] = useState(0)

  // Function to increment the count
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }

  // Function to decrement the count, preventing negative numbers
  const decrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1))
  }

  // Function to reset the count to zero
  const reset = () => {
    if (window.confirm('Are you sure you want to reset the row count?')) {
      setCount(0)
    }
  }

  return (
    <div className="bg-cream p-6 rounded-xl shadow-lg border border-cream-dark max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-warmBrown text-center mb-6">
        Row Counter 🧶
      </h2>
      
      {/* Current Count Display */}
      <div className="text-center mb-8">
        <p className="text-xl text-warmBrown-dark">Current Row:</p>
        <p className="text-9xl font-extrabold text-rose transition-transform transform duration-150 ease-out">
          {count}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={decrement}
          className="flex-1 btn-secondary py-4 text-2xl"
          aria-label="Decrement row count"
          disabled={count === 0}
        >
          <Minus size={32} className="mx-auto" />
        </button>
        <button
          onClick={increment}
          className="flex-1 btn-primary py-4 text-2xl"
          aria-label="Increment row count"
        >
          <Plus size={32} className="mx-auto" />
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="w-full text-warmBrown-light hover:text-rose transition-colors flex items-center justify-center gap-2"
        aria-label="Reset row count to zero"
      >
        <RotateCcw size={18} />
        Reset Counter
      </button>
    </div>
  )
}
