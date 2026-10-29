import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status',
  template: '<span class="badge" [class]="tone()"><span class="dot"></span>{{ label() }}</span>',
  styleUrl: './status-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly tone = computed(() => {
    const label = this.label().toLowerCase();
    if (['activo', 'autorizada', 'correcta', '200', '201', 'get'].includes(label)) return 'positive';
    if (['pendiente', 'en revisión', 'post'].includes(label)) return 'pending';
    if (['bloqueado', 'restringido', 'rechazada', 'error', '400', '403', '500', 'delete'].includes(label))
      return 'negative';
    if (['put'].includes(label)) return 'information';
    return 'neutral';
  });
}
