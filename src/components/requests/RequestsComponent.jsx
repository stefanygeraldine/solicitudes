import React from 'react';
import './RequestsComponent.scss';
import VISA from '../../static/images/lista_ppal/visa.png';
import ADD from '../../static/images/lista_ppal/add.png';
import ConfirmComponent from '../confirm/ConfirmComponent';
import ModalComponent from '../modal/ModalComponent';
import SolicitudAdminComponent from '../solicitud/SolicitudAdminComponent';
//
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { approveRequest, showConfirm, cancelRequest, temporalReject, showModal, keyPress } from '../../actionCreators';
//
const RequestsComponent = ({ requests, approveRequest, confirm, showConfirm, cancelRequest, temporalReject, modal, showModal, keyPress }) => {
    let approveClass = '';
    let rejectClass = '';
    let classAccept = 'inactive ';
    return (
        <div className="row center-md request">
            {modal && <ModalComponent closed={showModal}><SolicitudAdminComponent/></ModalComponent>}
            <div className="request__header">
                <div className="row between-xs between-md between-lg">
                    <div className="col-md-4 request__header--left">
                        <img src={VISA} alt="visa" />
                        <label>SOLICITUDES</label>
                    </div>
                    <div className="col-md-4 request__header--right">
                        <button className="flex-center" onClick={e => showModal(true)}>
                            <img src={ADD} alt="visa" />
                            <label>Crear Solicitud</label>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-8">
                <div className="box">
                    <ul className="row request__list">
                        {requests.map((item, index) => {
                            if (item.approve) { classAccept = 'inactive' } else { classAccept = 'active' }
                            if (item.approveClass) { approveClass = 'accept--request ' } else { approveClass = '' }
                            if (item.rejectClass) { rejectClass = 'reject--request ' } else { rejectClass = '' }

                            return (
                                <li key={index} className={rejectClass + approveClass + " request__list--item"}  >
                                    <div className="row around-xs">
                                        <div className="col-xs-1 col-sm-1 col-md-2 flex-center">
                                            <button className="reject--inactive" onClick={e => { temporalReject(index); showConfirm(true) }}>reject</button>
                                        </div>
                                        <div className="col-xs-10 col-sm-10 col-md-8">
                                            <div className="row around-xs between-md between-lg">
                                                <div className="col-xs-8 col-sm-6 col-md-6 flex">
                                                    <label className="title-bold">{item.razonSocial}</label>
                                                    <label className="title-cuit">CUIT: <span>{item.numeroCuit}</span></label>
                                                </div>
                                                <div className="col-xs-8 col-sm-3 col-md-3 flex">
                                                    <label className="title-regular">Nº de establecimiento</label>
                                                    <label className="title-bold">{item.numeroEstablecimiento}</label>
                                                    <label className="date">{item.date}</label>
                                                </div>
                                                <div className="col-xs-8 col-sm-3 col-md-3 flex-center start-xs">
                                                    <input type="number" className="terminal" placeholder="Nº de Terminal" name="terminal" value={item.terminal} onChange={e => item.change(e, item, index)} onKeyPress={(event) =>{ keyPress(item, index, event) } } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-1 col-sm-1 col-md-2 flex-center">
                                            <button disabled={item.approve} className={'accept--' + classAccept} onClick={e => approveRequest(item, index, null)}></button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    {confirm && <ConfirmComponent cancel={showConfirm} reject={cancelRequest} />}

                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        requests: state.requests,
        confirm: state.confirm,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({ approveRequest, showConfirm, cancelRequest, temporalReject, showModal, keyPress }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsComponent);