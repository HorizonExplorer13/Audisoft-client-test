import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss',
})
export class DeleteConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() title = 'No se puede eliminar';
  @Input() message = 'Este registro no se puede eliminar porque tiene elementos asociados.';
  @Input() entityName = '';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}