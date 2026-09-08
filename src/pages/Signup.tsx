import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const API_URL = 'https://job-tracker-api-21jj.onrender.com/api/auth'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong')
        return
      }

      login(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError('Could not connect to server')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-700 rounded px-3 py-2 mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-700 rounded px-3 py-2 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-700 rounded px-3 py-2 mb-4"
          required
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded py-2 font-medium">
          Sign Up
        </button>

        <p className="text-slate-400 text-sm mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup