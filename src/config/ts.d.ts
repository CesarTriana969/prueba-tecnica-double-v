declare module '@/directives/tooltip.js' {
  const tooltip: any;
  export default tooltip;
}
declare module '@/directives/truncate.js' {
  const truncate: any;
  export default truncate;
}

declare module '@/config/firebase.config' {
  import { Auth } from 'firebase/auth';
  import { getStorage } from 'firebase/storage'
  import { getFirestore } from 'firebase/firestore'

  const auth: Auth
  const storage: getStorage
  const db: getFirestore
  
  export { auth, storage, db };
}

declare module '@/config/datatable.config' {
  const Datatable: any
  export default Datatable
}

declare module '@/config/formKit.config' {
  const configFormKit: any;
  export default configFormKit;
}


declare module '@/store/authStore.js' {
  export function useAuthStore(): any;
}

declare module '@/store/breadcrumStore.js' {
  export function useBreadcrumStore(): any;
}

declare module '@/store/clientsStore.js' {
  export function useClientsStore(): any;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@formkit/vue' {
  import { plugin } from '@formkit/vue';
  const plugin: plugin;

  export const plugin: Plugin;
  export const defaultConfig: any;
  export const pluginFormKit: Plugin;
}

declare module 'vue-select' {
  const vueSelect: any;
  export default vueSelect;
}
