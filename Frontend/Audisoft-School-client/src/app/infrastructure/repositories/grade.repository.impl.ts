import { Injectable, inject } from '@angular/core';
import { GradeRepository } from '../../domain/repositories/grade.repository';
import { Grade } from '../../domain/models/grade.model';
import { CreateGradeDto, UpdateGradeDto, GradeResponseDto } from '../../domain/dtos/grade.dto';
import { ApiClientService } from '../api/api-client.service';
import { ENDPOINTS } from '../api/endpoints';
import { GradeApiMapper } from '../mappers/grade.api-mapper';
import { ApiResponse } from '../../core/interceptors/api-response.interceptor';

@Injectable({ providedIn: 'root' })
export class GradeRepositoryImpl implements GradeRepository {
  private api = inject(ApiClientService);

  async getAll(): Promise<Grade[]> {
    const response = await this.api.get<ApiResponse<GradeResponseDto[]>>(ENDPOINTS.grades).toPromise();
    return response!.data!.map(GradeApiMapper.toDomain);
  }

  async getById(id: number): Promise<Grade> {
    const response = await this.api.get<ApiResponse<GradeResponseDto>>(`${ENDPOINTS.grades}/${id}`).toPromise();
    return GradeApiMapper.toDomain(response!.data!);
  }

  async create(dto: CreateGradeDto): Promise<Grade> {
    const apiDto = GradeApiMapper.toCreateApi(dto);
    const response = await this.api.post<ApiResponse<GradeResponseDto>>(ENDPOINTS.grades, apiDto).toPromise();
    return GradeApiMapper.toDomain(response!.data!);
  }

  async update(id: number, dto: UpdateGradeDto): Promise<Grade> {
    const apiDto = GradeApiMapper.toUpdateApi(dto);
    const response = await this.api.put<ApiResponse<GradeResponseDto>>(`${ENDPOINTS.grades}/${id}`, apiDto).toPromise();
    return GradeApiMapper.toDomain(response!.data!);
  }

  async delete(id: number): Promise<void> {
    await this.api.delete<ApiResponse<void>>(`${ENDPOINTS.grades}/${id}`).toPromise();
  }
}