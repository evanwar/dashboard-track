import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ActivityChartComponent } from '../components/activity-chart/activity-chart.component';
import { WeeklySummaryChartComponent } from '../components/weekly-summary-chart/weekly-summary-chart.component';
import {
  ActionModalComponent,
  ModalSelection,
} from '../../../shared/components/action-modal/action-modal.component';
import { UiService } from '../../../core/services/ui.service';
import { dashboardMetrics, recentActivity, quickLinks } from '../../../mocks/dashboard';
import { moduleDefinitions } from '../../../mocks/modules';
import { ModuleDefinition } from '../../../shared/models/app.models';
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
