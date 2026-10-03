import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showCreateButton = false;
  @Input() createButtonText = 'Nuevo';
  @Input() createButtonIcon = 'bi-plus';
  @Output() createClick = new EventEmitter<void>();

  onCreate(): void {
    this.createClick.emit();
  }
}