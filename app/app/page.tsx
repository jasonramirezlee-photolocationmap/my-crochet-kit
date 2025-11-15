'use client'

import { useState } from 'react'
import {
  Home as HomeIcon,
  Book,
  Hash,
  Package,
  Camera,
  DollarSign,
  Settings
} from 'lucide-react'
import RowCounter from '../components/RowCounter'

type TabId = 'dashboard' | 'patterns' | 'counter' | 'stash' | 'photos' | 'pricing'

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab)
  }

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
            {activeTab === 'dashboard' && <DashboardView onNavigate={handleNavigate} />}
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
                  onClick={() => handleNavigate(item.id)}
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

// Navigation items
const navItems: { id: TabId; label: string; icon: typeof HomeIcon }[] = [
  { id: 'dashboard', label: 'Home', icon: HomeIcon },
  { id: 'patterns', label: 'Patterns', icon: Book },
  { id: 'counter', label: 'Counter', icon: Hash },
  { id: 'stash', label: 'Stash', icon: Package },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
]

// Dashboard View
function DashboardView({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-warmBrown">Welcome to Your Crochet Kit! 🧶</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold text-warmBrown mb-3">Quick Start</h3>
          <p className="text-warmBrown-dark mb-4">Jump right in with your most-used tools:</p>
          <div className="space-y-2">
              <button className="btn-primary w-full" onClick={() => onNavigate('counter')}>
                Start Row Counter
              </button>
              <button className="btn-secondary w-full" onClick={() => onNavigate('patterns')}>
                Add Pattern
              </button>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-rose-light to-lavender-light">
          <h3 className="text-xl font-bold text-warmBrown mb-3">Your Stats</h3>
          <div className="space-y-2 text-warmBrown-dark">
            <p>📚 <strong>0</strong> Patterns saved</p>
            <p>🧶 <strong>0</strong> Projects tracked</p>
            <p>📸 <strong>0</strong> Photos captured</p>
            <p>⏱️ <strong>0 hours</strong> of crafting time</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-warmBrown mb-3">Featured Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-cream-dark rounded-lg">
            <div className="text-4xl mb-2">🔢</div>
            <h4 className="font-semibold text-warmBrown">Row Counter</h4>
            <p className="text-sm text-warmBrown-dark">Never lose count</p>
          </div>
          <div className="text-center p-4 bg-cream-dark rounded-lg">
            <div className="text-4xl mb-2">📝</div>
            <h4 className="font-semibold text-warmBrown">Patterns</h4>
            <p className="text-sm text-warmBrown-dark">Organize your collection</p>
          </div>
          <div className="text-center p-4 bg-cream-dark rounded-lg">
            <div className="text-4xl mb-2">🧵</div>
            <h4 className="font-semibold text-warmBrown">Yarn Stash</h4>
            <p className="text-sm text-warmBrown-dark">Track your inventory</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PatternsView() {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-2xl font-bold text-warmBrown mb-2">Pattern Library</h3>
      <p className="text-warmBrown-dark">Coming soon! Import and organize all your patterns.</p>
    </div>
  )
}

function CounterView() {
  return <RowCounter />
}

function StashView() {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">🧵</div>
      <h3 className="text-2xl font-bold text-warmBrown mb-2">Yarn Stash Tracker</h3>
      <p className="text-warmBrown-dark">Coming soon! Keep track of all your yarn.</p>
    </div>
  )
}

function PhotosView() {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">📸</div>
      <h3 className="text-2xl font-bold text-warmBrown mb-2">Progress Photos</h3>
      <p className="text-warmBrown-dark">Coming soon! Document your crochet journey.</p>
    </div>
  )
}

function PricingView() {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">💰</div>
      <h3 className="text-2xl font-bold text-warmBrown mb-2">Pricing Calculator</h3>
      <p className="text-warmBrown-dark">Coming soon! Calculate fair prices for your work.</p>
    </div>
  )
}
