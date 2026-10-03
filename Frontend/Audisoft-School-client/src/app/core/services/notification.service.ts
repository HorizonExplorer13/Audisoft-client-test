import { Injectable, inject } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastr = inject(ToastrService);

  private defaultOptions: Partial<IndividualConfig> = {
    timeOut: 3000,
    positionClass: 'toast-top-right',
    progressBar: true,
    closeButton: true,
  };

  success(message: string, title = 'Éxito', options?: Partial<IndividualConfig>): void {
    this.toastr.success(message, title, { ...this.defaultOptions, ...options });
  }

  error(message: string, title = 'Error', options?: Partial<IndividualConfig>): void {
    this.toastr.error(message, title, { ...this.defaultOptions, ...options, timeOut: 5000 });
  }

  warning(message: string, title = 'Advertencia', options?: Partial<IndividualConfig>): void {
    this.toastr.warning(message, title, { ...this.defaultOptions, ...options });
  }

  info(message: string, title = 'Información', options?: Partial<IndividualConfig>): void {
    this.toastr.info(message, title, { ...this.defaultOptions, ...options });
  }
}