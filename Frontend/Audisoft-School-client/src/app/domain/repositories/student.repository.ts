import { Student } from '../models/student.model';
import { CreateStudentDto, UpdateStudentDto } from '../dtos/student.dto';

export interface StudentRepository {
  getAll(): Promise<Student[]>;
  getById(id: number): Promise<Student>;
  create(dto: CreateStudentDto): Promise<Student>;
  update(id: number, dto: UpdateStudentDto): Promise<Student>;
  delete(id: number): Promise<void>;
}