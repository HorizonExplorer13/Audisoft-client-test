import { Injectable, signal, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class ErrorModalService {
  private notification = inject(NotificationService);
  readonly isOpen = signal(false);
  readonly message = signal('');
  readonly title = signal('No se puede eliminar');

  showConstraintError(message: string, title = 'No se puede eliminar'): void {
    this.message.set(message);
    this.title.set(title);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}