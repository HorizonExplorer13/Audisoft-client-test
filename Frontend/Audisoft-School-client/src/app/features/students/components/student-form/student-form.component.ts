import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../../domain/models/student.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, ButtonComponent],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnInit, OnChanges {
  @Input() student: Student | null = null;
  @Output() save = new EventEmitter<Student>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  readonly isEditing = false;
  readonly modalTitle = '';

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.form) {
      this.patchForm();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  private patchForm(): void {
    if (this.student) {
      this.form.patchValue({
        nombre: this.student.nombre,
      });
    } else {
      this.form.reset();
    }
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get nombreInvalid(): boolean {
    return !!(this.nombre?.invalid && (this.nombre?.dirty || this.nombre?.touched));
  }

  get modalTitleText(): string {
    return this.student ? 'Editar Estudiante' : 'Nuevo Estudiante';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.save.emit({
        id: this.student?.id || 0,
        nombre: formValue.nombre.trim(),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}