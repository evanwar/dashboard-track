import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import {
  ActionModalComponent,
  ModalSelection,
} from '../../../shared/components/action-modal/action-modal.component';
import { moduleDefinitions } from '../../../mocks/modules';
import { Action, DisplayRow } from '../../../shared/models';
import { UiService } from '../../../shared/ui.service';
@Component({
  selector: 'app-module-page',
  imports: [
    PageHeaderComponent,
    StatCardComponent,
    StatusBadgeComponent,
    IconComponent,
    ActionModalComponent,
  ],
  templateUrl: './module-page.component.html',
  styleUrl: './module-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModulePageComponent {
  readonly module = input.required<string>();
  readonly definition = computed(() => moduleDefinitions[this.module()] ?? moduleDefinitions['devices']);
  readonly ui = inject(UiService);
  readonly search = signal('');
  readonly status = signal('Todos');
  readonly secondary = signal('Todos');
  readonly date = signal('');
  readonly page = signal(1);
  readonly selection = signal<ModalSelection | null>(null);
  readonly pageSize = 6;
  readonly filtered = computed(() => {
    const search = this.search().toLocaleLowerCase('es').trim();
    return this.definition().rows.filter((row) => {
      const values = Object.values(row.cells).join(' ').toLocaleLowerCase('es');
      const status = this.status();
      const normalized =
        (
          { Pendientes: 'Pendiente', Autorizadas: 'Autorizada', Rechazadas: 'Rechazada' } as Record<
            string,
            string
          >
        )[status] ?? status;
      return (
        values.includes(search) &&
        (status === 'Todos' || row.cells['status'] === normalized || row.cells['code'] === normalized) &&
        (this.secondary() === 'Todos' ||
          row.cells['type'] === this.secondary() ||
          row.cells['method'] === this.secondary()) &&
        (!this.date() || row.cells['date'] === this.date())
      );
    });
  });
  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  readonly visibleRows = computed(() =>
    this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize),
  );
  readonly rangeStart = computed(() => (this.filtered().length ? (this.page() - 1) * this.pageSize + 1 : 0));
  readonly rangeEnd = computed(() => Math.min(this.page() * this.pageSize, this.filtered().length));
  setSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }
  setStatus(value: string): void {
    this.status.set(value);
    this.page.set(1);
  }
  setSecondary(value: string): void {
    this.secondary.set(value);
    this.page.set(1);
  }
  setDate(value: string): void {
    this.date.set(value);
    this.page.set(1);
  }
  clear(): void {
    this.search.set('');
    this.status.set('Todos');
    this.secondary.set('Todos');
    this.date.set('');
    this.page.set(1);
  }
  open(row: DisplayRow, action: Action): void {
    this.selection.set({ row, action });
  }
  disabled(row: DisplayRow, action: Action): boolean {
    return action.kind === 'unlock' && row.cells['status'] !== 'Bloqueado';
  }
}
