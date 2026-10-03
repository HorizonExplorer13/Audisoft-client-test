import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../../../domain/models/teacher.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.scss',
})
export class TeacherDetailComponent {
  @Input() teacher: Teacher | null = null;
}