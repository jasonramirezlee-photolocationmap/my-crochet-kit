'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Minus, Trash2, RotateCcw, Bell } from 'lucide-react'

interface Counter {
  id: number
  project_name: string
  count: number
  alert_row: number | null
  alert_message: string | null
  created_at: string
}

const LOCAL_STORAGE_KEY = 'my-crochet-kit:row-counters'

const getStoredCounters = (): Counter[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Counter[]) : []
  } catch (error) {
    console.error('Error reading local counters:', error)
    return []
  }
}

const persistStoredCounters = (counters: Counter[]) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(counters))
  } catch (error) {
    console.error('Error saving local counters:', error)
  }
}

export default function RowCounter() {
  const [counters, setCounters] = useState<Counter[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [editingCounter, setEditingCounter] = useState<number | null>(null)
  const [editAlertRow, setEditAlertRow] = useState<string>('')
  const [editAlertMessage, setEditAlertMessage] = useState<string>('')

  // Load counters from database
  useEffect(() => {
    loadCounters()
  }, [])

  const shouldUseLocalStorage = !supabase

  const updateCounterState = (updater: (prev: Counter[]) => Counter[]) => {
    let updatedState: Counter[] = []
    setCounters((prev) => {
      updatedState = updater(prev)
      return updatedState
    })

    if (shouldUseLocalStorage) {
      persistStoredCounters(updatedState)
    }
  }

  async function loadCounters() {
    if (shouldUseLocalStorage) {
      setCounters(getStoredCounters())
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase!
        .from('counters')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCounters(data || [])
    } catch (error) {
      console.error('Error loading counters:', error)
      alert('Failed to load counters. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  async function addCounter() {
    const trimmedName = newProjectName.trim()
    if (!trimmedName) {
      alert('Please enter a project name!')
      return
    }

    if (shouldUseLocalStorage) {
      const newCounter: Counter = {
        id: Date.now(),
        project_name: trimmedName,
        count: 0,
        alert_row: null,
        alert_message: null,
        created_at: new Date().toISOString(),
      }

      updateCounterState((prev) => [newCounter, ...prev])
      setNewProjectName('')
      setShowAddForm(false)
      return
    }

    try {
      const { data, error } = await supabase!
        .from('counters')
        .insert([{ project_name: trimmedName, count: 0 }])
        .select()

      if (error) throw error
      if (!data || data.length === 0) throw new Error('No counter returned from Supabase.')

      updateCounterState((prev) => [data[0], ...prev])
      setNewProjectName('')
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding counter:', error)
      alert('Failed to add counter. Please try again.')
    }
  }

  async function updateCount(id: number, newCount: number) {
    // Don't allow negative counts
    if (newCount < 0) return

    const counter = counters.find(c => c.id === id)

    if (shouldUseLocalStorage) {
      updateCounterState((prev) => 
        prev.map(c => 
          c.id === id ? { ...c, count: newCount } : c
        )
      )

      if (counter?.alert_row && newCount === counter.alert_row && counter.alert_message) {
        alert(`🔔 ALERT: ${counter.alert_message}`)
      }
      return
    }

    try {
      const { error } = await supabase!
        .from('counters')
        .update({ count: newCount })
        .eq('id', id)

      if (error) throw error

      updateCounterState((prev) => 
        prev.map(c => 
          c.id === id ? { ...c, count: newCount } : c
        )
      )

      if (counter?.alert_row && newCount === counter.alert_row && counter.alert_message) {
        alert(`🔔 ALERT: ${counter.alert_message}`)
      }
    } catch (error) {
      console.error('Error updating count:', error)
      alert('Failed to update counter. Please try again.')
    }
  }

  async function resetCounter(id: number) {
    if (!confirm('Are you sure you want to reset this counter to 0?')) return

    await updateCount(id, 0)
  }

  async function deleteCounter(id: number) {
    if (!confirm('Are you sure you want to delete this counter? This cannot be undone!')) return

    if (shouldUseLocalStorage) {
      updateCounterState((prev) => prev.filter(c => c.id !== id))
      return
    }

    try {
      const { error } = await supabase!
        .from('counters')
        .delete()
        .eq('id', id)

      if (error) throw error

      updateCounterState((prev) => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting counter:', error)
      alert('Failed to delete counter. Please try again.')
    }
  }

  async function saveAlert(id: number) {
    const alertRow = editAlertRow ? parseInt(editAlertRow, 10) : null

    if (shouldUseLocalStorage) {
      updateCounterState((prev) => 
        prev.map(c => 
          c.id === id ? { 
            ...c, 
            alert_row: alertRow,
            alert_message: editAlertMessage || null
          } : c
        )
      )

      setEditingCounter(null)
      setEditAlertRow('')
      setEditAlertMessage('')
      return
    }

    try {
      const { error } = await supabase!
        .from('counters')
        .update({ 
          alert_row: alertRow,
          alert_message: editAlertMessage || null
        })
        .eq('id', id)

      if (error) throw error

      updateCounterState((prev) => 
        prev.map(c => 
          c.id === id ? { 
            ...c, 
            alert_row: alertRow,
            alert_message: editAlertMessage || null
          } : c
        )
      )

      setEditingCounter(null)
      setEditAlertRow('')
      setEditAlertMessage('')
    } catch (error) {
      console.error('Error saving alert:', error)
      alert('Failed to save alert. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🧶</div>
        <p className="text-warmBrown">Loading your counters...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-warmBrown mb-2">
          Row Counter 🧶
        </h1>
        <p className="text-warmBrown-dark">
          Never lose count again!
        </p>
      </div>

        {shouldUseLocalStorage && (
          <div className="bg-yellow-50 border border-yellow-200 text-sm text-warmBrown-dark p-4 rounded-lg mb-6">
            Supabase is not configured, so your counters are stored locally on this device.
          </div>
        )}

        {/* Add Counter Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary w-full mb-6 flex items-center justify-center gap-2"
        >
          <Plus size={24} />
          Add New Counter
        </button>
      )}

      {/* Add Counter Form */}
      {showAddForm && (
        <div className="card mb-6">
          <h3 className="font-bold text-warmBrown mb-4">New Counter</h3>
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name (e.g., Baby Blanket)"
            className="input-field mb-4"
            onKeyPress={(e) => e.key === 'Enter' && addCounter()}
            autoFocus
          />
          <div className="flex gap-3">
            <button onClick={addCounter} className="btn-primary flex-1">
              Create Counter
            </button>
            <button 
              onClick={() => {
                setShowAddForm(false)
                setNewProjectName('')
              }} 
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Counters List */}
      {counters.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🧶</div>
          <h3 className="text-2xl font-bold text-warmBrown mb-2">
            No Counters Yet!
          </h3>
          <p className="text-warmBrown-dark mb-6">
            Create your first counter to start tracking rows
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Add Your First Counter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {counters.map((counter) => (
            <div key={counter.id} className="card">
              {/* Project Name */}
              <h3 className="text-xl font-bold text-warmBrown mb-4">
                {counter.project_name}
              </h3>

              {/* Counter Display */}
              <div className="bg-cream-dark rounded-xl p-8 mb-4">
                <div className="text-center">
                  <div className="text-7xl font-bold text-rose mb-6">
                    {counter.count}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => updateCount(counter.id, counter.count - 1)}
                      className="bg-sage hover:bg-sage-dark text-white font-bold text-3xl w-20 h-20 rounded-full shadow-lg transition-all hover:scale-105"
                      disabled={counter.count === 0}
                    >
                      <Minus size={32} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => updateCount(counter.id, counter.count + 1)}
                      className="bg-rose hover:bg-rose-dark text-white font-bold text-3xl w-20 h-20 rounded-full shadow-lg transition-all hover:scale-105"
                    >
                      <Plus size={32} className="mx-auto" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert Display */}
              {counter.alert_row && counter.alert_message && (
                <div className="bg-lavender-light border-2 border-lavender rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Bell size={20} className="text-deepPurple mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-warmBrown">
                        Alert at row {counter.alert_row}
                      </p>
                      <p className="text-warmBrown-dark text-sm">
                        {counter.alert_message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Alert Form */}
              {editingCounter === counter.id ? (
                <div className="bg-cream-dark rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-warmBrown mb-3">
                    Set Alert
                  </h4>
                  <input
                    type="number"
                    value={editAlertRow}
                    onChange={(e) => setEditAlertRow(e.target.value)}
                    placeholder="Row number (e.g., 50)"
                    className="input-field mb-3"
                    min="1"
                  />
                  <input
                    type="text"
                    value={editAlertMessage}
                    onChange={(e) => setEditAlertMessage(e.target.value)}
                    placeholder="Alert message (e.g., Switch to blue yarn)"
                    className="input-field mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveAlert(counter.id)}
                      className="btn-primary flex-1"
                    >
                      Save Alert
                    </button>
                    <button
                      onClick={() => {
                        setEditingCounter(null)
                        setEditAlertRow('')
                        setEditAlertMessage('')
                      }}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingCounter(counter.id)
                    setEditAlertRow(counter.alert_row?.toString() || '')
                    setEditAlertMessage(counter.alert_message || '')
                  }}
                  className="w-full bg-lavender hover:bg-lavender-dark text-white font-semibold py-3 rounded-lg mb-4 transition-colors flex items-center justify-center gap-2"
                >
                  <Bell size={18} />
                  {counter.alert_row ? 'Edit Alert' : 'Set Alert'}
                </button>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => resetCounter(counter.id)}
                  className="flex-1 bg-warmBrown-light hover:bg-warmBrown text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
                <button
                  onClick={() => deleteCounter(counter.id)}
                  className="flex-1 bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
