import { Grade } from '../models/grade.model';
import { CreateGradeDto, UpdateGradeDto, GradeResponseDto } from '../dtos/grade.dto';
import { TeacherMapper } from './teacher.mapper';
import { StudentMapper } from './student.mapper';

export const GradeMapper = {
  toModel: (dto: GradeResponseDto): Grade => ({
    id: dto.id,
    nombre: dto.nombre,
    valor: dto.valor,
    idProfesor: dto.idProfesor,
    idEstudiante: dto.idEstudiante,
    profesor: dto.profesor ? TeacherMapper.toModel(dto.profesor) : undefined,
    estudiante: dto.estudiante ? StudentMapper.toModel(dto.estudiante) : undefined,
  }),

  toCreateDto: (formValue: { nombre: string; valor: number; idProfesor: number; idEstudiante: number }): CreateGradeDto => ({
    nombre: formValue.nombre.trim(),
    valor: formValue.valor,
    idProfesor: formValue.idProfesor,
    idEstudiante: formValue.idEstudiante,
  }),

  toUpdateDto: (formValue: { nombre: string; valor: number; idProfesor: number; idEstudiante: number }): UpdateGradeDto => ({
    nombre: formValue.nombre.trim(),
    valor: formValue.valor,
    idProfesor: formValue.idProfesor,
    idEstudiante: formValue.idEstudiante,
  }),
};