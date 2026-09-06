import { useState } from 'react'

function AddJobForm({ onAdd }: { onAdd: (company: string, role: string) => void }) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onAdd(company, role)
    setCompany('')
    setRole('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white flex-1"
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
      >
        Add Job
      </button>
    </form>
  )
}

export default AddJobForm