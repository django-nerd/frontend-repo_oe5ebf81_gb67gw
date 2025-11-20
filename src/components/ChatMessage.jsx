import React from 'react'

export default function ChatMessage({ role, text }) {
  const isUser = role === 'user'
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white'
            : 'bg-purple-900/60 text-purple-100 border border-purple-500/30'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
