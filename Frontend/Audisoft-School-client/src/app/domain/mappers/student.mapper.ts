import { Student } from '../models/student.model';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from '../dtos/student.dto';

export const StudentMapper = {
  toModel: (dto: StudentResponseDto): Student => ({
    id: dto.id,
    name: dto.name,
  }),

  toCreateDto: (formValue: { name: string }): CreateStudentDto => ({
    name: formValue.name.trim(),
  }),

  toUpdateDto: (formValue: { name: string }): UpdateStudentDto => ({
    name: formValue.name.trim(),
  }),
};