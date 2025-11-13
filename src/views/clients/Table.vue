<template>
    <div style="min-height: 200px;" v-if="isLoading">
        <LoaderSection :settings="{ 'dots-num': 3 }"></LoaderSection>
    </div>

    <div v-else-if="clientsStore.clients && !isLoading">
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Buscar por nombre, email, usuario o compañía..."
                v-model="searchTerm">
        </div>

        <div class="table-responsive">
            <DataTable :columns="columns" :data="filteredClients">
                <template #name="{ rowData }">
                    <div>
                        <strong>{{ rowData.name }}</strong>
                        <br>
                        <small class="text-muted">@{{ rowData.username }}</small>
                    </div>
                </template>

                <template #contact="{ rowData }">
                    <div>
                        <div>
                            <i class="fa-solid fa-envelope me-2"></i>
                            <small>{{ rowData.email }}</small>
                        </div>
                        <div>
                            <i class="fa-solid fa-phone me-2"></i>
                            <small>{{ rowData.phone }}</small>
                        </div>
                    </div>
                </template>

                <template #company="{ rowData }">
                    <div>
                        <strong>{{ rowData.company.name }}</strong>
                        <br>
                        <small class="text-muted">{{ rowData.company.catchPhrase }}</small>
                    </div>
                </template>

                <template #address="{ rowData }">
                    <span>{{ rowData.address.city }}, {{ rowData.address.street }}</span>
                </template>

                <template #action="{ rowData }">
                    <div class="d-flex justify-content-center gap-2">
                        <button class="btn btn-sm border-0" @click="openClientDetails(rowData)"
                            v-tooltip="'Ver detalles'">
                            <i class="fa-solid fa-eye text-info"></i>
                        </button>

                        <button class="btn btn-sm border-0"
                            @click.prevent="$router.push({ name: 'clients.update', params: { id: rowData.id } })"
                            v-tooltip="'Editar'">
                            <i class="fa-solid fa-pen text-primary"></i>
                        </button>

                        <button class="btn btn-sm border-0" type="button"
                            @click.prevent="clientsStore.confirmDelete(rowData.id)" v-tooltip="'Eliminar'">
                            <i class="fa-solid fa-trash text-danger"></i>
                        </button>
                    </div>
                </template>
            </DataTable>
        </div>
    </div>

    <!-- Popup -->
    <BasePopup v-model="showPopup" size="lg">
        <div class="client__info-popup" v-if="selectedClient">
            <div class="popup-header mb-4">
                <h4 class="mb-0 fw-bold">Detalles del Cliente</h4>
            </div>
            <div class="popup-body popUp__system">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <h6 class="">Información Personal</h6>
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <td><strong>Nombre:</strong></td>
                                    <td>{{ selectedClient.name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Usuario:</strong></td>
                                    <td>@{{ selectedClient.username }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td>{{ selectedClient.email }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Teléfono:</strong></td>
                                    <td>{{ selectedClient.phone }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Website:</strong></td>
                                    <td>
                                        <a :href="`https://${selectedClient.website}`" target="_blank">
                                            {{ selectedClient.website }}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-6 mb-3">
                        <h6 class="">Dirección</h6>
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <td><strong>Calle:</strong></td>
                                    <td>{{ selectedClient.address.street }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Suite:</strong></td>
                                    <td>{{ selectedClient.address.suite }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ciudad:</strong></td>
                                    <td>{{ selectedClient.address.city }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Código Postal:</strong></td>
                                    <td>{{ selectedClient.address.zipcode }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Coordenadas:</strong></td>
                                    <td>
                                        {{ selectedClient.address.geo.lat }},
                                        {{ selectedClient.address.geo.lng }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col-12">
                        <h6 class="">Compañía</h6>
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <td><strong>Nombre:</strong></td>
                                    <td>{{ selectedClient.company.name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Eslogan:</strong></td>
                                    <td>{{ selectedClient.company.catchPhrase }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Business:</strong></td>
                                    <td>{{ selectedClient.company.bs }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="d-flex gap-2 justify-content-end pt-3 border-top">
                <button type="button" class="btn btn-secondary" @click="showPopup = false">
                    Cerrar
                </button>
                <router-link :to="{ name: 'clients.update', params: { id: selectedClient.id } }" class="btn btn-primary"
                    @click="showPopup = false">
                    <i class="fa-solid fa-pen me-2"></i>
                    Editar Cliente
                </router-link>
            </div>
        </div>
    </BasePopup>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { useClientsStore } from '@/store/clientsStore.js';
import BasePopup from '@/components/BasePopup.vue';

interface Client {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

const isLoading = ref<boolean>(false);
const clientsStore = useClientsStore();
const searchTerm = ref('');
const selectedClient = ref<Client | null>(null);
const showPopup = ref(false);

onBeforeMount(async () => {
    if (clientsStore.clients == null) {
        isLoading.value = true;
        await clientsStore.getAllClients()
            .then(() => isLoading.value = false)
            .catch(() => isLoading.value = false);
    }
});

const columns = ref([
    { data: null, render: '#name', title: 'Nombre' },
    { data: null, render: '#contact', title: 'Contacto' },
    { data: null, render: '#company', title: 'Compañía' },
    { data: null, render: '#address', title: 'Ciudad' },
    { data: null, title: 'Acciones', render: '#action', orderable: false }
]);

const filteredClients = computed(() => {
    if (!searchTerm.value) {
        return clientsStore.clients;
    }
    return clientsStore.searchClients(searchTerm.value);
});

function openClientDetails(client: Client) {
    selectedClient.value = client;
    showPopup.value = true;
}
</script>

<style scoped>
.popup-header {
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 1rem;
}

.popup-body h6 {
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e9ecef;
}

.table-sm td {
    padding: 0.5rem;
    border-bottom: 1px solid #f0f0f0;
}

.table-sm td:first-child {
    font-weight: 500;
    width: 140px;
}

.table tbody tr td,
.table strong{
    background-color:transparent;
}

.client__info-popup{
height: 100%;
}
</style>