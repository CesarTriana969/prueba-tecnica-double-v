<template>
    <div class="px-3">
        <div class="mb-4">
            <h2 class="fz-biger fw-bold mb-2">Inicio</h2>
        </div>

        <div class="dashboard-grid">
            <BaseCard
                title="Clientes"
                label="Total de clientes registrados"
                :count="clientsStore.totalClients"
                :icon="true"
                iconClass="fa-solid fa-users"
                iconColor="#6366f1"
                iconSize="24px"
            />
        </div>

        <div class="mt-5">
            <h4 class="fw-bold mb-3">Acciones Rápidas</h4>
            <div class="row g-3">
                <div class="col-md-6 col-lg-3">
                    <router-link 
                        :to="{name: 'clients.new'}" 
                        class="action-card"
                    >
                        <i class="fa-solid fa-user-plus mb-2"></i>
                        <span>Agregar Cliente</span>
                    </router-link>
                </div>
                <div class="col-md-6 col-lg-3">
                    <router-link 
                        :to="{name: 'clients'}" 
                        class="action-card"
                    >
                        <i class="fa-solid fa-list mb-2"></i>
                        <span>Ver Clientes</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useClientsStore } from '@/store/clientsStore.js';
import BaseCard from '@/components/BaseCard.vue';

const clientsStore = useClientsStore();
const isLoading = ref(false);

onMounted(async () => {
    if (!clientsStore.clients) {
        isLoading.value = true;
        try {
            await clientsStore.getAllClients();
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        } finally {
            isLoading.value = false;
        }
    }
});
</script>

<style scoped>
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.action-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    text-decoration: none;
    color: #374151;
    font-weight: 600;
    transition: all 0.3s ease;
    min-height: 140px;
}

.action-card:hover {
    border-color: #6366f1;
    background: #f5f3ff;
    color: #6366f1;
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.action-card i {
    font-size: 2rem;
}

/* Responsive */
@media (max-width: 1200px) {
    .dashboard-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
}

@media (max-width: 768px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
</style>