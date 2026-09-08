import { useState, useEffect } from 'react'
import AddJobForm from '../AddJobForm'
import { useAuth } from '../context/AuthContext'

export type Job = {
  _id: string
  company: string
  role: string
  status: string
}

const API_URL = 'https://job-tracker-api-21jj.onrender.com/api/jobs'

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filter, setFilter] = useState('All')
  const { token, user, logout } = useAuth()

  useEffect(() => {
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data))
  }, [token])

  async function addJob(company: string, role: string) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ company, role }),
    })
    const newJob = await res.json()
    setJobs([newJob, ...jobs])
  }

  async function deleteJob(id: string) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setJobs(jobs.filter((job) => job._id !== id))
  }

  async function updateStatus(id: string, newStatus: string) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
    const updatedJob = await res.json()
    setJobs(jobs.map((job) => (job._id === id ? updatedJob : job)))
  }

  const filteredJobs =
    filter === 'All' ? jobs : jobs.filter((job) => job.status === filter)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Application Tracker</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">Hi, {user?.name}</span>
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <AddJobForm onAdd={addJob} />

        <div className="flex gap-2 mb-4">
          {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded text-sm ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-slate-800 border border-slate-700 rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{job.role}</p>
                <p className="text-slate-400 text-sm">{job.company}</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job._id, e.target.value)}
                  className="bg-slate-700 text-sm rounded px-2 py-1"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>

                <button
                  onClick={() => deleteJob(job._id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard