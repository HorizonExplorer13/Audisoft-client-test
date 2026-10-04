import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../../../domain/models/teacher.model';
import { DataTableComponent, ColumnDef } from '../../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, TeacherFormComponent],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss',
})
export class TeacherListComponent {
  private service = inject(TeachersService);

  readonly teachers = this.service.teachers;
  readonly loading = this.service.loading;
  readonly showForm = this.service.showForm;
  readonly editingTeacher = this.service.editingTeacher;

  readonly columns: ColumnDef<Teacher>[] = [
    { key: 'name', header: 'Nombre', sortable: true, filterable: true },
  ];

  onCreate(): void {
    this.service.openCreateForm();
  }

  onEdit(teacher: Teacher): void {
    this.service.openEditForm(teacher);
  }

  onDelete(teacher: Teacher): void {
    if (confirm(`¿Está seguro de eliminar al profesor "${teacher.name}"?`)) {
      this.service.delete(teacher.id);
    }
  }

  onView(teacher: Teacher): void {
    this.service.selectTeacher(teacher);
  }

  onFormClose(): void {
    this.service.closeForm();
  }

  onFormSave(teacher: Teacher): void {
    if (this.editingTeacher()) {
      this.service.update(teacher.id, { name: teacher.name });
    } else {
      this.service.create({ name: teacher.name });
    }
  }
}