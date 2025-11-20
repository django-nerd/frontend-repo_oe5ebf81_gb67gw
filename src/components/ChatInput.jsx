import React, { useState } from 'react'

export default function ChatInput({ onSend, loading }) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || loading) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-3">
      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 resize-none bg-slate-900/60 border border-purple-500/30 rounded-xl px-3 py-2 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium shadow-lg"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  )
}
