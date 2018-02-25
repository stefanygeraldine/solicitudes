import React from 'react';
import './ConfirmComponent.scss';
import { connect } from 'react-redux';
import { approveRequest } from '../../actionCreators';


const ConfirmComponent = (props, { requests, approveRequest }) => {
    return (
        <div className="confirm">
            <div className="row center-md">
            <div className="col-xs-12 col-sm-12 col-md-8">
                    <div className="request__list--item">
                        <div>
                        <div className="row start-xs start-sm start-md col-xs-12 ">
                            <div className="col-xs-2 col-sm-2 col-md-2 flex-center">
                                <button className="reject--active">reject</button>
                            </div>
                            <div className="col-xs-9 col-sm-9 col-md-9 confirm__message">
                                <div>
                                    <p>¿Estás seguro de rechazar la solicitud de este comercio?</p>
                                </div>
                                <div>
                                <button className="confirm__message--cancel" onClick={e => props.cancel(false)}>Cancelar</button>
                                <button className="confirm__message--reject" onClick={e => props.reject()}>Rechazar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        requests: state.requests,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        approveRequest(item, index) {
            dispatch(approveRequest(item, index))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent);