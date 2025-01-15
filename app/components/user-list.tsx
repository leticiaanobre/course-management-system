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
  
  export function UserList({ users }: UserListProps) {
    return (
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
          {users.map((user) => (
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
    )
  }
  
  