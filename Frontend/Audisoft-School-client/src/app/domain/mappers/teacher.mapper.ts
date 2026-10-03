import { Teacher } from '../models/teacher.model';
import { CreateTeacherDto, UpdateTeacherDto, TeacherResponseDto } from '../dtos/teacher.dto';

export const TeacherMapper = {
  toModel: (dto: TeacherResponseDto): Teacher => ({
    id: dto.id,
    nombre: dto.nombre,
  }),

  toCreateDto: (formValue: { nombre: string }): CreateTeacherDto => ({
    nombre: formValue.nombre.trim(),
  }),

  toUpdateDto: (formValue: { nombre: string }): UpdateTeacherDto => ({
    nombre: formValue.nombre.trim(),
  }),
};