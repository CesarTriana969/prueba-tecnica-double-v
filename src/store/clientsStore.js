import { defineStore } from "pinia";
import Swal from "sweetalert2";

const API_URL = 'https://jsonplaceholder.typicode.com';

export const useClientsStore = defineStore('clients', {
    state: () => ({
        _clients: null,
        _isLoading: false,
    }),
    
    actions: {
        async getAllClients() {
            try {
                this._isLoading = true;
                const response = await fetch(`${API_URL}/users`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }
                
                const data = await response.json();
                this._clients = data;
                
                return data;
            } catch (error) {
                console.error('Error en getAllClients:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los clientes',
                    icon: 'error'
                });
                throw error;
            } finally {
                this._isLoading = false;
            }
        },

        async findClient(id) {

            if (this._clients) {
                const client = this._clients.find(c => c.id == id);
                if (client) return { ...client };
            }

            try {
                const response = await fetch(`${API_URL}/users/${id}`);
                
                if (!response.ok) {
                    throw new Error('Cliente no encontrado');
                }
                
                const client = await response.json();
                return client;
            } catch (error) {
                console.error('Error en findClient:', error);
                return null;
            }
        },

        async store(clientData) {
            try {
                const response = await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    body: JSON.stringify(clientData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                const newClient = await response.json();
                
                if (this._clients) {
                    this._clients.push(newClient);
                }

                Swal.fire({
                    title: 'Cliente creado',
                    text: 'El cliente se creó correctamente',
                    icon: 'success'
                });

                return newClient;
            } catch (error) {
                console.error('Error en store:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo crear el cliente',
                    icon: 'error'
                });
                throw error;
            }
        },

        async update(clientData) {
            try {
                const response = await fetch(`${API_URL}/users/${clientData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(clientData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                const updatedClient = await response.json();

                if (this._clients) {
                    const index = this._clients.findIndex(c => c.id == clientData.id);
                    if (index !== -1) {
                        this._clients[index] = updatedClient;
                    }
                }

                Swal.fire({
                    title: 'Cliente actualizado',
                    text: 'El cliente se actualizó correctamente',
                    icon: 'success'
                });

                return updatedClient;
            } catch (error) {
                console.error('Error en update:', error);
                throw error;
            }
        },

        async confirmDelete(id, redirect = false) {
            Swal.fire({
                title: '¡Confirmación necesaria!',
                html: '¿Estás seguro de eliminar este cliente?',
                showDenyButton: true,
                confirmButtonText: "Eliminar cliente",
                denyButtonText: "Cancelar",
                icon: "question",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                customClass: {
                    confirmButton: "btn btn-danger",
                    denyButton: "btn btn-outline-secondary ms-3"
                },
                preConfirm: async () => {
                    await this.delete(id);
                }
            }).then(() => {
                if (redirect && this.router) {
                    this.router.push({ name: 'clients' });
                }
            });
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_URL}/users/${id}`, {
                    method: 'DELETE',
                });

                if (this._clients) {
                    this._clients = this._clients.filter(c => c.id !== id);
                }

                Swal.fire({
                    title: 'Cliente eliminado',
                    text: 'El cliente se eliminó correctamente',
                    icon: 'success'
                });

                return true;
            } catch (error) {
                console.error('Error en delete:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el cliente',
                    icon: 'error'
                });
                throw error;
            }
        }
    },

    getters: {
        clients() {
            return this._clients;
        },
        
        totalClients() {
            return this._clients ? this._clients.length : 0;
        },

        isLoading() {
            return this._isLoading;
        },

        searchClients: (state) => (searchTerm) => {
            if (!state._clients || !searchTerm) return state._clients;

            const term = searchTerm.toLowerCase();
            return state._clients.filter(client => 
                client.name.toLowerCase().includes(term) ||
                client.email.toLowerCase().includes(term) ||
                client.username.toLowerCase().includes(term) ||
                client.company.name.toLowerCase().includes(term)
            );
        }
    }
});