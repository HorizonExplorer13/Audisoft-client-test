import { InjectionToken } from '@angular/core';
import { StudentRepository } from '../domain/repositories/student.repository';
import { TeacherRepository } from '../domain/repositories/teacher.repository';
import { GradeRepository } from '../domain/repositories/grade.repository';

export const STUDENT_REPOSITORY = new InjectionToken<StudentRepository>('StudentRepository');
export const TEACHER_REPOSITORY = new InjectionToken<TeacherRepository>('TeacherRepository');
export const GRADE_REPOSITORY = new InjectionToken<GradeRepository>('GradeRepository');