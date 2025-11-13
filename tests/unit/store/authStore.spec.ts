import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/store/authStore.js';


vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null
  })),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn()
}));

vi.mock('@/config/firebase.config', () => ({
  auth: {
    currentUser: null
  }
}));

vi.mock('@/helpers/handleErrors', () => ({
  handleError: vi.fn()
}));

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    
    (window.location as any).href = '';
    (window.location.reload as any).mockClear();
  });

  describe('Estado inicial', () => {
    it('inicializa con usuario null', () => {
      const store = useAuthStore();
      expect(store._user).toBeNull();
    });
  });

  describe('Login', () => {
    it('inicia sesión correctamente con credenciales válidas', async () => {
      const mockUser = {
        uid: '123',
        email: 'cesardev0398@gmail.com',
        emailVerified: true
      };

      const mockUserCredential = {
        user: mockUser
      };

      (signInWithEmailAndPassword as any).mockResolvedValueOnce(mockUserCredential);

      const store = useAuthStore();
      store.router = { push: vi.fn() } as any;

      await store.login({ 
        email: 'cesardev0398@gmail.com', 
        password: 'password123' 
      });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'cesardev0398@gmail.com',
        'password123'
      );
      expect(store._user).toEqual(mockUser);
      expect(Swal.fire).toHaveBeenCalledWith(
        'Hola!',
        'Has iniciado sesión de forma exitosa',
        'success'
      );
    });

    it('maneja errores de login correctamente', async () => {
      const mockError = new Error('Invalid credentials');
      (signInWithEmailAndPassword as any).mockRejectedValueOnce(mockError);

      const store = useAuthStore();

      await expect(
        store.login({ email: 'wrong@example.com', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('Registro', () => {
    it('registra un nuevo usuario correctamente', async () => {
      const mockUser = {
        uid: '456',
        email: 'newuser0398@example.com',
        emailVerified: false
      };

      const mockUserCredential = {
        user: mockUser
      };

      (createUserWithEmailAndPassword as any).mockResolvedValueOnce(mockUserCredential);

      const reloadMock = vi.fn();
      Object.defineProperty(window.location, 'reload', {
        writable: true,
        value: reloadMock
      });

      const store = useAuthStore();

      await store.register({
        email: 'newuser0398@example.com',
        password: 'password123'
      });

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'newuser0398@example.com',
        'password123'
      );
      expect(store._user).toEqual(mockUser);
      expect(Swal.fire).toHaveBeenCalledWith(
        'Excelente',
        'Nuevo usuario creado y autenticado.',
        'success'
      );
    });

    it('maneja errores de registro', async () => {
      const mockError = new Error('Email already in use');
      (createUserWithEmailAndPassword as any).mockRejectedValueOnce(mockError);

      const store = useAuthStore();

      await expect(
        store.register({ email: 'existing@example.com', password: 'pass123' })
      ).rejects.toThrow('Email already in use');
    });
  });

  describe('Logout', () => {
    it('cierra sesión correctamente', async () => {
      (signOut as any).mockResolvedValueOnce(undefined);

      const store = useAuthStore();
      store._user = { uid: '123', email: 'cesardev0398@gmail.com' } as any;

      await store.logout();

      expect(signOut).toHaveBeenCalled();
      expect(window.location.href).toBe('/login');
    });

    it('maneja errores al cerrar sesión', async () => {
      const mockError = { code: 'auth/network-error' };
      (signOut as any).mockRejectedValueOnce(mockError);

      const store = useAuthStore();

      await store.logout();

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe('Getters', () => {
    it('retorna el usuario actual', () => {
      const store = useAuthStore();
      const mockUser = { uid: '123', email: 'cesardev0398@gmail.com' };
      store._user = mockUser as any;

      expect(store.user).toEqual(mockUser);
    });

    it('obtiene usuario autenticado si _user es null', () => {
      const store = useAuthStore();
      store._user = null;

      const user = store.user;

      expect(user).toBeNull();
    });
  });

  describe('setUser', () => {
    it('establece el usuario correctamente', () => {
      const store = useAuthStore();
      const mockUser = { uid: '789', email: 'newuser0398@example.com' };

      store.setUser(mockUser as any);

      expect(store._user).toEqual(mockUser);
    });
  });

  describe('getUserauthenticated', () => {
    it('obtiene el usuario autenticado de Firebase', () => {
      const store = useAuthStore();
      
      store.getUserauthenticated();

      expect(store._user).toBeNull();
    });
  });
});