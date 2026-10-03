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
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      valor: [0, [Validators.required, Validators.min(0), Validators.max(999.99)]],
      idEstudiante: [0, [Validators.required, Validators.min(1)]],
      idProfesor: [0, [Validators.required, Validators.min(1)]],
    });
  }

  private patchForm(): void {
    if (this.grade) {
      this.form.patchValue({
        nombre: this.grade.nombre,
        valor: this.grade.valor,
        idEstudiante: this.grade.idEstudiante,
        idProfesor: this.grade.idProfesor,
      });
    } else {
      this.form.reset({
        nombre: '',
        valor: 0,
        idEstudiante: 0,
        idProfesor: 0,
      });
    }
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get valor() {
    return this.form.get('valor');
  }

  get idEstudiante() {
    return this.form.get('idEstudiante');
  }

  get idProfesor() {
    return this.form.get('idProfesor');
  }

  get nombreInvalid(): boolean {
    return !!(this.nombre?.invalid && (this.nombre?.dirty || this.nombre?.touched));
  }

  get valorInvalid(): boolean {
    return !!(this.valor?.invalid && (this.valor?.dirty || this.valor?.touched));
  }

  get idEstudianteInvalid(): boolean {
    return !!(this.idEstudiante?.invalid && (this.idEstudiante?.dirty || this.idEstudiante?.touched));
  }

  get idProfesorInvalid(): boolean {
    return !!(this.idProfesor?.invalid && (this.idProfesor?.dirty || this.idProfesor?.touched));
  }

  get modalTitleText(): string {
    return this.grade ? 'Editar Nota' : 'Nueva Nota';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.save.emit({
        id: this.grade?.id || 0,
        nombre: formValue.nombre.trim(),
        valor: formValue.valor,
        idProfesor: formValue.idProfesor,
        idEstudiante: formValue.idEstudiante,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}