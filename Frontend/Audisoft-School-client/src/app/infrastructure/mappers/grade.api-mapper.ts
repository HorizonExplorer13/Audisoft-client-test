import { GradeResponseDto } from '../../domain/dtos/grade.dto';
import { CreateGradeDto, UpdateGradeDto } from '../../domain/dtos/grade.dto';

export const GradeApiMapper = {
  toDomain: (dto: GradeResponseDto) => ({
    id: dto.id,
    name: dto.name,
    value: dto.value,
    teacherId: dto.teacherId,
    studentId: dto.studentId,
    teacher: dto.teacher ? { id: dto.teacher.id, name: dto.teacher.name } : undefined,
    student: dto.student ? { id: dto.student.id, name: dto.student.name } : undefined,
  }),

  toCreateApi: (domain: CreateGradeDto) => ({
    name: domain.name,
    value: domain.value,
    teacherId: domain.teacherId,
    studentId: domain.studentId,
  }),

  toUpdateApi: (domain: UpdateGradeDto) => ({
    name: domain.name,
    value: domain.value,
    teacherId: domain.teacherId,
    studentId: domain.studentId,
  }),
};