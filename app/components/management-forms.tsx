'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'

interface User {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  hours: number;
}
export function ManagementForms() {
    const [users, setUsers] = useState<User[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)
    try {
      const response = await axios.post('/users', userData)
      alert('User created successfully!')
      setUsers([...users, response.data.user])
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert('Error: ' + error.response?.data.error || error.message);
          } else {
            alert('Unexpected error occurred');
          }
    }
  }

  const createCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const courseData = Object.fromEntries(formData)
    try {
      const response = await axios.post('/api/courses', courseData)
      alert('Course created successfully!')
      setCourses([...courses, response.data.course])
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert('Error: ' + error.response?.data.error || error.message);
          } else {
            alert('Unexpected error occurred');
          }
    }
  }

  const enrollUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const enrollmentData = Object.fromEntries(formData)
    try {
      await axios.post('/api/enrollments', enrollmentData)
      alert('User enrolled successfully!')
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert('Error: ' + error.response?.data.error || error.message);
          } else {
            alert('Unexpected error occurred');
          }
    }
  }

  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="user">Create User</TabsTrigger>
        <TabsTrigger value="course">Create Course</TabsTrigger>
        <TabsTrigger value="enroll">Enroll User</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
            <CardDescription>Add a new user to the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createUser}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="john@example.com" type="email" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button type="submit">Create User</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="course">
        <Card>
          <CardHeader>
            <CardTitle>Create Course</CardTitle>
            <CardDescription>Add a new course to the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createCourse}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" placeholder="Introduction to React" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Course description..." required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="hours">Hours</Label>
                  <Input id="hours" name="hours" type="number" placeholder="40" required />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button type="submit">Create Course</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="enroll">
        <Card>
          <CardHeader>
            <CardTitle>Enroll User</CardTitle>
            <CardDescription>Enroll a user in a course.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={enrollUser}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="user_id">User</Label>
                  <Select name="user_id" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="course_id">Course</Label>
                  <Select name="course_id" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>{course.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button type="submit">Enroll User</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

