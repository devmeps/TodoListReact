import { Modal } from './Modal';

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={MODAL_HEADER_STYLES}>
                <h2>Confirmar eliminación</h2>
            </div>
            <div style={MODAL_BODY_STYLES}>
                <p>¿Estás seguro de que quieres eliminar este elemento?</p>
            </div>
            <div style={MODAL_FOOTER_STYLES}>
                <button className='btn btn-sm btn-primary' onClick={onClose}>Cancelar</button>
                <button className='btn btn-sm btn-danger' onClick={onConfirm}>Eliminar</button>
            </div>
        </Modal>
    );
};

const MODAL_HEADER_STYLES = {
    padding: '15px 30px',
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const MODAL_BODY_STYLES = {
    padding: '15px 30px',
};

const MODAL_FOOTER_STYLES = {
    padding: '15px 30px',
    backgroundColor: '#f7f7f7',
    borderTop: '1px solid #dee2e6',
    alignItems: 'center'
};


export default DeleteConfirmationModal;