import { useState, useEffect } from 'react'
import { format } from 'date-fns'

function App() {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('assignments')
    return saved ? JSON.parse(saved) : []
  })
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium'
  })

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments))
  }, [assignments])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newAssignment.title) return
    
    setAssignments([...assignments, { ...newAssignment, id: Date.now() }])
    setNewAssignment({
      title: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      priority: 'medium'
    })
  }

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-200'
      case 'medium': return 'bg-yellow-200'
      case 'low': return 'bg-green-200'
      default: return 'bg-gray-200'
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl mb-8 text-center">✨ Migo and Lili's Dues ✨</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl shadow-lg" style={{ backgroundColor: 'var(--primary-color)' }}>
          <div className="mb-4">
            <label className="block mb-2 text-xl">Assignment</label>
            <input
              type="text"
              className="input"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              placeholder="What do you need to do?"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-xl">Due Date</label>
            <input
              type="date"
              className="input"
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-xl">Priority</label>
            <select
              className="input"
              value={newAssignment.priority}
              onChange={(e) => setNewAssignment({ ...newAssignment, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button type="submit" className="btn w-full text-xl">
            Add Assignment ✏️
          </button>
        </form>

        <div className="space-y-4">
          {assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(assignment => (
            <div
              key={assignment.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center ${getPriorityColor(assignment.priority)}`}
            >
              <div>
                <h3 className="text-xl font-bold">{assignment.title}</h3>
                <p className="text-gray-700">Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</p>
              </div>
              <button
                onClick={() => deleteAssignment(assignment.id)}
                className="text-2xl hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App