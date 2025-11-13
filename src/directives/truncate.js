export default {
    beforeMount(el, binding, vnode) {
        const limit = binding.arg
        const msg = binding.value

        if(msg && msg.length <= msg ) {
            el.innerHTML = msg
        }else if(msg){
            el.innerHTML = msg.slice(0, limit) + '...'
        }
    },
}