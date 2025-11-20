import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import CharacterSelect from './components/CharacterSelect'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'

function App() {
  const [character, setCharacter] = useState('Levi Ackerman')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Choose a character and say hi! ✨' },
  ])
  const [loading, setLoading] = useState(false)

  const baseUrl = useMemo(() => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  }, [])

  const listRef = useRef(null)
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (userText) => {
    const newMsgs = [...messages, { role: 'user', text: userText }]
    setMessages(newMsgs)
    setLoading(true)
    try {
      const res = await axios.post(`${baseUrl}/chat`, {
        character,
        message: userText,
      })
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Error talking to the backend. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0716] via-[#0c0a1a] to-[#0b0716] text-purple-100">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-blue-300 to-purple-200 bg-clip-text text-transparent">Anime Character Chatbot</h1>
            <p className="text-purple-300/70 text-sm">Dark purple vibes • Neon blue accents</p>
          </div>
          <CharacterSelect value={character} onChange={setCharacter} />
        </header>

        <main className="bg-slate-900/40 backdrop-blur border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
          <div
            ref={listRef}
            className="h-[60vh] overflow-y-auto p-6 space-y-1 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.08),transparent_40%)]"
          >
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} text={m.text} />
            ))}
          </div>

          <div className="border-t border-purple-500/20 p-4 bg-slate-950/40">
            <ChatInput onSend={sendMessage} loading={loading} />
          </div>
        </main>

        <footer className="mt-4 text-center text-xs text-purple-300/60">
          Backend URL: <span className="font-mono">{baseUrl}</span>
        </footer>
      </div>
    </div>
  )
}

export default App
