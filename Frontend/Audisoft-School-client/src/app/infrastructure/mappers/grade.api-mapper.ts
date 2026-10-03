import { GradeResponseDto } from '../../domain/dtos/grade.dto';
import { CreateGradeDto, UpdateGradeDto } from '../../domain/dtos/grade.dto';

export const GradeApiMapper = {
  toDomain: (dto: GradeResponseDto) => ({
    id: dto.id,
    nombre: dto.nombre,
    valor: dto.valor,
    idProfesor: dto.idProfesor,
    idEstudiante: dto.idEstudiante,
    profesor: dto.profesor ? { id: dto.profesor.id, nombre: dto.profesor.nombre } : undefined,
    estudiante: dto.estudiante ? { id: dto.estudiante.id, nombre: dto.estudiante.nombre } : undefined,
  }),

  toCreateApi: (domain: CreateGradeDto) => ({
    nombre: domain.nombre,
    valor: domain.valor,
    idProfesor: domain.idProfesor,
    idEstudiante: domain.idEstudiante,
  }),

  toUpdateApi: (domain: UpdateGradeDto) => ({
    nombre: domain.nombre,
    valor: domain.valor,
    idProfesor: domain.idProfesor,
    idEstudiante: domain.idEstudiante,
  }),
};