import { CustomButton } from "./CustomButton";
import { CustomModal } from "./CustomModal";

interface ConfirmModalProps{
  title: string;
  message: string | React.ReactNode
  onConfirm: () => void;
  onClose: () => void;
  confirmVariant?: 'danger' | 'primary'
}

export const ConfirmModal = ({ title, message, onConfirm, onClose, confirmVariant = 'primary' }: ConfirmModalProps) => {
  return(
    <CustomModal
      title={ title }
      onClose={onClose}
    >
      <div>{message}</div>
      <div className="flex justify-end gap-2 mt-4">
        <CustomButton variant="secondary" onClick={onClose}>
          Cancelar
        </CustomButton>
        <CustomButton variant={confirmVariant} onClick={onConfirm}>
          Confirmar
        </CustomButton>
      </div>
    </CustomModal>
  )
}