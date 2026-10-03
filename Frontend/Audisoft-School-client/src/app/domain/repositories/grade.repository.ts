import { Grade } from '../models/grade.model';
import { CreateGradeDto, UpdateGradeDto } from '../dtos/grade.dto';

export interface GradeRepository {
  getAll(): Promise<Grade[]>;
  getById(id: number): Promise<Grade>;
  create(dto: CreateGradeDto): Promise<Grade>;
  update(id: number, dto: UpdateGradeDto): Promise<Grade>;
  delete(id: number): Promise<void>;
}