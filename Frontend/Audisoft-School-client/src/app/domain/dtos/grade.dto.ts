import { TeacherResponseDto } from './teacher.dto';
import { StudentResponseDto } from './student.dto';

export interface CreateGradeDto {
  name: string;
  value: number;
  teacherId: number;
  studentId: number;
}

export interface UpdateGradeDto {
  name: string;
  value: number;
  teacherId: number;
  studentId: number;
}

export interface GradeResponseDto {
  id: number;
  name: string;
  value: number;
  teacherId: number;
  studentId: number;
  teacher?: TeacherResponseDto;
  student?: StudentResponseDto;
}