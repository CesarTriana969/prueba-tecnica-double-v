import { defineStore } from "pinia";

export const useBreadcrumStore = defineStore('breadcrum', {
    state: () => ({
        _breadcrum: null
    }),
    actions:{
        getRoute(nameRoute){
            const routes = this.router.getRoutes()

            return routes.filter(route => {
                if(route.name === nameRoute){
                    return route
                }
            })[0]
        },
        addRoute(route){
            this._breadcrum.push({
                label: route.meta.label,
                name: route.name,
                path: route.path
            })
        },
        updateBreadcrumbsState(){
            this._breadcrum = []

            this.addRoute(this.getRoute('home'))

            const currentRoute = this.router.currentRoute.value
            const paths = currentRoute.name.split('.')


            if(paths[0] === 'error'){
                this.addRoute({name: 'error', path: '/', meta: {label: 'Error 404'}})
            } else if(this._breadcrum[0].name !== paths[0]){
                this.addRoute( this.getRoute(paths[0]) )
            }

            if(paths[1]) this.addRoute( this.getRoute(currentRoute.name) )
        },
    }, 
    getters:{
        routes: function(){
            return this._breadcrum
        }
    }

})