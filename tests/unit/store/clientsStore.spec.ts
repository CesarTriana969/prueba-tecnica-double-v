import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useClientsStore } from '@/store/clientsStore.js';

global.fetch = vi.fn();

describe('clientsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('inicializa con estado vacío', () => {
    const store = useClientsStore();
    expect(store.clients).toBeNull();
    expect(store.totalClients).toBe(0);
  });

  it('obtiene clientes correctamente', async () => {
    const mockClients = [
      { id: 1, name: 'User 1', email: 'user1@test.com' },
      { id: 2, name: 'User 2', email: 'user2@test.com' }
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockClients
    });

    const store = useClientsStore();
    await store.getAllClients();

    expect(store.clients).toEqual(mockClients);
    expect(store.totalClients).toBe(2);
  });

  it('busca clientes por término', () => {
    const store = useClientsStore();
    store._clients = [
      { id: 1, name: 'John Doe', email: 'john@test.com', username: 'johnd', company: { name: 'Acme' } },
      { id: 2, name: 'Jane Smith', email: 'jane@test.com', username: 'janes', company: { name: 'Tech Co' } }
    ];

    const results = store.searchClients('john');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('John Doe');
  });

  it('filtra clientes por email', () => {
    const store = useClientsStore();
    store._clients = [
      { id: 1, name: 'John Doe', email: 'john@test.com', username: 'johnd', company: { name: 'Acme' } },
      { id: 2, name: 'Jane Smith', email: 'jane@test.com', username: 'janes', company: { name: 'Tech Co' } }
    ];

    const results = store.searchClients('jane@test');
    expect(results.length).toBe(1);
    expect(results[0].email).toBe('jane@test.com');
  });

  it('busca clientes por nombre de compañía', () => {
    const store = useClientsStore();
    store._clients = [
      { id: 1, name: 'John', email: 'john@test.com', username: 'johnd', company: { name: 'Acme Corp' } },
      { id: 2, name: 'Jane', email: 'jane@test.com', username: 'janes', company: { name: 'Tech Solutions' } }
    ];

    const results = store.searchClients('acme');
    expect(results.length).toBe(1);
    expect(results[0].company.name).toBe('Acme Corp');
  });

  it('retorna todos los clientes cuando no hay término de búsqueda', () => {
    const store = useClientsStore();
    const mockClients = [
      { id: 1, name: 'John', email: 'john@test.com', username: 'johnd', company: { name: 'Acme' } },
      { id: 2, name: 'Jane', email: 'jane@test.com', username: 'janes', company: { name: 'Tech' } }
    ];
    store._clients = mockClients;

    const results = store.searchClients('');
    expect(results).toEqual(mockClients);
  });
});