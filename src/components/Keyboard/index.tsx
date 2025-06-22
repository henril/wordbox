import { Children, useCallback, useEffect, type PropsWithChildren, type ReactElement } from "react"
import './Keyboard.scss'

interface KeyboardProps {
    layout: 'en',
    onKeypress?: (key: string) => void,
    badLetters: string
}

const Keyboard = ({onKeypress, children}: PropsWithChildren<KeyboardProps>) => {
    const containsKey = useCallback((key: string) => {
        const keys = Children.toArray(children)
                             .map(child =>
                                Children.toArray((child as ReactElement).props.children)
                             ).flat()

        return keys.some(k => (k as ReactElement).props.value === key)
    }, [children])

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) =>
            containsKey(e.key)
            && onKeypress?.(e.key)

        document.addEventListener('keydown', handleKeydown)

        return () => document.removeEventListener('keydown', handleKeydown)
    }, [containsKey, onKeypress])

    const handleClick = (e: React.MouseEvent) => {
        const key = (e.target as HTMLDivElement).getAttribute('data-key')

        if (key !== null)
            onKeypress?.(key)
    }

    return (
        <div className='keyboard' onClick={handleClick}>
            { children }
        </div>
    )
}

export default Keyboard
