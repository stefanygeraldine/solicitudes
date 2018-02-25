import React from 'react';
import './SolicitudLandingComponent.scss';
import { connect } from 'react-redux';
import { generateRequest } from '../../actionCreators';

const SolicitudLandingComponent = ({generateRequest, disabled, validationRequest }) => {
    let classDisabled = '';
    if (disabled) { classDisabled = 'disabled-button ' } else { classDisabled = '' }
    return (
        <div className="solicitud__landing">
            <h2 className="solicitud__landing--title">Crea tu primera solicitud</h2>
            <div className="solicitud__landing--group">
                <label className="label">Razon Social</label>
                <input name="razonSocial" value={validationRequest.razonSocial} onChange={e => validationRequest.changeRequest(e, validationRequest)}/>
                <label className="error">{validationRequest.razonSocialError}</label>
            </div>
            <div className="solicitud__landing--group">
                <label className="label">Número de CUIT</label>
                <input type="number" name="numeroCuit" value={validationRequest.numeroCuit} onChange={e => validationRequest.changeRequest(e, validationRequest)}/>
                <label className="error">{validationRequest.numeroCuitError}</label>
            </div>
            <div className="solicitud__landing--group">
                <label className="label">Número de Establecimiento</label>
                <input type="number" name="numeroEstablecimiento" value={validationRequest.numeroEstablecimiento} onChange={e => validationRequest.changeRequest(e, validationRequest)}/>
                <label className="error">{validationRequest.numeroEstablecimientoError}</label>
            </div>
           
            <button disabled={disabled} className={classDisabled + 'solicitud__landing--button'} onClick={() => generateRequest(validationRequest)}>Crear Solicitud</button>
        </div>

    );
}


const mapStateToProps = state => {
    return {
        validationRequest: state.validationRequest,
        disabled: state.disabled
    };
};

const mapDispatchToProps = dispatch => {
    return {
        generateRequest(message) {
            dispatch(generateRequest(message))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SolicitudLandingComponent);


