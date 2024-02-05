export const Modal = ({ isOpen, children, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Cerrar</button>
                {children}
            </div>
        </div>
    );
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    display: 'grid',
    placeItems: 'center',
};

const MODAL_STYLES = {
    padding: '50px',
    backgroundColor: '#fff',
    borderRadius: '5px',
};