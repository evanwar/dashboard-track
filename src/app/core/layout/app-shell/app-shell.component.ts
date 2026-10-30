import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { UiService } from '../../services/ui.service';
import { navigation } from '../../config/navigation.config';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppSidebarComponent, IconComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly router = inject(Router);
  readonly ui = inject(UiService);
  readonly collapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly mobileDialog = viewChild<ElementRef<HTMLDialogElement>>('mobileDialog');
  readonly url = signal(this.router.url);
  readonly title = computed(
    () =>
      navigation.flatMap((group) => [...group.items]).find((item) => this.url().startsWith(item.path))
        ?.label ?? 'Dashboard',
  );
  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url.set(event.urlAfterRedirects);
        this.mobileOpen.set(false);
        window.scrollTo(0, 0);
      }
    });
    effect(() => {
      const dialog = this.mobileDialog()?.nativeElement;
      if (!dialog) return;
      if (this.mobileOpen() && !dialog.open) dialog.showModal();
      else if (!this.mobileOpen() && dialog.open) dialog.close();
    });
  }
  toggleSidebar(): void {
    if (window.matchMedia('(max-width: 1023px)').matches) this.mobileOpen.update((value) => !value);
    else this.collapsed.update((value) => !value);
  }
}
