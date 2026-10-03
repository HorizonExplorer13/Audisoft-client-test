import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grade } from '../../../../domain/models/grade.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-grade-detail',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  templateUrl: './grade-detail.component.html',
  styleUrl: './grade-detail.component.scss',
})
export class GradeDetailComponent {
  @Input() grade: Grade | null = null;
}