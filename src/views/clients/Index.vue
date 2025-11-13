<template>
    <div class="px-3">
        <div class="d-flex align-items-center gap-3 flex-wrap mb-3">
            <h3 class="fz-biger me-auto">Lista de Clientes</h3>
            <div class="btn-group">
                <button 
                    class="btn btn-success" 
                    v-tooltip="'Actualizar información'" 
                    @click="reloadTable"
                    :disabled="isLoading"
                > 
                    <i class="fa-solid fa-rotate" :class="{'fa-spin': isLoading}"></i>
                </button>
                <router-link :to="{name: 'clients.new'}" class="btn btn-secondary">
                    Agregar Cliente
                </router-link>
            </div>
        </div>

        <div class="card card-body border-0">
            <TableClients></TableClients>
        </div>
    </div>
</template>

<script setup lang="ts">
import TableClients from './Table.vue'
import { ref } from 'vue';
import { useClientsStore } from '@/store/clientsStore.js';

const clientsStore = useClientsStore();
const isLoading = ref(<boolean>false);

async function reloadTable() {
    try {
        if (isLoading.value) return;

        isLoading.value = true;
        await clientsStore.getAllClients();
        
        notify.success({message: 'Información actualizada'});
    } catch (error) {
        console.error('Error al recargar:', error);
    } finally {
        isLoading.value = false;
    }
}
</script>