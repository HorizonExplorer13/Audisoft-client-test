import { Student } from '../models/student.model';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from '../dtos/student.dto';

export const StudentMapper = {
  toModel: (dto: StudentResponseDto): Student => ({
    id: dto.id,
    nombre: dto.nombre,
  }),

  toCreateDto: (formValue: { nombre: string }): CreateStudentDto => ({
    nombre: formValue.nombre.trim(),
  }),

  toUpdateDto: (formValue: { nombre: string }): UpdateStudentDto => ({
    nombre: formValue.nombre.trim(),
  }),
};