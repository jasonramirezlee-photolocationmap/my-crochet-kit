'use client'
import RowCounter from '../components/RowCounter'
import { useState } from 'react'
import { Home, Book, Hash, Package, Camera, DollarSign, Settings } from 'lucide-react'

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

// Navigation items
const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'patterns', label: 'Patterns', icon: Book },
  { id: 'counter', label: 'Counter', icon: Hash },
  { id: 'stash', label: 'Stash', icon: Package },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
]

// Dashboard View
function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-warmBrown mb-2">
          Welcome back! 👋
        </h2>
        <p className="text-warmBrown-dark">
          Ready to create something beautiful today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-rose mb-1">3</div>
          <div className="text-sm text-warmBrown-dark">Active Projects</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-sage mb-1">12</div>
          <div className="text-sm text-warmBrown-dark">Saved Patterns</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-lavender mb-1">45</div>
          <div className="text-sm text-warmBrown-dark">Yarn Skeins</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-deepPurple mb-1">8h</div>
          <div className="text-sm text-warmBrown-dark">This Week</div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card">
        <h3 className="text-xl font-bold text-warmBrown mb-4">
          Continue Your Work
        </h3>
        <div className="space-y-3">
          <ProjectCard
            name="Cozy Baby Blanket"
            progress={67}
            lastWorked="2 hours ago"
          />
          <ProjectCard
            name="Market Tote Bag"
            progress={34}
            lastWorked="Yesterday"
          />
          <ProjectCard
            name="Amigurumi Bunny"
            progress={89}
            lastWorked="3 days ago"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button className="card text-left hover:bg-cream-dark">
          <div className="text-rose text-3xl mb-2">➕</div>
          <h4 className="font-bold text-warmBrown">Start New Project</h4>
          <p className="text-sm text-warmBrown-dark">
            Begin tracking a new crochet creation
          </p>
        </button>
        <button className="card text-left hover:bg-cream-dark">
          <div className="text-sage text-3xl mb-2">📤</div>
          <h4 className="font-bold text-warmBrown">Import Pattern</h4>
          <p className="text-sm text-warmBrown-dark">
            Add a PDF pattern to your library
          </p>
        </button>
      </div>
    </div>
  )
}

// Other view components (placeholders for now)
function PatternsView() {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-2xl font-bold text-warmBrown mb-2">Pattern Library</h3>
      <p className="text-warmBrown-dark">Coming soon! Your patterns will live here.</p>
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
      <h3 className="text-2xl font-bold text-warmBrown mb-2">Yarn Stash</h3>
      <p className="text-warmBrown-dark">Coming soon! Track all your beautiful yarn.</p>
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
      <p className="text-warmBrown-dark">Coming soon! Price your work fairly.</p>
    </div>
  )
}

// Helper component
function ProjectCard({ name, progress, lastWorked }: { name: string; progress: number; lastWorked: string }) {
  return (
    <div className="border-2 border-cream-dark rounded-lg p-4 hover:border-rose transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-warmBrown">{name}</h4>
        <span className="text-sm text-warmBrown-dark">{lastWorked}</span>
      </div>
      <div className="w-full bg-cream-dark rounded-full h-2">
        <div
          className="bg-rose h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right text-sm text-warmBrown-dark mt-1">
        {progress}% complete
      </div>
    </div>
  )
}
