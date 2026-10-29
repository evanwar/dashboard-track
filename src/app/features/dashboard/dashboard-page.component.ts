import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { StatCardComponent } from '../../shared/stat-card.component';
import { IconComponent } from '../../shared/icon.component';
import { StatusBadgeComponent } from '../../shared/status-badge.component';
import { ActivityChartComponent } from './activity-chart.component';
import { WeeklySummaryChartComponent } from './weekly-summary-chart.component';
import { ActionModalComponent, ModalSelection } from '../../shared/action-modal.component';
import { UiService } from '../../shared/ui.service';
import { dashboardMetrics, recentActivity, quickLinks } from '../../mocks/dashboard';
import { moduleDefinitions } from '../../mocks/modules';
import { ModuleDefinition } from '../../shared/models';
@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterLink,
    PageHeaderComponent,
    StatCardComponent,
    IconComponent,
    StatusBadgeComponent,
    ActivityChartComponent,
    WeeklySummaryChartComponent,
    ActionModalComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  readonly metrics = dashboardMetrics;
  readonly activity = recentActivity;
  readonly quickLinks = quickLinks;
  readonly period = signal('Mes');
  readonly ui = inject(UiService);
  readonly selection = signal<ModalSelection | null>(null);
  readonly detailDefinition = signal<ModuleDefinition>(moduleDefinitions['devices']);
  showDetail(id: string): void {
    for (const definition of Object.values(moduleDefinitions)) {
      const row = definition.rows.find((item) => item.id === id);
      if (row) {
        this.detailDefinition.set(definition);
        this.selection.set({ row, action: { label: 'Ver detalle', kind: 'detail', icon: 'eye' } });
        return;
      }
    }
  }
}
