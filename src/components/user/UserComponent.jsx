import React from 'react';
import './UserComponent.scss';
import ARROW from '../../static/images/arrow.png';
import { connect } from 'react-redux';
import { updateMessage } from '../../actionCreators';

const UserComponent = ({ validation, updateMessage, disabled }) => {
    let hiddenButton = '';
    if (disabled) { hiddenButton = '' } else { hiddenButton = 'hiddenButton ' }
    return (
        <div className="user row between-xs between-sm between-md between-lg">
            <input className="user__input" placeholder="Introduce tu nombre" name="name" value={validation.name} onChange={e => validation.change(e, validation)} />
            <label className="form__label--error">{validation.nameError}</label>
            <i className={hiddenButton + 'user__arrow'} onClick={() => updateMessage(validation)}><img src={ARROW} alt="arrow" /></i>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        validation: state.validation,
        disabled: state.disabled
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessage(message) {
            dispatch(updateMessage(message))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);

