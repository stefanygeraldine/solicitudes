import React from 'react';
import './ModalComponent.scss';

const ModalComponent = (props) => {
    return (
        <div className="modal">
            <i  onClick={() => props.closed(false)}>closed</i>
            {props.children}
        </div>
    );
}

export default ModalComponent;

