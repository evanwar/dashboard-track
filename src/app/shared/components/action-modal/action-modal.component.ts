import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Action, DisplayRow, ModuleDefinition } from '../../models';
import { IconComponent } from '../icon/icon.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { JsonViewerComponent } from '../json-viewer/json-viewer.component';
import { UiService } from '../../ui.service';
import { encryptedMock, readableMock } from '../../../mocks/api-logs';
export interface ModalSelection {
  row: DisplayRow;
  action: Action;
}
@Component({
  selector: 'app-action-modal',
  imports: [IconComponent, StatusBadgeComponent, JsonViewerComponent],
  templateUrl: './action-modal.component.html',
  styleUrl: './action-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionModalComponent {
  readonly selection = input<ModalSelection | null>(null);
  readonly definition = input.required<ModuleDefinition>();
  readonly closed = output<void>();
  readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  readonly ui = inject(UiService);
  readonly tab = signal('Resumen');
  readonly readable = signal(true);
  readonly amount = signal('');
  readonly concept = signal('');
  readonly error = signal('');
  readonly control = signal('Consultar conexión');
  readonly reviewDecision = signal<'autorizar' | 'rechazar' | null>(null);
  readonly kind = computed(() => this.selection()?.action.kind);
  readonly title = computed(() => {
    const kind = this.kind();
    if (kind === 'detail') return `Información de ${this.selection()?.row.id ?? ''}`;
    if (kind === 'control') return 'Control de dispositivo';
    if (kind === 'unlock') return 'Simular desbloqueo';
    if (kind === 'balance') return 'Agregar saldo de prueba';
    if (kind === 'delete') return 'Simular eliminación de cuenta';
    if (kind === 'review') return this.reviewDecision() ? 'Confirmar revisión simulada' : 'Revisar solicitud';
    if (kind === 'request') return 'Detalle de la petición';
    return 'Contenido desencriptado de ejemplo';
  });
  readonly json = computed(() => {
    const cells = this.selection()?.row.cells;
    if (this.kind() === 'decrypted') return this.readable() ? readableMock : encryptedMock;
    if (this.tab() === 'Headers')
      return JSON.stringify(
        {
          'content-type': 'application/json',
          'x-demo-mode': 'true',
          'x-correlation-id': cells?.['correlation'] ?? 'demo-0101',
        },
        null,
        2,
      );
    if (this.tab() === 'Request')
      return JSON.stringify(
        {
          method: cells?.['method'],
          path: cells?.['path'],
          body: { cuenta: 'CTA-DEMO-1058', telefono: '*** *** 0201', entorno: 'demostracion' },
        },
        null,
        2,
      );
    return JSON.stringify(
      {
        status: cells?.['code'],
        data: { ejemplo: true, identificador: 'DEMO-001' },
        mensaje: 'Respuesta preparada, sin petición real',
      },
      null,
      2,
    );
  });
  constructor() {
    afterRenderEffect(() => {
      const selected = this.selection();
      const dialog = this.dialog()?.nativeElement;
      if (!dialog) return;
      if (selected && !dialog.open) {
        this.tab.set('Resumen');
        this.amount.set('');
        this.concept.set('');
        this.error.set('');
        this.readable.set(true);
        this.reviewDecision.set(null);
        this.control.set('Consultar conexión');
        dialog.showModal();
      } else if (!selected && dialog.open) dialog.close();
    });
  }
  confirm(): void {
    if (
      this.kind() === 'balance' &&
      (!this.amount().trim() ||
        !Number.isFinite(Number(this.amount())) ||
        Number(this.amount()) <= 0 ||
        !this.concept().trim())
    ) {
      this.error.set('Escribe una cantidad de prueba mayor a cero y un concepto.');
      this.dialog()?.nativeElement.querySelector<HTMLInputElement>('#demo-amount')?.focus();
      return;
    }
    this.closed.emit();
    this.ui.notify();
  }
}
