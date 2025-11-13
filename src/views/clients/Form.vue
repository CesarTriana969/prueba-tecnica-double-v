<template>
    <div class="px-3">
        <div class="card card-body border-0 position-relative">
            <LoaderSection type="scaling-squares-spinner" :settings="{size: 80}" v-if="isLoadingInformation"></LoaderSection>

            <FormKit type="form" id="form-clients" :actions="false" #default="{state: {valid}}" @submit.prevent="store">
                <h3 class="fz-big fw-bold">{{ id ? 'Actualizar' : 'Crear' }} cliente</h3>
                <hr>
                
                <BackendError :backend-errors="errors" v-if="errors"></BackendError>

                <h5 class="mt-4 mb-3">
                    <i class="fa-solid fa-user me-2"></i>
                    Información Personal
                </h5>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Nombre completo" 
                            name="name" 
                            validation="required|length:3,50" 
                            v-model="form.name"
                            help="Nombre completo del cliente"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Usuario" 
                            name="username" 
                            validation="required|length:3,20" 
                            v-model="form.username"
                            help="Nombre de usuario único"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="email" 
                            label="Email" 
                            name="email" 
                            validation="required|email" 
                            v-model="form.email"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Teléfono" 
                            name="phone" 
                            validation="required" 
                            v-model="form.phone"
                            help="Incluir extensión si aplica"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Sitio web" 
                            name="website" 
                            validation="required" 
                            v-model="form.website"
                            help="Ej: example.com"
                        />
                    </div>
                </div>

                <h5 class="mt-4 mb-3">
                    <i class="fa-solid fa-location-dot me-2"></i>
                    Dirección
                </h5>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Calle" 
                            name="street" 
                            validation="required" 
                            v-model="form.address.street"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Suite/Apartamento" 
                            name="suite" 
                            validation="required" 
                            v-model="form.address.suite"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Ciudad" 
                            name="city" 
                            validation="required" 
                            v-model="form.address.city"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Código Postal" 
                            name="zipcode" 
                            validation="required" 
                            v-model="form.address.zipcode"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Latitud" 
                            name="lat" 
                            validation="required" 
                            v-model="form.address.geo.lat"
                            help="Coordenada de latitud"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Longitud" 
                            name="lng" 
                            validation="required" 
                            v-model="form.address.geo.lng"
                            help="Coordenada de longitud"
                        />
                    </div>
                </div>

                <h5 class="mt-4 mb-3">
                    <i class="fa-solid fa-building me-2"></i>
                    Información de la Compañía
                </h5>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <FormKit 
                            type="text" 
                            label="Nombre de la Compañía" 
                            name="companyName" 
                            validation="required" 
                            v-model="form.company.name"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-8 mb-3">
                        <FormKit 
                            type="text" 
                            label="Eslogan" 
                            name="catchPhrase" 
                            validation="required" 
                            v-model="form.company.catchPhrase"
                            help="Frase comercial de la compañía"
                        />
                    </div>
                    <div class="col-12 mb-3">
                        <FormKit 
                            type="textarea" 
                            auto-height 
                            label="Sector/Business" 
                            name="bs"
                            validation="required"
                            v-model="form.company.bs"
                            help="Descripción del sector o negocio"
                        />
                    </div>
                </div>

                <div class="d-flex gap-3 align-items-center flex-wrap justify-content-center mt-4">
                    <router-link :to="{name: 'clients'}" type="button" class="btn btn-outline-secondary">
                        Regresar
                    </router-link>
                    <button 
                        v-if="form.id" 
                        type="button" 
                        class="btn btn-danger" 
                        @click.prevent="clientsStore.confirmDelete(form.id, true)"
                    >
                        Eliminar
                    </button>
                    <button 
                        type="submit" 
                        class="btn btn-success" 
                        @click.prevent="store" 
                        :disabled="!valid || isLoading"
                    >
                        <LoaderSpinner v-if="isLoading" class="me-2"></LoaderSpinner>
                        {{ id ? "Actualizar" : "Crear" }}
                    </button>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { reset } from '@formkit/vue';
import { useClientsStore } from '@/store/clientsStore.js';
import Swal from 'sweetalert2';

defineOptions({
    name: 'ClientForm'
});

const router = useRouter();
const route = useRoute();
const isLoading = ref(<boolean>false);
const isLoadingInformation = ref(<boolean>false);
const errors = ref(null);
const clientsStore = useClientsStore();

const id = ref(route.params.id || null);

const form = ref(<Record<string, any>>{
    id: null,
    name: null,
    username: null,
    email: null,
    phone: null,
    website: null,
    address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
            lat: null,
            lng: null
        }
    },
    company: {
        name: null,
        catchPhrase: null,
        bs: null
    }
});

onBeforeMount(async () => {
    if (id.value) {
        isLoadingInformation.value = true;

        const client = await clientsStore.findClient(id.value);

        if (client) {
            form.value = { ...client };
        } else {
            Swal.fire('Ops', 'No existe este cliente', 'warning');
            router.push({ name: 'clients' });
        }
        
        isLoadingInformation.value = false;
    }
});

async function store(): Promise<void> {
    if (isLoading.value) return;

    try {
        isLoading.value = true;
        errors.value = null;

        if (!id.value) {
            await clientsStore.store(form.value);
            notify.success({ message: 'Cliente creado' });
        } else {
            await clientsStore.update(form.value);
            notify.success({ message: 'Cliente actualizado' });
        }
        
        reset('form-clients');
        router.push({ name: 'clients' });
        
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        errors.value = error;
        Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar el cliente',
            icon: 'error'
        });
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
h5 {
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 0.5rem;
}
</style>