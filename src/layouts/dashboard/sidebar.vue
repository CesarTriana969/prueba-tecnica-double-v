<template>
    <div class="sidebar" id="sidebar">
        <RouterLink :to="{name: 'home'}" class="sidebar__link sidebar--logo">
            <img src="@/assets/img/logo.png" alt="logo Double" loading="lazy" width="150">
        </RouterLink>
        <div class="sidebar__wrapper"  data-simplebar>
            <div>
                <div class="sidebar__item">
                    <RouterLink :to="{name: 'home'}" class="sidebar__link" :class="{'active': $router.currentRoute.value.meta.group == 'home'}">
                        <i class="fa-solid fa-chart-line"></i>
                        <span class="sidebar__label">Dashboard</span>    
                    </RouterLink>
                </div>
                <div class="sidebar__item">
                    <RouterLink :to="{name: 'clients'}" class="sidebar__link" :class="{'active': $router.currentRoute.value.meta.group == 'clients'}">
                        <i class="fa-solid fa-users"></i>
                        <span class="sidebar__label">Clientes</span>    
                    </RouterLink>
                </div>
                
                <div class="sidebar__item">
                    <h3 class="sidebar__subtitle">Información</h3>
                    <a href="https://github.com/CesarTriana969/prueba-tecnica-double-v" target="_blank" class="sidebar__link">
                        <i class="fa-brands fa-github"></i>
                        <span class="sidebar__label">Repositorio</span>    
                    </a>
                    <div class="sidebar__dropdown">
                        <a href="#" class="sidebar__link">
                            <i class="fa-solid fa-address-book"></i>
                            <span class="sidebar__label">Contacto</span>    
                            <i class="fa-solid fa-chevron-down"></i>
                        </a>
                        <div class="sidebar__dropdown-collapse">
                            <a href="https://www.linkedin.com/in/-cesar-triana" target="_blank" class="sidebar__link">
                                <i class="fa-brands fa-linkedin-in"></i>
                                <span class="sidebar__label">Linkedin</span>    
                            </a>
                            <a href="https://wa.me/+573137184458" target="_blank" class="sidebar__link">
                                <i class="fa-brands fa-whatsapp"></i>
                                <span class="sidebar__label">WhatsApp</span>    
                            </a>
                            <a href="mailto:cesardev0398@gmail.com" class="sidebar__link">
                                <i class="fa-regular fa-envelope"></i>
                                <span class="sidebar__label">Correo electronico</span>    
                            </a>
                        </div>
                    </div>
                </div>

            </div>   
        </div>
    </div>
</template>
<script setup lang="ts">
    defineOptions({
        name: 'layout-sidebar'
    })

    import { onMounted, ref } from 'vue';

    const dropdowns = ref<NodeListOf<HTMLElement> | null>(null)

        
    onMounted(() => {
        dropdowns.value = document.querySelectorAll('.sidebar__dropdown > .sidebar__link')
        dropdowns.value.forEach((dropdown: HTMLElement) => dropdown.addEventListener('click', toggleDropdown))

        const sidebar: HTMLElement | null = document.querySelector('#sidebar')
        document.addEventListener('click', function(event){
            if(sidebar && !sidebar.contains(event.target)){
                sidebar.classList.remove('show-sidebar')
                toggleDropdown()
            }
        })
        
    })

    function toggleDropdown(event: Event | null= null): void {
        const currentDropdown:HTMLElement | null = document.querySelector('.sidebar__dropdown > .sidebar__link.active')

        if(!event){
            currentDropdown?.classList.remove('active')
            return
        }

        const dropdown = event.target as HTMLElement

        currentDropdown?.classList.remove('active')

        if(dropdown === currentDropdown) dropdown.classList.remove('active')
        else dropdown.classList.add('active')
    }

    
</script>