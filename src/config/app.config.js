import * as bootstrap from 'bootstrap'
import * as Popper from '/node_modules/@popperjs/core'

import 'simplebar';
import 'simplebar/dist/simplebar.css';

import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

import Swal from 'sweetalert2'
import iziToast from "izitoast";

try{
    window.bootstrap = bootstrap
	window.Popper = Popper
    window.notify = iziToast
	window.Swal = Swal.mixin({
        showCloseButton: true,
        customClass: {
            confirmButton: 'btn btn-primary me-2',
            cancelButton: 'btn btn-outline-danger me-2',
            denyButton: 'btn btn-outline-secondary'
        },
        buttonsStyling: false
    })

    window.addEventListener('DOMContentLoaded', () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    })

} catch(error) {
    console.error(error)
}
