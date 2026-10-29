import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
  host: { '(document:keydown.escape)': 'panel.set(null)' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  readonly title = input('Dashboard');
  readonly collapsed = input(false);
  readonly toggleSidebar = output<void>();
  readonly notify = output<string>();
  readonly panel = signal<'notifications' | 'user' | null>(null);
  toggle(panel: 'notifications' | 'user'): void {
    this.panel.update((current) => (current === panel ? null : panel));
  }
}
