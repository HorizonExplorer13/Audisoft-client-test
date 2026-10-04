import { TeacherResponseDto } from '../../domain/dtos/teacher.dto';
import { CreateTeacherDto, UpdateTeacherDto } from '../../domain/dtos/teacher.dto';

export const TeacherApiMapper = {
  toDomain: (dto: TeacherResponseDto) => ({
    id: dto.id,
    nombre: dto.nombre,
  }),

  toCreateApi: (domain: CreateTeacherDto) => ({
    Nombre: domain.nombre,
  }),

  toUpdateApi: (domain: UpdateTeacherDto) => ({
    Nombre: domain.nombre,
  }),
};