'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Minus, Trash2, Edit2, RotateCcw, Bell } from 'lucide-react'

interface Counter {
  id: number
  project_name: string
  count: number
  alert_row: number | null
  alert_message: string | null
  created_at: string
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

  async function loadCounters() {
    try {
      const { data, error } = await supabase
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
    if (!newProjectName.trim()) {
      alert('Please enter a project name!')
      return
    }

    try {
      const { data, error } = await supabase
        .from('counters')
        .insert([{ project_name: newProjectName, count: 0 }])
        .select()

      if (error) throw error
      
      setCounters([data[0], ...counters])
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

    try {
      const { error } = await supabase
        .from('counters')
        .update({ count: newCount })
        .eq('id', id)

      if (error) throw error

      setCounters(counters.map(c => 
        c.id === id ? { ...c, count: newCount } : c
      ))

      // Check if we hit an alert
      const counter = counters.find(c => c.id === id)
      if (counter?.alert_row && newCount === counter.alert_row && counter.alert_message) {
        aler
