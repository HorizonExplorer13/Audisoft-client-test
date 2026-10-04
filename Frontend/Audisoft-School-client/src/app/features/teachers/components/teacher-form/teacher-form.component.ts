import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../../domain/models/teacher.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, ButtonComponent],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent implements OnInit, OnChanges {
  @Input() teacher: Teacher | null = null;
  @Output() save = new EventEmitter<Teacher>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teacher'] && this.form) {
      this.patchForm();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  private patchForm(): void {
    if (this.teacher) {
      this.form.patchValue({
        name: this.teacher.name,
      });
    } else {
      this.form.reset();
    }
  }

  get name() {
    return this.form.get('name');
  }

  get nameInvalid(): boolean {
    return !!(this.name?.invalid && (this.name?.dirty || this.name?.touched));
  }

  get modalTitleText(): string {
    return this.teacher ? 'Editar Profesor' : 'Nuevo Profesor';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.save.emit({
        id: this.teacher?.id || 0,
        name: formValue.name.trim(),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}