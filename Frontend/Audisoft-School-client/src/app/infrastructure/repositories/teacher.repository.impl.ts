import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../domain/repositories/teacher.repository';
import { Teacher } from '../../domain/models/teacher.model';
import { CreateTeacherDto, UpdateTeacherDto, TeacherResponseDto } from '../../domain/dtos/teacher.dto';
import { ApiClientService } from '../api/api-client.service';
import { ENDPOINTS } from '../api/endpoints';
import { TeacherApiMapper } from '../mappers/teacher.api-mapper';
import { ApiResponse } from '../../core/interceptors/api-response.interceptor';

@Injectable({ providedIn: 'root' })
export class TeacherRepositoryImpl implements TeacherRepository {
  private api = inject(ApiClientService);

  async getAll(): Promise<Teacher[]> {
    const response = await this.api.get<ApiResponse<TeacherResponseDto[]>>(ENDPOINTS.teachers).toPromise();
    return response!.data!.map(TeacherApiMapper.toDomain);
  }

  async getById(id: number): Promise<Teacher> {
    const response = await this.api.get<ApiResponse<TeacherResponseDto>>(`${ENDPOINTS.teachers}/${id}`).toPromise();
    return TeacherApiMapper.toDomain(response!.data!);
  }

  async create(dto: CreateTeacherDto): Promise<Teacher> {
    const apiDto = TeacherApiMapper.toCreateApi(dto);
    const response = await this.api.post<ApiResponse<TeacherResponseDto>>(ENDPOINTS.teachers, apiDto).toPromise();
    return TeacherApiMapper.toDomain(response!.data!);
  }

  async update(id: number, dto: UpdateTeacherDto): Promise<Teacher> {
    const apiDto = TeacherApiMapper.toUpdateApi(dto);
    const response = await this.api.put<ApiResponse<TeacherResponseDto>>(`${ENDPOINTS.teachers}/${id}`, apiDto).toPromise();
    return TeacherApiMapper.toDomain(response!.data!);
  }

  async delete(id: number): Promise<void> {
    await this.api.delete<ApiResponse<void>>(`${ENDPOINTS.teachers}/${id}`).toPromise();
  }
}