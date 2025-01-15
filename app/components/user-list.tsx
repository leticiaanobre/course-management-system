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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination" 

interface Enrollment {
  id: number;
  course: {
    id: number;
    name: string;
  };
  enrolled_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  enrollments: Enrollment[];
}

interface UserListProps {
  users: User[];
}

const USERS_PER_PAGE = 5; 

export function UserList({ users }: UserListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o índice de início e fim para os usuários da página atual
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  // Função para navegar entre as páginas
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return; // Impede navegação para páginas inválidas
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <div>
      <Table>
        <TableCaption>List of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Enrollments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${user.id}`}>
                    <AccordionTrigger>View Enrollments</AccordionTrigger>
                    <AccordionContent>
                      {user.enrollments.map((enrollment) => (
                        <div key={enrollment.id} className="mb-2">
                          <p>Course: {enrollment.course.name}</p>
                          <p>Enrolled at: {enrollment.enrolled_at}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
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
  );
}
