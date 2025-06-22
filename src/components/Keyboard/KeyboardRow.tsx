import type { PropsWithChildren } from "react"

interface KeyboardRowProps {
    className?: string
}

const KeyboardRow = (props: PropsWithChildren<KeyboardRowProps>) => {
    return (
        <div className={`keyboard-row ${props.className || ''}`}>
            { props.children }
        </div>
    )
}

export default KeyboardRow
