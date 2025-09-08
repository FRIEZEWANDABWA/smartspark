import { useState, useEffect } from 'react'
import { Users, MessageSquare, FolderOpen, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    projects: 0,
    users: 0
  })

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [contactsRes, projectsRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/projects')
        ])
        
        const contacts = await contactsRes.json()
        const projects = await projectsRes.json()
        
        setStats({
          contacts: contacts.length || 0,
          projects: projects.length || 0,
          users: 1 // Default admin user
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="text-blue-600 mr-4" size={32} />
              <div>
                <p className="text-2xl font-bold">{stats.contacts}</p>
                <p className="text-gray-600">Contact Messages</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FolderOpen className="text-green-600 mr-4" size={32} />
              <div>
                <p className="text-2xl font-bold">{stats.projects}</p>
                <p className="text-gray-600">Projects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="text-purple-600 mr-4" size={32} />
              <div>
                <p className="text-2xl font-bold">{stats.users}</p>
                <p className="text-gray-600">Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/admin/contacts" className="block bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                Manage Contacts
              </a>
              <a href="/admin/projects" className="block bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
                Manage Projects
              </a>
              <a href="/admin/services" className="block bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
                Manage Services
              </a>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• New contact message received</p>
              <p>• Project portfolio updated</p>
              <p>• Service pricing modified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}