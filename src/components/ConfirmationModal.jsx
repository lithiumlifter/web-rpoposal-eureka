import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  theme = "danger",
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal utama */}
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={`modal-header bg-${theme} text-white`}>
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} />
            </div>
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {cancelText}
              </button>
              <button type="button" className={`btn btn-${theme}`} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop dipisah dari modal */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
    </>
  );
};

export default ConfirmationModal;
