import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grade } from '../../../../domain/models/grade.model';
import { Student } from '../../../../domain/models/student.model';
import { Teacher } from '../../../../domain/models/teacher.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, ButtonComponent],
  templateUrl: './grade-form.component.html',
  styleUrl: './grade-form.component.scss',
})
export class GradeFormComponent implements OnInit, OnChanges {
  @Input() grade: Grade | null = null;
  @Input() students: Student[] = [];
  @Input() teachers: Teacher[] = [];
  @Output() save = new EventEmitter<Grade>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grade'] && this.form) {
      this.patchForm();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      value: [0, [Validators.required, Validators.min(0), Validators.max(999.99)]],
      studentId: [0, [Validators.required, Validators.min(1)]],
      teacherId: [0, [Validators.required, Validators.min(1)]],
    });
  }

  private patchForm(): void {
    if (this.grade) {
      this.form.patchValue({
        name: this.grade.name,
        value: this.grade.value,
        studentId: this.grade.studentId,
        teacherId: this.grade.teacherId,
      });
    } else {
      this.form.reset({
        name: '',
        value: 0,
        studentId: 0,
        teacherId: 0,
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

  get value() {
    return this.form.get('value');
  }

  get studentId() {
    return this.form.get('studentId');
  }

  get teacherId() {
    return this.form.get('teacherId');
  }

  get nameInvalid(): boolean {
    return !!(this.name?.invalid && (this.name?.dirty || this.name?.touched));
  }

  get valueInvalid(): boolean {
    return !!(this.value?.invalid && (this.value?.dirty || this.value?.touched));
  }

  get studentIdInvalid(): boolean {
    return !!(this.studentId?.invalid && (this.studentId?.dirty || this.studentId?.touched));
  }

  get teacherIdInvalid(): boolean {
    return !!(this.teacherId?.invalid && (this.teacherId?.dirty || this.teacherId?.touched));
  }

  get modalTitleText(): string {
    return this.grade ? 'Editar Nota' : 'Nueva Nota';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.save.emit({
        id: this.grade?.id || 0,
        name: formValue.name.trim(),
        value: formValue.value,
        teacherId: formValue.teacherId,
        studentId: formValue.studentId,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}