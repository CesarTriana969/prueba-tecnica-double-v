<template>
    <nav class="navbar">
        <div class="navbar__logo">
            <button type="button" class="btn btn-navbar me-3 d-md-none" @click="toggleSidebar">
                <i class="text-primary fa-solid fa-bars fa-lg"></i>
            </button>

        </div>
        <div class="navbar__menu">
            <div class="vr text-white"></div>
            <div class="dropdown" v-if="authStore.user"> 
                <div class="cursor-pointer" data-bs-toggle="dropdown">
                    <span class="navbar--title-avatar">Cesar Triana</span>
                    <img :src="`https://ui-avatars.com/api/?name=${authStore.user.email}&rounded=true`" alt="Avatar" class="navbar--avatar">
                </div>
                <div class="dropdown-menu dropdown-menu-end max-w-200">
                    <div class="text-truncate px-3" v-tooltip="authStore.user.email">
                        {{ authStore.user.email  }}
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item text-danger" @click.prevent="authStore.logout()"> <i class="fa-solid fa-arrow-right-from-bracket me-2"></i> Cerrar sesión</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'layout-navbar'
    })

    import { useAuthStore } from "@/store/authStore.js"

    const authStore = useAuthStore()
    
    function toggleSidebar(event: Event): void{
        event.stopPropagation()
        const sidebar:HTMLElement | null = document.querySelector('#sidebar')
        sidebar?.classList.toggle('show-sidebar')

        if(sidebar?.classList.contains('show-sidebar')){
            const dropdowns:NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown-menu.show')
            
            dropdowns.forEach( (dropdown:HTMLElement):void => dropdown.classList.remove('show') )
        
        }
    }

</script>