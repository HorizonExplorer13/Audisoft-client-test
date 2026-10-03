import { Teacher } from './teacher.model';
import { Student } from './student.model';

export interface Grade {
  id: number;
  nombre: string;
  valor: number;
  idProfesor: number;
  idEstudiante: number;
  profesor?: Teacher;
  estudiante?: Student;
}