"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}) {
  // Cerrar al pulsar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading && onClose) {
          onClose();
        }
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h3 id="modal-title" className={styles.title}>{title}</h3>
            {description && (
              <div className={styles.description}>
                {typeof description === "string" ? <p style={{ margin: 0 }}>{description}</p> : description}
              </div>
            )}
          </div>
          {!loading && onClose && (
            <button
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Cerrar ventana"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className={styles.actions}>
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={styles.btnCancel}
            >
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={styles.btnConfirm}
            >
              {loading && <span className={styles.spinner} />}
              <span>{confirmText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
