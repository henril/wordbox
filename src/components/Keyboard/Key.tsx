import type { PropsWithChildren } from "react"

interface KeyProps {
    value: string,
    className?: string
}

const Key = (props: PropsWithChildren<KeyProps>) => {
    return (
        <div data-key={props.value} className={`keyboard-key ${props.className}`}>
            {props.children ? props.children : props.value}
        </div>
    )
}

export default Key
