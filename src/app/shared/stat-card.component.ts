import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from './icon.component';
import { Metric } from './models';
@Component({
  selector: 'app-stat-card',
  imports: [IconComponent],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly metric = input.required<Metric>();
}
