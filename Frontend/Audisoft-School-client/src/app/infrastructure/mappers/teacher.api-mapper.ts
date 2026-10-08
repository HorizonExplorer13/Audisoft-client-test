import { TeacherResponseDto } from '../../domain/dtos/teacher.dto';
import { CreateTeacherDto, UpdateTeacherDto } from '../../domain/dtos/teacher.dto';

export const TeacherApiMapper = {
  toDomain: (dto: TeacherResponseDto) => ({
    id: dto.id,
    name: dto.name,
  }),

  toCreateApi: (domain: CreateTeacherDto) => ({
    name: domain.name,
  }),

  toUpdateApi: (domain: UpdateTeacherDto) => ({
    id: domain.id,
    name: domain.name,
  }),
};