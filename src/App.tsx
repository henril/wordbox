import { Button, Container, Label, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import './App.css'
import { useState } from 'react'
import WinModal from './components/WinModal.tsx'
import LoseModal from './components/LoseModal.tsx'
import Game, { type Result } from './Game'
import { words, solutions } from './wordlist-en.ts'

const solution = solutions[Math.floor(Math.random() * solutions.length)]

function App() {
    const [gameResult, setGameResult] = useState<Result>()
    const [showHelp, setShowHelp] = useState(false)

    const resultModal = () => {
        switch (gameResult) {
            case 'win': return <WinModal solution={solution}></WinModal>
            case 'lose': return <LoseModal solution={solution}></LoseModal>
            default: return <></>
        }
    }

    const onFinished = (result: Result) => {
        setGameResult(result)
    }

    const handleClickHelp = () => {
        setShowHelp(true)
    }

    return (
        <>
            <Container>
                Find the secret word! <a href="#" onClick={handleClickHelp}>Instructions</a>
                <br/><br/>
                <Game
                    solution={solution}
                    validWords={words}
                    numRows={6}
                    onFinished={onFinished}
                ></Game>
                { resultModal() }
                { showHelp &&
                    <Modal
                        closeIcon
                        size='tiny'
                        open={showHelp}
                        onClose={() => setShowHelp(false)}
                    >
                        <ModalHeader>How to play</ModalHeader>
                        <ModalContent>
                            Your goal is to guess the secret word.
                            <div>
                                <Label color='green'>green</Label> means the letter is correct.
                            </div>
                            <div>
                                <Label color='orange'>orange</Label> means the letter appears elsewhere.
                            </div>
                            <div>
                                <Label color='grey'>grey</Label> means the letter does not appear elsewhere.
                            </div>
                        </ModalContent>
                        <ModalActions>
                            <Button positive onClick={() => setShowHelp(false)}>
                                Ok
                            </Button>
                        </ModalActions>
                    </Modal>
                
                }
            </Container>
        </>
    )
}

export default App
