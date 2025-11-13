export default {
    beforeMount(el, binding, vnode) {
        el.setAttribute('data-bs-toggle', 'tooltip')
        el.setAttribute('data-bs-title', binding.value)
        new bootstrap.Tooltip(el)
    },
}