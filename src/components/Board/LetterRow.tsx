import Letter from './Letter'
import './letterRow.css'
import { useEffect, useMemo, useState } from 'react'

interface LetterRowProps {
    solution: string,
    input: string,
    index: number
    active: boolean
}

type LetterClassName = 'correct' | 'incorrect' | 'misplaced'

const LetterRow = (props: LetterRowProps) => {
    const [guess, setGuess] = useState<string>('')


    useEffect(() => {
        if (props.active) {
            setGuess(props.input)
        }
    }, [props.input, props.active])

    const letters = useMemo(() => {
        const evaluateGuess = (): LetterClassName[] => {
            const guessLetters = [...guess]
            const solutionLetters = [...props.solution]
            const letterCounts: {[k: string]: number} = {}
            
            solutionLetters.forEach(letter =>
                letterCounts[letter] = 1 + (letterCounts[letter] || 0))

            guessLetters.forEach((letter, i) => {
                if (letter == solutionLetters[i])
                    letterCounts[letter] -= 1
            })

            return guessLetters.map((letter, i) => {
                if (letter === solutionLetters[i])
                    return 'correct'
                if (solutionLetters.includes(letter)) {
                    letterCounts[letter] -= 1
                    if (letterCounts[letter] >= 0)
                        return 'misplaced'
                }
                return 'incorrect'
            })
        }

        const result = evaluateGuess()

        return [...props.solution].map((_, i) => {
            let className = ''

            if (props.active) {
                if (i === guess.length) className = 'pulse'
            } else
                className = result[i] || ''

            return (
                <Letter
                    key={i}
                    className={className}
                    input={guess[i]}
                    solution={props.solution[i]}
                ></Letter>
            )
        })
    }, [guess, props.active, props.solution])

    const makeClassName = () =>
        'letter-row '
        + (props.active && props.input.length === props.solution.length && 'pulse')

    return (
        <div className={makeClassName()}>

            { letters }
        </div>
    )
}

export default LetterRow
