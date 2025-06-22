import { useState } from 'react'
import { Button, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'

interface WinModalProps {
  solution: string
}

function WinModal(props: WinModalProps) {
    const [open, setOpen] = useState<boolean>(true)

    return (
      <Modal
        closeIcon
        size='mini'
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalHeader>You found the word - {props.solution}! 🏆</ModalHeader>
        <ModalContent>
          <p>You can refresh the page for a new game.</p>
        </ModalContent>
        <ModalActions>
          <Button positive onClick={() => setOpen(false)}>
            Ok
          </Button>
        </ModalActions>
      </Modal>
    )
}

export default WinModal