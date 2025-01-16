import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { useState } from "react"

interface Course {
  id: number;
  title: string;
  description: string;
  hours: number;
  created_at: string;
}

interface CourseListProps {
  courses: Course[];
}

const COURSES_PER_PAGE = 5; 

export function CourseList({ courses }: CourseListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calcula o índice de início e fim para os cursos da página atual
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE
  const currentCourses = courses.slice(startIndex, startIndex + COURSES_PER_PAGE)

  // Função para navegar entre as páginas
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return // Impede navegação para páginas inválidas
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE)

  return (
    <div>
      <Table>
        <TableCaption>Cursos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Titulo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Horas</TableHead>
            <TableHead>Criado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-semibold text-fuchsia-700">{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.hours}</TableCell>
              <TableCell>{course.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação com os componentes do Chadcn */}
      <div className="mt-4">
        <Pagination>
          <PaginationPrevious
            onClick={() => goToPage(currentPage - 1)}
            className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
            aria-disabled={currentPage === 1}
          >
            Previous
          </PaginationPrevious>

          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>

          <PaginationNext
            onClick={() => goToPage(currentPage + 1)}
            className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  )
}
