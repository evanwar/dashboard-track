import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { UiService } from '../../../core/services/ui.service';
@Component({
  selector: 'app-json-viewer',
  imports: [IconComponent],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonViewerComponent {
  readonly content = input.required<string>();
  readonly ui = inject(UiService);
  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.content());
      this.ui.notify('Ejemplo mock copiado al portapapeles');
    } catch {
      this.ui.notify('No se pudo copiar. Puedes seleccionar el ejemplo manualmente.');
    }
  }
}
