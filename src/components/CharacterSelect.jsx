import React from 'react'

const characters = [
  { label: 'Levi Ackerman', value: 'Levi Ackerman' },
  { label: 'Satoru Gojo', value: 'Satoru Gojo' },
]

export default function CharacterSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-purple-200">Character</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-purple-900/40 border border-purple-500/40 text-purple-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/60 shadow-inner"
      >
        {characters.map((c) => (
          <option key={c.value} value={c.value} className="bg-slate-900">
            {c.label}
          </option>
        ))}
      </select>
    </div>
  )
}
