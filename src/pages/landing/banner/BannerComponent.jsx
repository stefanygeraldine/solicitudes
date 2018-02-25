import React from 'react';
import './BannerComponent.scss';
import LOGO from '../../../static/images/Inicio/CombinedShape.png';
import UserComponent from '../../../components/user/UserComponent';
import TarjetaChipComponent from '../../../components/tarjetachip/TarjetaChipComponent';
import SolicitudLandingComponent from '../../../components/solicitud/SolicitudLandingComponent';

const BannerComponent = () => {
    return (
        <div className="banner">
            <div className="row between-md">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <h1>Bienvenido.</h1>
                    <UserComponent />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 end-md">
                    <img src={LOGO} alt="visa" />
                </div>
            </div>
            <div  className="row between-md">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <TarjetaChipComponent />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <SolicitudLandingComponent />
                    </div>
                </div>
        </div>
    );
}

export default BannerComponent;
