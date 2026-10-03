import { TeacherResponseDto } from './teacher.dto';
import { StudentResponseDto } from './student.dto';

export interface CreateGradeDto {
  nombre: string;
  valor: number;
  idProfesor: number;
  idEstudiante: number;
}

export interface UpdateGradeDto {
  nombre: string;
  valor: number;
  idProfesor: number;
  idEstudiante: number;
}

export interface GradeResponseDto {
  id: number;
  nombre: string;
  valor: number;
  idProfesor: number;
  idEstudiante: number;
  profesor?: TeacherResponseDto;
  estudiante?: StudentResponseDto;
}