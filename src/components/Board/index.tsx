import { type PropsWithChildren, type ReactNode } from 'react'
import LetterRow from './LetterRow'

interface BoardProps {
    numRows: number,
    solution: string,
    input: string,
    activeRow: number
}

const Board = (props: PropsWithChildren<BoardProps>) => {
    const createLetterRows = () =>
        [...Array(props.numRows).keys()].map<ReactNode>(n =>
            <LetterRow
                active={props.activeRow === n}
                key={n}
                input={props.activeRow === n ? props.input : ''}
                solution={props.solution}
                index={n}
            ></LetterRow>
        )

    return (
        <div className='board'>
            { props.children }
            { createLetterRows() }
        </div>
    )
}

export default Board
