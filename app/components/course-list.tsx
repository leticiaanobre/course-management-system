import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
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
  
  export function CourseList({ courses }: CourseListProps) {
    return (
      <Table>
        <TableCaption>List of Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.hours}</TableCell>
              <TableCell>{course.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  