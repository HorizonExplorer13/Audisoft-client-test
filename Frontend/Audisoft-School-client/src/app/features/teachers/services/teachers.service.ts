import { Injectable, inject, signal, computed } from '@angular/core';
import { TeacherRepository } from '../../../domain/repositories/teacher.repository';
import { Teacher } from '../../../domain/models/teacher.model';
import { CreateTeacherDto, UpdateTeacherDto } from '../../../domain/dtos/teacher.dto';
import { NotificationService } from '../../../core/services/notification.service';
import { ErrorModalService } from '../../../core/services/error-modal.service';
import { TEACHER_REPOSITORY } from '../../../core/tokens';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private repo = inject(TEACHER_REPOSITORY);
  private notify = inject(NotificationService);
  private errorModal = inject(ErrorModalService);

  readonly teachers = signal<Teacher[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedTeacher = signal<Teacher | null>(null);
  readonly showForm = signal(false);
  readonly editingTeacher = signal<Teacher | null>(null);

  readonly totalCount = computed(() => this.teachers().length);

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.repo.getAll();
      this.teachers.set(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar profesores';
      this.error.set(message);
      this.notify.error(message);
    } finally {
      this.loading.set(false);
    }
  }

  async create(dto: CreateTeacherDto): Promise<void> {
    this.loading.set(true);
    try {
      const newTeacher = await this.repo.create(dto);
      this.teachers.update(list => [...list, newTeacher]);
      this.notify.success('Profesor creado correctamente');
      this.closeForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear profesor';
      this.notify.error(message);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: number, dto: UpdateTeacherDto): Promise<void> {
    this.loading.set(true);
    try {
      const updated = await this.repo.update(id, dto);
      this.teachers.update(list => list.map(t => t.id === id ? updated : t));
      this.notify.success('Profesor actualizado correctamente');
      this.closeForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar profesor';
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
      this.teachers.update(list => list.filter(t => t.id !== id));
      this.notify.success('Profesor eliminado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar profesor';
      if (err instanceof Error && 'errors' in err && Array.isArray((err as any).errors)) {
        const apiError = err as any;
        if (apiError.errors.some((e: string) => e.includes('asociado') || e.includes('nota'))) {
          this.errorModal.showConstraintError(
            'No se puede eliminar el profesor porque tiene notas registradas.',
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
    this.editingTeacher.set(null);
    this.showForm.set(true);
  }

  openEditForm(teacher: Teacher): void {
    this.editingTeacher.set(teacher);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingTeacher.set(null);
  }

  selectTeacher(teacher: Teacher): void {
    this.selectedTeacher.set(teacher);
  }
}