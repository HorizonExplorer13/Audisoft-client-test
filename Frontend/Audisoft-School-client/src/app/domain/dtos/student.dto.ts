export interface CreateStudentDto {
  name: string;
}

export interface UpdateStudentDto {
  id: number;
  name: string;
}

export interface StudentResponseDto {
  id: number;
  name: string;
}