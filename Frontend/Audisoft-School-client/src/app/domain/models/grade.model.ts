import { Teacher } from './teacher.model';
import { Student } from './student.model';

export interface Grade {
  id: number;
  name: string;
  value: number;
  teacherId: number;
  studentId: number;
  teacher?: Teacher;
  student?: Student;
}