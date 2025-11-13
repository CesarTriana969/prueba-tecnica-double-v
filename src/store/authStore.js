import { defineStore } from "pinia";
import { signOut } from 'firebase/auth';
import { handleError } from '@/helpers/handleErrors';

import { auth } from '@/config/firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        _user: null,
        
    }),
    actions:{
        getUserauthenticated(){
            this._user = auth.currentUser
        },

        setUser(user){
            this._user = user
        },


        async register({email, password}){
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            this._user = userCredential.user
            
            Swal.fire('Excelente', 'Nuevo usuario creado y autenticado.', 'success')
                .then(() => window.location.reload() )
        },
        
        async login({email, password}){
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            this._user = userCredential.user

            Swal.fire('Hola!', 'Has iniciado sesión de forma exitosa', 'success')
            .then(() => this.router.push({name: 'home'}))
        },


        async logout(){
            try{
                await signOut(auth)
                window.location.href = '/login'
            } catch (error){
                console.error(error)
                handleError(error.code)
            }
        }

    },
    getters:{
        user: function(){
            if(!this._user) this.getUserauthenticated()
            return this._user
        }
    }
})