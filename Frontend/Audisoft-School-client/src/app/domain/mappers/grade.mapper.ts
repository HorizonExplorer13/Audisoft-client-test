import { Grade } from '../models/grade.model';
import { CreateGradeDto, UpdateGradeDto, GradeResponseDto } from '../dtos/grade.dto';
import { TeacherMapper } from './teacher.mapper';
import { StudentMapper } from './student.mapper';

export const GradeMapper = {
  toModel: (dto: GradeResponseDto): Grade => ({
    id: dto.id,
    name: dto.name,
    value: dto.value,
    teacherId: dto.teacherId,
    studentId: dto.studentId,
    teacher: dto.teacher ? TeacherMapper.toModel(dto.teacher) : undefined,
    student: dto.student ? StudentMapper.toModel(dto.student) : undefined,
  }),

  toCreateDto: (formValue: { name: string; value: number; teacherId: number; studentId: number }): CreateGradeDto => ({
    name: formValue.name.trim(),
    value: formValue.value,
    teacherId: formValue.teacherId,
    studentId: formValue.studentId,
  }),

  toUpdateDto: (formValue: { name: string; value: number; teacherId: number; studentId: number }): UpdateGradeDto => ({
    name: formValue.name.trim(),
    value: formValue.value,
    teacherId: formValue.teacherId,
    studentId: formValue.studentId,
  }),
};