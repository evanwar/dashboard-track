export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export interface Device {
  id: string;
  name: string;
  type: string;
  platform: string;
  version: string;
  status: string;
  lastAccess: string;
}
export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  status: string;
  reason: string;
  date: string;
}
export interface BalanceAccount {
  id: string;
  name: string;
  phone: string;
  balance: string;
  status: string;
  created: string;
}
export interface AuthorizationRequest {
  id: string;
  name: string;
  date: string;
  type: string;
  status: string;
}
export interface ApiLog {
  id: string;
  timestamp: string;
  date: string;
  method: string;
  path: string;
  code: string;
  duration: string;
  correlation: string;
}
export interface Column {
  key: string;
  label: string;
  kind?: 'badge' | 'mono' | 'person';
}
export interface Action {
  label: string;
  kind: 'detail' | 'control' | 'unlock' | 'balance' | 'delete' | 'review' | 'request' | 'decrypted';
  icon: string;
}
export interface DisplayRow {
  id: string;
  cells: Record<string, string>;
}
export interface Metric {
  label: string;
  value: string;
  note: string;
  icon: string;
  trend?: string;
  tone?: Tone;
}
export interface ModuleDefinition {
  title: string;
  description: string;
  category: string;
  icon: string;
  noun: string;
  columns: readonly Column[];
  rows: readonly DisplayRow[];
  actions: readonly Action[];
  filters: readonly string[];
  metrics: readonly Metric[];
  secondaryFilters?: readonly string[];
  tabs?: readonly string[];
}
