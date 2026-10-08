import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesService } from '../../services/grades.service';
import { Grade } from '../../../../domain/models/grade.model';
import { DataTableComponent, ColumnDef } from '../../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { GradeFormComponent } from '../grade-form/grade-form.component';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, GradeFormComponent],
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.scss',
})
export class GradeListComponent {
  protected service = inject(GradesService);

  readonly grades = this.service.grades;
  readonly loading = this.service.loading;
  readonly showForm = this.service.showForm;
  readonly editingGrade = this.service.editingGrade;

  readonly columns: ColumnDef<Grade>[] = [
    { key: 'name', header: 'Asignatura', sortable: true, filterable: true },
    { key: 'value', header: 'Valor', sortable: true, filterable: true, align: 'center', width: '100px' },
    {
      key: 'studentId',
      header: 'Estudiante',
      sortable: true,
      filterable: true,
      render: (value: unknown) => this.service.getStudentName(value as number),
    },
    {
      key: 'teacherId',
      header: 'Profesor',
      sortable: true,
      filterable: true,
      render: (value: unknown) => this.service.getTeacherName(value as number),
    },
  ];

  onCreate(): void {
    this.service.openCreateForm();
  }

  onEdit(grade: Grade): void {
    this.service.openEditForm(grade);
  }

  onDelete(grade: Grade): void {
    if (confirm(`¿Está seguro de eliminar la nota "${grade.name}"?`)) {
      this.service.delete(grade.id);
    }
  }

  onView(grade: Grade): void {
    this.service.selectGrade(grade);
  }

  onFormClose(): void {
    this.service.closeForm();
  }

  onFormSave(grade: Grade): void {
    if (this.editingGrade()) {
      this.service.update(grade.id, {
        id: grade.id,
        name: grade.name,
        value: grade.value,
        teacherId: grade.teacherId,
        studentId: grade.studentId,
      });
    } else {
      this.service.create({
        name: grade.name,
        value: grade.value,
        teacherId: grade.teacherId,
        studentId: grade.studentId,
      });
    }
  }
}