import { Teacher } from '../models/teacher.model';
import { CreateTeacherDto, UpdateTeacherDto, TeacherResponseDto } from '../dtos/teacher.dto';

export const TeacherMapper = {
  toModel: (dto: TeacherResponseDto): Teacher => ({
    id: dto.id,
    name: dto.name,
  }),

  toCreateDto: (formValue: { name: string }): CreateTeacherDto => ({
    name: formValue.name.trim(),
  }),

  toUpdateDto: (formValue: { name: string }, id: number): UpdateTeacherDto => ({
    id,
    name: formValue.name.trim(),
  }),
};