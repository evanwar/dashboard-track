import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { navigation } from '../../config/navigation.config';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {
  readonly collapsed = input(false);
  readonly navigate = output<void>();
  readonly help = output<void>();
  readonly navigation = navigation;
  readonly expanded = signal<Record<string, boolean>>({ PRINCIPAL: true, CUENTAS: true, AUDITORÍA: true });
  toggleGroup(label: string): void {
    this.expanded.update((groups) => ({ ...groups, [label]: !groups[label] }));
  }
}
