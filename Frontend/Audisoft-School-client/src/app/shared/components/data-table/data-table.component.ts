import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => string;
  align?: 'start' | 'center' | 'end';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T>[] = [];
  @Input() pageSize = 10;
  @Input() showActions = true;
  @Input() actionHeader = 'Acciones';
  @Input() loading = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();

  readonly currentPage = signal(1);
  readonly sortColumn = signal<keyof T | string | null>(null);
  readonly sortDirection = signal<'asc' | 'desc'>('asc');
  readonly globalFilter = signal('');

  readonly filteredData = computed(() => {
    let result = this.data;
    const filter = this.globalFilter().toLowerCase().trim();

    if (filter) {
      result = result.filter(row =>
        Object.values(row as Record<string, unknown>).some(val =>
          String(val).toLowerCase().includes(filter)
        )
      );
    }

    const sortCol = this.sortColumn();
    const direction = this.sortDirection();
    if (sortCol) {
      result = [...result].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortCol as string];
        const bVal = (b as Record<string, unknown>)[sortCol as string];
        if (aVal === bVal) return 0;
        const comparison = String(aVal).localeCompare(String(bVal));
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  });

  readonly paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredData().slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize));

  readonly min = Math.min;

  onSort(column: ColumnDef<T>): void {
    if (!column.sortable) return;
    const key = column.key;
    if (this.sortColumn() === key) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(key);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter.set(value);
    this.currentPage.set(1);
  }

  onEdit(row: T): void {
    this.edit.emit(row);
  }

  onDelete(row: T): void {
    this.delete.emit(row);
  }

  onView(row: T): void {
    this.view.emit(row);
  }

  getSortIcon(column: ColumnDef<T>): string {
    if (this.sortColumn() !== column.key) return 'bi bi-arrow-down-up';
    return this.sortDirection() === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
  }

  getCellValue(row: T, column: ColumnDef<T>): string {
    const value = (row as Record<string, unknown>)[column.key as string];
    if (column.render) {
      return column.render(value, row);
    }
    return String(value ?? '');
  }
}