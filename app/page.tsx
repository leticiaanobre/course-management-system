'use client'

import { useState, useEffect } from 'react'
import { fetchUsers, fetchCourses } from './services/api'
import { UserList } from './components/user-list'
import { CourseList } from './components/course-list'
import { Navigation } from './components/navigation'
import { ManagementForms } from './components/management-forms'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState('users')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [usersData, coursesData] = await Promise.all([
          fetchUsers(),
          fetchCourses()
        ])
        setUsers(usersData)
        setCourses(coursesData)
      } catch (error) {
        console.error('Error fetching data:', error)
        // setError('Failed to fetch data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-col p-4 bg-white mb-4 rounded-xl border border-solid border-gray-200'>
        <h1 className="text-2xl font-bold mb-2 text-stone-800">Controle de Cursos</h1>
        <p className='text-gray-500'>Tenha o controle de todos os cursos e usuários matriculados de forma organizada</p>
      </div>
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="view">Ver dados</TabsTrigger>
          <TabsTrigger value="manage">Gerenciar dados</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab}/>
          {activeTab === 'users' ? (
        <UserList users={users} />
      ) : (
        <CourseList courses={courses} />
      )}
          {/* <UserList users={users} />
          <CourseList courses={courses} /> */}
        </TabsContent>
        <TabsContent value="manage">
          <ManagementForms />
        </TabsContent>
      </Tabs>
    </div>
  )
}

