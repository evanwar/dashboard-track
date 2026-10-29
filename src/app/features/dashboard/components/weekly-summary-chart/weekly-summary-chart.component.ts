import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-summary-chart.component.html',
  styleUrl: './weekly-summary-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklySummaryChartComponent {
  readonly week = signal('Esta semana');
  readonly bars = computed(() =>
    (this.week() === 'Esta semana' ? [52, 76, 59, 73, 35, 69, 80] : [46, 63, 52, 65, 42, 58, 72]).map(
      (value, index) => ({
        value,
        label: ['L', 'M', 'X', 'J', 'V', 'S', 'D'][index],
        name: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][index],
        x: 48 + index * 33,
      }),
    ),
  );
}
