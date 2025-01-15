/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createCourse, createUser, enrollUser } from '../services/api'

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

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
    
      try {
        const user = await createUser(userData);
        setUsers((prev) => [...prev, user]);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
    
    const handleCreateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const courseData = Object.fromEntries(formData);
    
      try {
        const course = await createCourse(courseData);
        setCourses((prev) => [...prev, course]);
      } catch (error) {
        console.error("Error creating course:", error);
      }
    };
    
    const handleEnrollUser = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const enrollmentData = Object.fromEntries(formData);
    
      try {
        await enrollUser(enrollmentData);
      } catch (error) {
        console.error("Error enrolling user:", error);
      }
    };    
    

  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="user">Criar usuário</TabsTrigger>
        <TabsTrigger value="course">Criar curso</TabsTrigger>
        <TabsTrigger value="enroll">Matricular aluno</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar aluno</CardTitle>
            <CardDescription>Adicione um novo usuário no sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="john@example.com" type="email" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button type="submit">Criar</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="course">
        <Card>
          <CardHeader>
            <CardTitle>Criar Curso</CardTitle>
            <CardDescription>Adicione um novo curso no sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCourse}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Titulo do curso</Label>
                  <Input id="title" name="title" placeholder="Ex: Introdução ao React" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" placeholder="Sua descrição..." required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="hours">Horas</Label>
                  <Input id="hours" name="hours" type="number" placeholder="40" required />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button type="submit">Criar</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="enroll">
        <Card>
          <CardHeader>
            <CardTitle>Matricule um aluno</CardTitle>
            <CardDescription>Escolha um usuário e o curso a ser matriculado. Apenas um por vez.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEnrollUser}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="user_id">Usuário</Label>
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
                  <Label htmlFor="course_id">Curso</Label>
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
                <Button type="submit">Matricular</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

