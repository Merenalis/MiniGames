const trigger = (name, detail = {}) => {
    const event = new CustomEvent(name, { detail })
    document.dispatchEvent(event)
}

const on = (name, listener) => {
    document.addEventListener(name, (e) => listener(e))
}

const off = (name, listener) => {
    document.removeEventListener(name, (e) => listener(e))
}

export default {
    on,
    off,
    trigger,
}
