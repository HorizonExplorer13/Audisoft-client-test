import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../../../domain/models/student.model';
import { DataTableComponent, ColumnDef } from '../../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, StudentFormComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent {
  private service = inject(StudentsService);

  readonly students = this.service.students;
  readonly loading = this.service.loading;
  readonly showForm = this.service.showForm;
  readonly editingStudent = this.service.editingStudent;

  readonly columns: ColumnDef<Student>[] = [
    { key: 'name', header: 'Nombre', sortable: true, filterable: true },
  ];

  onCreate(): void {
    this.service.openCreateForm();
  }

  onEdit(student: Student): void {
    this.service.openEditForm(student);
  }

  onDelete(student: Student): void {
    if (confirm(`¿Está seguro de eliminar al estudiante "${student.name}"?`)) {
      this.service.delete(student.id);
    }
  }

  onView(student: Student): void {
    this.service.selectStudent(student);
  }

  onFormClose(): void {
    this.service.closeForm();
  }

  onFormSave(student: Student): void {
    if (this.editingStudent()) {
      this.service.update(student.id, { id: student.id, name: student.name });
    } else {
      this.service.create({ name: student.name });
    }
  }
}