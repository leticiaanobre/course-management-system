'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList>
        <TabsTrigger value="users">Usuários</TabsTrigger>
        <TabsTrigger value="courses">Cursos</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

