import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, input } from '@angular/core';
import {
  createElement,
  LayoutDashboard,
  MonitorSmartphone,
  UsersRound,
  Wallet,
  Trash2,
  ShieldCheck,
  ScrollText,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Plus,
  Search,
  SlidersHorizontal,
  X,
  Menu,
  Bell,
  Moon,
  Sun,
  Activity,
  CircleHelp,
  Settings2,
  LogOut,
  Copy,
  Check,
  Eye,
  LockKeyhole,
  Cpu,
  Clock3,
  Download,
  CalendarDays,
  PanelLeftClose,
  PanelLeftOpen,
  CircleAlert,
  Radio,
  Ellipsis,
  RefreshCw,
  Network,
  Terminal,
  Layers3,
  CircleCheck,
  type IconNode,
} from 'lucide';

const icons: Record<string, IconNode> = {
  dashboard: LayoutDashboard,
  devices: MonitorSmartphone,
  users: UsersRound,
  wallet: Wallet,
  trash: Trash2,
  shield: ShieldCheck,
  logs: ScrollText,
  down: ChevronDown,
  right: ChevronRight,
  upRight: ArrowUpRight,
  downRight: ArrowDownRight,
  arrow: ArrowRight,
  plus: Plus,
  search: Search,
  filters: SlidersHorizontal,
  close: X,
  menu: Menu,
  bell: Bell,
  moon: Moon,
  sun: Sun,
  activity: Activity,
  help: CircleHelp,
  settings: Settings2,
  logout: LogOut,
  copy: Copy,
  check: Check,
  eye: Eye,
  lock: LockKeyhole,
  cpu: Cpu,
  clock: Clock3,
  download: Download,
  calendar: CalendarDays,
  collapse: PanelLeftClose,
  expand: PanelLeftOpen,
  alert: CircleAlert,
  radio: Radio,
  more: Ellipsis,
  refresh: RefreshCw,
  network: Network,
  terminal: Terminal,
  layers: Layers3,
  success: CircleCheck,
};

@Component({
  selector: 'app-icon',
  template: '',
  host: { 'aria-hidden': 'true', class: 'inline-flex shrink-0 items-center justify-center' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input('dashboard');
  readonly size = input(20);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    effect(() => {
      const icon = createElement(icons[this.name()] ?? LayoutDashboard);
      icon.setAttribute('width', String(this.size()));
      icon.setAttribute('height', String(this.size()));
      icon.setAttribute('stroke-width', '1.7');
      this.element.nativeElement.replaceChildren(icon);
    });
  }
}
