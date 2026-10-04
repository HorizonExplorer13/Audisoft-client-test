import { StudentResponseDto } from '../../domain/dtos/student.dto';
import { CreateStudentDto, UpdateStudentDto } from '../../domain/dtos/student.dto';

export const StudentApiMapper = {
  toDomain: (dto: StudentResponseDto) => ({
    id: dto?.id,
    nombre: dto?.nombre,
  }),

  toCreateApi: (domain: CreateStudentDto) => ({
    Nombre: domain.nombre,
  }),

  toUpdateApi: (domain: UpdateStudentDto) => ({
    Nombre: domain.nombre,
  }),
};