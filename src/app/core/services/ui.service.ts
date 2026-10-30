import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UiService {
  readonly toast = signal('');
  private timer: ReturnType<typeof setTimeout> | undefined;
  notify(message = 'Acción simulada; no se realizó ningún cambio'): void {
    clearTimeout(this.timer);
    this.toast.set(message);
    this.timer = setTimeout(() => this.toast.set(''), 5500);
  }
}
