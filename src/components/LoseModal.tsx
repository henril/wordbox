import { useState } from 'react'
import { Button, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'

interface LoseModalProps {
  solution: string
}

function LoseModal(props: LoseModalProps) {
    const [open, setOpen] = useState<boolean>(true)

    return (
      <Modal
        closeIcon
        size='mini'
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalHeader>Out of attempts - game over!</ModalHeader>
        <ModalContent>
          <p>The secret word was "{props.solution}".</p>
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

export default LoseModal