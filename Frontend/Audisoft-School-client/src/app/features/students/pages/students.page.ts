import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../services/students.service';
import { StudentListComponent } from '../components/student-list/student-list.component';
import { StudentDetailComponent } from '../components/student-detail/student-detail.component';
import { DeleteConfirmationModalComponent } from '@shared/components/delete-confirmation-modal/delete-confirmation-modal.component';
import { ErrorModalService } from '@core/services/error-modal.service';

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [
    CommonModule,
    StudentListComponent,
    StudentDetailComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './students.page.html',
  styleUrl: './students.page.scss',
})
export class StudentsPageComponent implements OnInit {
  protected service = inject(StudentsService);
  private errorModal = inject(ErrorModalService);

  ngOnInit(): void {
    this.service.loadAll();
  }

  get errorModalOpen(): boolean {
    return this.errorModal.isOpen();
  }

  get errorModalMessage(): string {
    return this.errorModal.message();
  }

  get errorModalTitle(): string {
    return this.errorModal.title();
  }

  onErrorModalClose(): void {
    this.errorModal.close();
  }
}