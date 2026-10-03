import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiResponseInterceptor } from '../interceptors/api-response.interceptor';
import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';
import { LoadingInterceptor } from '../interceptors/loading.interceptor';
import { StudentRepositoryImpl } from '../../infrastructure/repositories/student.repository.impl';
import { TeacherRepositoryImpl } from '../../infrastructure/repositories/teacher.repository.impl';
import { GradeRepositoryImpl } from '../../infrastructure/repositories/grade.repository.impl';
import { STUDENT_REPOSITORY, TEACHER_REPOSITORY, GRADE_REPOSITORY } from '../tokens';

export const coreProviders = [
  provideHttpClient(withInterceptorsFromDi()),
  provideAnimations(),
  provideToastr({
    timeOut: 3000,
    positionClass: 'toast-top-right',
    progressBar: true,
    closeButton: true,
    toastClass: 'ngx-toastr custom-toast',
  }),
  { provide: HTTP_INTERCEPTORS, useClass: ApiResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: STUDENT_REPOSITORY, useClass: StudentRepositoryImpl },
  { provide: TEACHER_REPOSITORY, useClass: TeacherRepositoryImpl },
  { provide: GRADE_REPOSITORY, useClass: GradeRepositoryImpl },
];