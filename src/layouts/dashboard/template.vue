<template>
    <div class="layout-dashboard">
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        <div class="wrapper py-3 h-100 overflow-auto" data-simplebar>
            <div class="px-3 mb-4" v-if="$router.currentRoute.value.name !== 'home'">
                <ol class="breadcrumb d-lg-none-down p-3 bg-white rounded-3 shadow-sm w-100">
                    <li class="breadcrumb-item" :class="route.name === $router.currentRoute.value.name ? 'active' : 'cursor-pointer'" v-for="route in breadcrum.routes">
                        <a @click="$router.push({name: route.name})" >
                            {{  route.label }}
                        </a>
                    </li>
                </ol>
            </div>
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'LayoutDashboard'
    })

    import Navbar from './navbar.vue'
    import Sidebar from './sidebar.vue'

    import { useBreadcrumStore } from '@/store/breadcrumStore.js';    

    const breadcrum = useBreadcrumStore()
</script>