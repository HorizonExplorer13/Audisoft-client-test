import { Injectable, inject, signal, computed, Inject } from '@angular/core';
import { StudentRepository } from '../../../domain/repositories/student.repository';
import { Student } from '../../../domain/models/student.model';
import { CreateStudentDto, UpdateStudentDto } from '../../../domain/dtos/student.dto';
import { NotificationService } from '../../../core/services/notification.service';
import { ErrorModalService } from '../../../core/services/error-modal.service';
import { STUDENT_REPOSITORY } from '../../../core/tokens';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private repo = inject(STUDENT_REPOSITORY);
  private notify = inject(NotificationService);
  private errorModal = inject(ErrorModalService);

  readonly students = signal<Student[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedStudent = signal<Student | null>(null);
  readonly showForm = signal(false);
  readonly editingStudent = signal<Student | null>(null);

  readonly totalCount = computed(() => this.students().length);

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.repo.getAll();
      this.students.set(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar estudiantes';
      this.error.set(message);
      this.notify.error(message);
    } finally {
      this.loading.set(false);
    }
  }

  async create(dto: CreateStudentDto): Promise<void> {
    this.loading.set(true);
    try {
      const newStudent = await this.repo.create(dto);
      this.students.update(list => [...list, newStudent]);
      this.notify.success('Estudiante creado correctamente');
      this.closeForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear estudiante';
      this.notify.error(message);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: number, dto: UpdateStudentDto): Promise<void> {
    this.loading.set(true);
    try {
      const updated = await this.repo.update(id, dto);
      this.students.update(list => list.map(s => s.id === id ? updated : s));
      this.notify.success('Estudiante actualizado correctamente');
      this.closeForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar estudiante';
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
      this.students.update(list => list.filter(s => s.id !== id));
      this.notify.success('Estudiante eliminado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar estudiante';
      if (err instanceof Error && 'errors' in err && Array.isArray((err as any).errors)) {
        const apiError = err as any;
        if (apiError.errors.some((e: string) => e.includes('asociado') || e.includes('nota'))) {
          this.errorModal.showConstraintError(
            'No se puede eliminar el estudiante porque tiene notas registradas.',
            'No se puede eliminar'
          );
          return;
        }
      }
      this.notify.error(message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreateForm(): void {
    this.editingStudent.set(null);
    this.showForm.set(true);
  }

  openEditForm(student: Student): void {
    this.editingStudent.set(student);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingStudent.set(null);
  }

  selectStudent(student: Student): void {
    this.selectedStudent.set(student);
  }
}