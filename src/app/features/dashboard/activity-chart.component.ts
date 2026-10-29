import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
interface ChartPoint {
  x: number;
  y: number;
  label: string;
  value: number;
}
const labels: Record<string, readonly string[]> = {
  Día: ['00 h', '02 h', '04 h', '06 h', '08 h', '10 h', '12 h', '14 h', '16 h', '18 h', '20 h', '22 h'],
  Semana: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  Mes: [
    '01 oct',
    '03 oct',
    '06 oct',
    '09 oct',
    '12 oct',
    '15 oct',
    '18 oct',
    '21 oct',
    '23 oct',
    '25 oct',
    '27 oct',
    '29 oct',
  ],
};
const series: Record<string, readonly number[]> = {
  Día: [22, 17, 12, 18, 38, 52, 44, 58, 49, 72, 61, 83],
  Semana: [34, 46, 39, 64, 53, 72, 83],
  Mes: [28, 23, 34, 29, 45, 36, 65, 52, 61, 37, 43, 54],
};
@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityChartComponent {
  readonly period = input('Mes');
  readonly hovered = signal<number | null>(null);
  readonly ticks = [100, 80, 60, 40, 20, 0];
  readonly points = computed<ChartPoint[]>(() =>
    (series[this.period()] ?? series['Mes']).map((value, index, values) => ({
      x: 47 + (index * 687) / (values.length - 1),
      y: 270 - value * 2.3,
      value,
      label: (labels[this.period()] ?? labels['Mes'])[index],
    })),
  );
  readonly second = computed(() =>
    this.points().map((point, index) => ({
      ...point,
      y: 270 - (point.value * 0.54 + (index % 3) * 3) * 2.3,
    })),
  );
  readonly line = computed(() => this.path(this.points()));
  readonly secondLine = computed(() => this.path(this.second()));
  readonly area = computed(() => `${this.line()} L734,270 L47,270 Z`);
  readonly secondArea = computed(() => `${this.secondLine()} L734,270 L47,270 Z`);
  readonly accessibleSummary = computed(
    () =>
      `Actividad de solicitudes, vista ${this.period().toLowerCase()}. ${this.points()
        .map(
          (point) =>
            `${point.label}: ${point.value * 100} correctas, ${Math.round(point.value * 0.054) * 100} fallidas`,
        )
        .join('; ')}. Datos de demostración.`,
  );
  path(points: readonly ChartPoint[]): string {
    return points.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join(' ');
  }
}
