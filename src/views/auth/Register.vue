<template>
    <LayoutAuth>
        <div class="card card-auth rounded-4 min-w-300 min-w-lg-400" >
            <FormKit type="form" id="form-register" :actions="false" #default="{state: {valid}}" @submit.prevent="store" >
                <img src="@/assets/img/logo.png" class="d-block mx-auto mb-4 mb-lg-5" alt="Logo Double" width="200">

                <BackendError :backend-errors="errors" v-if="errors"/>
            
                <div class="mb-3">
                    <FormKit autocomplete="off" type="email" label="Correo electronico" name="email" validation="required|email" v-model="form.email"></FormKit>
                </div>
                <div class="mb-3">
                    <FormKit autocomplete="off" type="password" label="Contraseña" name="password" validation="required|length:6,12" v-model="form.password"></FormKit>
                </div>
                <div class="mb-3">
                    <FormKit autocomplete="off" type="password" label="Contraseña" name="confirm_password" validation="required|confirm:password" v-model="form.confirm_password"></FormKit>
                </div>
                <div class="d-flex gap-3 align-items-center flex-wrap justify-content-around">
                    <router-link :to="{name: 'auth.login'}" class="btn btn-outline-primary">Tengo una cuenta</router-link>
                    <button type="submit" class="btn btn-primary" @click.prevent="store" :disabled="!valid || isLoading">
                        <LoaderSpinner  v-if="isLoading" class="me-2"></LoaderSpinner>
                        {{  isLoading ? 'Registrando': 'Registrarme' }}
                    </button>  
                </div>
            </FormKit>
        </div>
    </LayoutAuth>
</template>

<script setup lang="ts">
    import LayoutAuth from '@layouts/auth/template.vue'
    import Swal from 'sweetalert2';
    import { ref } from 'vue'
    import { useAuthStore } from "@/store/authStore.js"

    defineOptions({
        name: 'AuthRegister'
    })

    const isLoading = ref(<Boolean>false)
    const authStore = useAuthStore()
    const errors = ref(null)

    const form = ref(<Record<string, string|null>>{
        email: null,
        password: null,
        confirm_password: null,
    })

    async function store(): Promise<void>{
        if(isLoading.value || !form.value.email || !form.value.password ) return 

        try {
            isLoading.value = true
            errors.value = null

            await authStore.register({...form.value})

        } catch (error: any) {
            errors.value = error
            form.value.password = null
            form.value.confirm_password = null
        } finally{
            isLoading.value = false
        }
    }

</script>