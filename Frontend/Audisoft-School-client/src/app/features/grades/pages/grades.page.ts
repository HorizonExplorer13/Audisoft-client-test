import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesService } from '../services/grades.service';
import { GradeListComponent } from '../components/grade-list/grade-list.component';
import { GradeDetailComponent } from '../components/grade-detail/grade-detail.component';
import { DeleteConfirmationModalComponent } from '@shared/components/delete-confirmation-modal/delete-confirmation-modal.component';
import { ErrorModalService } from '@core/services/error-modal.service';

@Component({
  selector: 'app-grades-page',
  standalone: true,
  imports: [
    CommonModule,
    GradeListComponent,
    GradeDetailComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './grades.page.html',
  styleUrl: './grades.page.scss',
})
export class GradesPageComponent implements OnInit {
  protected service = inject(GradesService);
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