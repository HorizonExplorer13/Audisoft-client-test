import { Teacher } from '../models/teacher.model';
import { CreateTeacherDto, UpdateTeacherDto } from '../dtos/teacher.dto';

export interface TeacherRepository {
  getAll(): Promise<Teacher[]>;
  getById(id: number): Promise<Teacher>;
  create(dto: CreateTeacherDto): Promise<Teacher>;
  update(id: number, dto: UpdateTeacherDto): Promise<Teacher>;
  delete(id: number): Promise<void>;
}