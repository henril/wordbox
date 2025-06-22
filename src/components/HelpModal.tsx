import { useState } from "react"
import { Button, Label, Modal, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react"

const HelpModal = () => {
    const [open, setOpen] = useState(true)

    if (!open)
        return <></>

    return (
        <Modal
            closeIcon
            size='tiny'
            open={open}
            onClose={() => setOpen(false)}
        >
            <ModalHeader>How to play</ModalHeader>
            <ModalContent>
                Your goal is to guess the secret word.
                <div>
                    <Label color='green'>green</Label> means the letter is in the correct position.
                </div>
                <div>
                    <Label color='orange'>orange</Label> means the letter appears in another position.
                </div>
                <div>
                    <Label color='grey'>grey</Label> means the letter does not appear in another position.
                </div>
            </ModalContent>
            <ModalActions>
                <Button positive onClick={() => setOpen(false)}>
                    Ok
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default HelpModal
