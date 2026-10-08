export interface CreateTeacherDto {
  name: string;
}

export interface UpdateTeacherDto {
  id: number;
  name: string;
}

export interface TeacherResponseDto {
  id: number;
  name: string;
}