import Home from '@v/Index.vue'; 

import ClientsIndex from '@v/clients/Index.vue';
import ClientsNew from '@v/clients/Form.vue';
import ClientsUpdate from '@v/clients/Form.vue';


export default [
    { path: '', name:'home', component: Home, meta: { group: 'home', label: "Inicio"}},

    { path: '/clients', name: 'clients', component: ClientsIndex, meta:{ group: 'clients', label: "Clientes" } },
    { path: '/clientes/new', name: 'clients.new', component: ClientsNew, meta:{ group: 'clients', label: "Crear Cliente" } },
    { path: '/clientes/:id/edit', name: 'clients.update', component: ClientsUpdate, meta:{ group: 'clients', label: "Actualizar Cliente" } },
] 