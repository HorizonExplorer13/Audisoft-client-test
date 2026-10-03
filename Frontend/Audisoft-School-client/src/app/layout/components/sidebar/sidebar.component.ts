import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly navItems = [
    { path: '/students', icon: 'bi-people-fill', label: 'Estudiantes' },
    { path: '/teachers', icon: 'bi-person-badge-fill', label: 'Profesores' },
    { path: '/grades', icon: 'bi-journal-bookmark-fill', label: 'Notas' },
  ];

  isCollapsed = false;
}