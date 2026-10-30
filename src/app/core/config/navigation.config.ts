export const navigation = [
  {
    label: 'PRINCIPAL',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
      { label: 'Dispositivos', path: '/dispositivos', icon: 'devices', count: '2,450' },
      { label: 'Desbloqueo de usuarios', path: '/usuarios/desbloqueo', icon: 'users', count: '24' },
    ],
  },
  {
    label: 'CUENTAS',
    items: [
      { label: 'Agregar saldo', path: '/cuentas/saldo', icon: 'wallet' },
      { label: 'Eliminar por teléfono', path: '/cuentas/eliminacion', icon: 'trash' },
      { label: 'Autorizar cuentas', path: '/cuentas/autorizacion', icon: 'shield', count: '18' },
    ],
  },
  { label: 'AUDITORÍA', items: [{ label: 'Logs de APIs', path: '/logs/apis', icon: 'logs' }] },
] as const;
