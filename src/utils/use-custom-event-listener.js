import { useRef, useEffect } from 'react'

/* utils general */
import customEvent from './custom-event'

const _useCustomEventListener = (eventName, handler) => {
    const savedHandler = useRef()

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(
        () => {
            const listener = (event) => savedHandler.current(event)

            customEvent.on(eventName, listener)
            return () => {
                customEvent.off(eventName, listener)
            }
        },
        [eventName],
    )
}

export default _useCustomEventListener
