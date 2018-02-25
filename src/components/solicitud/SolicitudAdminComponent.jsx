import React from 'react';
import './SolicitudAdminComponent.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { generateRequest } from '../../actionCreators';
import {showModal} from '../../actionCreators';

const SolicitudAdminComponent = ({ generateRequest, validationRequest, showModal }) => {
    return (
        <div className="solicitud__admin">
            <h2 className="solicitud__admin--title">Crear Solicitud</h2>
            <div className="row">
                <div className="col-md-12">
                    <div className="solicitud__admin--group">
                        <label className="label">Razon Social</label>
                        <input name="razonSocial" value={validationRequest.razonSocial} onChange={e => validationRequest.changeRequest(e, validationRequest)} />
                        <label className="error">{validationRequest.razonSocialError}</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="solicitud__admin--group">
                        <label className="label">Número de CUIT</label>
                        <input type="number" name="numeroCuit" value={validationRequest.numeroCuit} onChange={e => validationRequest.changeRequest(e, validationRequest)} />
                        <label className="error">{validationRequest.numeroCuitError}</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="solicitud__admin--group">
                        <label className="label">Número de Establecimiento</label>
                        <input type="number" name="numeroEstablecimiento" value={validationRequest.numeroEstablecimiento} onChange={e => validationRequest.changeRequest(e, validationRequest)} />
                        <label className="error">{validationRequest.numeroEstablecimientoError}</label>
                    </div>
                </div>
                <div className="row solicitud__admin--button">
                <div className="col-md-6">
                    <button className='solicitud__admin--cancel' onClick={() => showModal(false)}>Cancelar</button>
                </div>
                <div className="col-md-6">
                    <button className='solicitud__admin--create' onClick={() => generateRequest(validationRequest)}>Crear</button>
                </div>
                </div>
            </div>

        </div>

    );
}


const mapStateToProps = state => {
    return {
        validationRequest: state.validationRequest
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({ generateRequest, showModal }, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SolicitudAdminComponent);


