
import { h } from 'small-cup'
import { Toast } from 'bootstrap'

const toast = (props = {}) => {

    const {
        title,
        subtitle,
        content,
    } = props

    const el = h('div', {
        className: 'toast',
        attributes: {
            'role': 'alert',
            'aria-live': 'assertive',
            'aria-atomic': 'true',
        },
    }, [
        h('div', { className: 'toast-header' }, [
            title && h('strong', { className: 'me-auto' }, title),
            subtitle && h('small', {}, subtitle),
            h('button', {
                className: 'btn-close',
                attributes: {
                    'data-bs-dismiss': 'toast',
                    'aria-label': 'close',
                },
            })
        ]),
        h('div', { className: 'toast-body' }, content),
    ])

    return new Toast(el)
}

const delay = (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))

const toastContainer = () => {

    const id = 'toast-container'

    let container = document.querySelector(`#${id}`)

    if (!container) {
        container = h('div', {
            className: 'toast-container position-fixed top-0 end-0 p-3',
            id: 'toast-container',
        }, [])

        document.body.appendChild(container)
    }

    const info = async (props) => {

        const instance = toast(props)
        const el = instance._element
        container.appendChild(el)
        instance.show()

        await delay(props.duration || 4500)
        instance.dispose()
        container.removeChild(el)
    }

    return { info }
}

export const Notification = toastContainer()
