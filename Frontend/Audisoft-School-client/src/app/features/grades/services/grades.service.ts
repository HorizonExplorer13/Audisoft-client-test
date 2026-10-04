import { Injectable, inject, signal, computed } from '@angular/core';
import { GradeRepository } from '../../../domain/repositories/grade.repository';
import { Grade } from '../../../domain/models/grade.model';
import { CreateGradeDto, UpdateGradeDto } from '../../../domain/dtos/grade.dto';
import { Student } from '../../../domain/models/student.model';
import { Teacher } from '../../../domain/models/teacher.model';
import { StudentsService } from '../../students/services/students.service';
import { TeachersService } from '../../teachers/services/teachers.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ErrorModalService } from '../../../core/services/error-modal.service';
import { GRADE_REPOSITORY } from '../../../core/tokens';

@Injectable({ providedIn: 'root' })
export class GradesService {
  private repo = inject(GRADE_REPOSITORY);
  private studentsService = inject(StudentsService);
  private teachersService = inject(TeachersService);
  private notify = inject(NotificationService);
  private errorModal = inject(ErrorModalService);

  readonly grades = signal<Grade[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedGrade = signal<Grade | null>(null);
  readonly showForm = signal(false);
  readonly editingGrade = signal<Grade | null>(null);

  readonly students = this.studentsService.students;
  readonly teachers = this.teachersService.teachers;
  readonly studentsLoading = this.studentsService.loading;
  readonly teachersLoading = this.teachersService.loading;

  readonly totalCount = computed(() => this.grades().length);

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [gradesData] = await Promise.all([
        this.repo.getAll(),
        this.studentsService.loadAll(),
        this.teachersService.loadAll(),
      ]);
      this.grades.set(gradesData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar notas';
      this.error.set(message);
      this.notify.error(message);
    } finally {
      this.loading.set(false);
    }
  }

  async create(dto: CreateGradeDto): Promise<void> {
    this.loading.set(true);
    try {
      const newGrade = await this.repo.create(dto);
      this.grades.update((list: Grade[]) => [...list, newGrade]);
      this.notify.success('Nota creada correctamente');
      this.closeForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear nota';
      this.notify.error(message);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: number, dto: UpdateGradeDto): Promise<void> {
    this.loading.set(true);
    try {
      const updated = await this.repo.update(id, dto);
      this.grades.update((list: Grade[]) => list.map((g: Grade) => g.id === id ? updated : g));
      this.notify.success('Nota actualizada correctamente');
      this.closeForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar nota';
      this.notify.error(message);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async delete(id: number): Promise<void> {
    this.loading.set(true);
    try {
      await this.repo.delete(id);
      this.grades.update((list: Grade[]) => list.filter((g: Grade) => g.id !== id));
      this.notify.success('Nota eliminada correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar nota';
      this.notify.error(message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreateForm(): void {
    this.editingGrade.set(null);
    this.showForm.set(true);
  }

  openEditForm(grade: Grade): void {
    this.editingGrade.set(grade);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingGrade.set(null);
  }

  selectGrade(grade: Grade): void {
    this.selectedGrade.set(grade);
  }

  getStudentName(id: number): string {
    return this.students().find((s: Student) => s.id === id)?.name || 'Desconocido';
  }

  getTeacherName(id: number): string {
    return this.teachers().find((t: Teacher) => t.id === id)?.name || 'Desconocido';
  }
}