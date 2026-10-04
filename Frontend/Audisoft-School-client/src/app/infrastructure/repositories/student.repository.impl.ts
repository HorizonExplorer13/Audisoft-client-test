import { Injectable, inject } from '@angular/core';
import { StudentRepository } from '../../domain/repositories/student.repository';
import { Student } from '../../domain/models/student.model';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from '../../domain/dtos/student.dto';
import { ApiClientService } from '../api/api-client.service';
import { ENDPOINTS } from '../api/endpoints';
import { StudentApiMapper } from '../mappers/student.api-mapper';
import { ApiResponse } from '../../core/interceptors/api-response.interceptor';

@Injectable({ providedIn: 'root' })
export class StudentRepositoryImpl implements StudentRepository {
  private api = inject(ApiClientService);

  async getAll(): Promise<Student[]> {
    const response = await this.api.get<ApiResponse<StudentResponseDto[]>>(ENDPOINTS.students).toPromise();
    return response!.data!.map(StudentApiMapper.toDomain);
  }

  async getById(id: number): Promise<Student> {
    const response = await this.api.get<ApiResponse<StudentResponseDto>>(`${ENDPOINTS.students}/${id}`).toPromise();
    return StudentApiMapper.toDomain(response!.data!);
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const apiDto = StudentApiMapper.toCreateApi(dto);
    const response = await this.api.post<ApiResponse<StudentResponseDto>>(ENDPOINTS.students, apiDto).toPromise();
    return StudentApiMapper.toDomain(response?.data!);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const apiDto = StudentApiMapper.toUpdateApi(dto);
    const response = await this.api.put<ApiResponse<StudentResponseDto>>(`${ENDPOINTS.students}/${id}`, apiDto).toPromise();
    return StudentApiMapper.toDomain(response!.data!);
  }

  async delete(id: number): Promise<void> {
    await this.api.delete<ApiResponse<void>>(`${ENDPOINTS.students}/${id}`).toPromise();
  }
}