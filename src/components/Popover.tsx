import { useEffect, type PropsWithChildren } from "react"
import './Popover.scss'

interface PopoverProps {
    /**
     * Milliseconds
     */
    duration: number,
    onTimeout: () => void
}

const Popover = ({duration, onTimeout, children}: PropsWithChildren<PopoverProps>) => {
    useEffect(() => {
        const handleTimeout = () => {
            onTimeout()
        }

        const timeoutId = setTimeout(handleTimeout, duration)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [duration, onTimeout])

    if (!open)
        return <></>

    return (
        <div className='popover' style={{animation: `fade ${duration * 1.1 / 1000}s`}}>
            {children}
        </div>
    )
}

export default Popover
