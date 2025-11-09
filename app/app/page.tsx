'use client' // THIS MUST BE THE FIRST LINE

// /vercel/path0/app/app/page.tsx

import { useState } from 'react'
import { Home, Book, Hash, Package, Camera, DollarSign, Settings } from 'lucide-react'
import RowCounter from '../components/RowCounter' // Assuming RowCounter is in /components

// Placeholder components (You'll need to define these in your /components folder)
const DashboardView = () => <div className="p-4 bg-cream rounded-lg text-warmBrown-dark">Dashboard content goes here.</div>
const PatternsView = () => <div className="p-4 bg-cream rounded-lg text-warmBrown-dark">Patterns Manager content goes here.</div>
const CounterView = () => <RowCounter /> // Assuming RowCounter is a complete component
const StashView = () => <div className="p-4 bg-cream rounded-lg text-warmBrown-dark">Stash Tracker content goes here.</div>
const PhotosView = () => <div className="p-4 bg-cream rounded-lg text-warmBrown-dark">Progress Photos content goes here.</div>
const PricingView = () => <div className="p-4 bg-cream rounded-lg text-warmBrown-dark">Pricing Calculator content goes here.</div>

// Navigation items (moved here from the original file)
const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'patterns', label: 'Patterns', icon: Book },
  { id: 'counter', label: 'Counter', icon: Hash },
  { id: 'stash', label: 'Stash', icon: Package },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
]

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-rose text-white py-4 px-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Crochet Kit 🧶</h1>
          <button className="p-2 hover:bg-rose-dark rounded-lg transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'patterns' && <PatternsView />}
          {activeTab === 'counter' && <CounterView />}
          {activeTab === 'stash' && <StashView />}
          {activeTab === 'photos' && <PhotosView />}
          {activeTab === 'pricing' && <PricingView />}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-cream-dark sticky bottom-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-3 px-4 transition-colors ${
                  activeTab === item.id
                    ? 'text-rose'
                    : 'text-warmBrown-light hover:text-rose'
                }`}
              >
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
