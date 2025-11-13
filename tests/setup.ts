import { vi } from 'vitest';

declare global {
  var Swal: {
    fire: any;
    close: any;
    isVisible: any;
    isLoading: any;
  };
}

globalThis.Swal = {
  fire: vi.fn(() => Promise.resolve({ 
    isConfirmed: true,
    isDenied: false,
    isDismissed: false 
  })),
  close: vi.fn(),
  isVisible: vi.fn(() => false),
  isLoading: vi.fn(() => false)
};

Object.defineProperty(window, 'location', {
  writable: true,
  value: { 
    href: '',
    reload: vi.fn(),
    assign: vi.fn()
  }
});

global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
};