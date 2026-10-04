import { StudentResponseDto } from '../../domain/dtos/student.dto';
import { CreateStudentDto, UpdateStudentDto } from '../../domain/dtos/student.dto';

export const StudentApiMapper = {
  toDomain: (dto: StudentResponseDto) => ({
    id: dto?.id,
    name: dto?.name,
  }),

  toCreateApi: (domain: CreateStudentDto) => ({
    name: domain.name,
  }),

  toUpdateApi: (domain: UpdateStudentDto) => ({
    name: domain.name,
  }),
};