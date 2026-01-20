"use client"
import ReactDom from 'react-dom'
import styles from './BookModal.module.scss'

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function BookModal({ isOpen, onClose, children }: BookModalProps) {

  if (!isOpen) return null

  const portalRoot = document.getElementById('portal')

  if (!portalRoot) return null

  return ReactDom.createPortal(
    <div className={styles.modalContainer}>
      <div onClick={onClose} className={styles.modalUnderlay} />
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>,
    portalRoot
  )
}