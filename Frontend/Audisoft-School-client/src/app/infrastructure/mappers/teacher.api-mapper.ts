import { TeacherResponseDto } from '../../domain/dtos/teacher.dto';
import { CreateTeacherDto, UpdateTeacherDto } from '../../domain/dtos/teacher.dto';

export const TeacherApiMapper = {
  toDomain: (dto: TeacherResponseDto) => ({
    id: dto.id,
    nombre: dto.nombre,
  }),

  toCreateApi: (domain: CreateTeacherDto) => ({
    nombre: domain.nombre,
  }),

  toUpdateApi: (domain: UpdateTeacherDto) => ({
    nombre: domain.nombre,
  }),
};