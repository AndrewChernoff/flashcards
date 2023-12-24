import Modal from '../../modal/modal'
import Profile from '../../profile/profile'

type ProfileDialogProps = {
  openDialog: () => void
  isOpen: boolean
}

const ProfileDialog = ({ openDialog, isOpen }: ProfileDialogProps) => {
  return (
    <Modal isOpen={isOpen} callBack={openDialog}>
      <Profile />
    </Modal>
  )
}

export default ProfileDialog
