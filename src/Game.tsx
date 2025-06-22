import { Grid, GridColumn } from 'semantic-ui-react'
import './App.css'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import Key from './components/Keyboard/Key.tsx'
import './components/Keyboard/Keyboard.scss'
import KeyboardRow from './components/Keyboard/KeyboardRow.tsx'
import Popover from './components/Popover.tsx'

export type Result = 'win' | 'lose' | undefined

interface GameProps {
    validWords: string[],
    solution: string,
    numRows: number,
    onFinished: (result: Result) => void
}

const Game = (props: PropsWithChildren<GameProps>) => {
    const [input, setInput] = useState<string>('')
    const [activeRow, setActiveRow] = useState<number>(0)
    const [badLetters, setBadLetters] = useState<string>('')
    const [showPopover, setShowPopover] = useState(false)

    const isInputFull = input.length === props.solution.length

    const submitInput = useCallback(() => {
        if (input.length !== props.solution.length)
            return

        if (!props.validWords.includes(input)) {
            console.log('popover')
            setShowPopover(true)
            return
        }
        
        if (input === props.solution) {
            props.onFinished('win')
            setActiveRow(props.numRows + 1)
        }
        else if (activeRow === props.numRows - 1) {
            props.onFinished('lose')
            setActiveRow(props.numRows + 1)
        }
        else {
            [...input].forEach((letter: string) => {
                if (!props.solution.includes(letter)) {
                    setBadLetters(current => current + letter)
                }
            })

            setInput('')
            setActiveRow(activeRow + 1)
        }
    }, [activeRow, input, props])

    const handleKeypress = useCallback((key: string) => {
        if (key === 'Backspace') {
            setInput(current => current.slice(0, current.length - 1))
        }
        else if (key === 'Enter') {
            if (isInputFull)
                submitInput()
        }
        else if (!isInputFull)
            setInput(current => current + key)
    }, [isInputFull, submitInput])

    const keyboard = useMemo(() => {
        const makeKeys = (keys: string) =>
            [...keys].map((key, index) =>
                <Key
                    key={index}
                    value={key}
                    className={badLetters.includes(key) ? 'dimmed' : ''}
                />
            )
            
        return (
            <Keyboard onKeypress={handleKeypress} layout='en' badLetters={badLetters}>
                <KeyboardRow>
                    { makeKeys('qwertyuiop') }
                </KeyboardRow>

                <KeyboardRow>
                    <div className="keyboard-spacer"></div>
                    { makeKeys('asdfghjkl') }
                </KeyboardRow>

                <KeyboardRow>
                    <Key value='Enter' className="enter">⏎</Key>
                    { makeKeys('zxcvbnm') }
                    <Key value='Backspace' className="backspace">⌫</Key>
                </KeyboardRow>
                
            </Keyboard>
        )
    }, [badLetters, handleKeypress])


    return (
        <>
            <Grid centered>
                <GridColumn computer={4} mobile={13}>
                    <Board
                        activeRow={activeRow}
                        input={input}
                        numRows={props.numRows}
                        solution={props.solution}
                    >
                        { showPopover &&
                            <Popover duration={1000} onTimeout={() => setShowPopover(false)}>
                                Unknown word: {input}
                            </Popover>
                        }
                    </Board>
                </GridColumn>
                { keyboard }
            </Grid>
        </>
    )

}

export default Game
