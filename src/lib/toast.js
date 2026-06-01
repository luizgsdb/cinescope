import Swal from 'sweetalert2'

// Toast reutilizável no canto superior, com o tema escuro do app.
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2200,
  timerProgressBar: true,
  customClass: { popup: 'swal-cinescope' },
})

export function notifyAdded(title) {
  Toast.fire({
    icon: 'success',
    iconColor: '#33a1ff',
    title: `"${title}" adicionado aos favoritos`,
  })
}

export function notifyRemoved(title) {
  Toast.fire({
    icon: 'info',
    iconColor: '#94a3b8',
    title: `"${title}" removido dos favoritos`,
  })
}

export default Toast
