import './Letter.scss'

interface LetterProps {
    input: string,
    solution: string,
    className?: string
}

const Letter = (props: LetterProps) => {
    return (
        <div className={'letter ' + props.className}>
            {props.input}
        </div>
    )
}

export default Letter
