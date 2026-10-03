import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersService } from '../services/teachers.service';
import { TeacherListComponent } from '../components/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from '../components/teacher-detail/teacher-detail.component';
import { DeleteConfirmationModalComponent } from '@shared/components/delete-confirmation-modal/delete-confirmation-modal.component';
import { ErrorModalService } from '@core/services/error-modal.service';

@Component({
  selector: 'app-teachers-page',
  standalone: true,
  imports: [
    CommonModule,
    TeacherListComponent,
    TeacherDetailComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './teachers.page.html',
  styleUrl: './teachers.page.scss',
})
export class TeachersPageComponent implements OnInit {
  protected service = inject(TeachersService);
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