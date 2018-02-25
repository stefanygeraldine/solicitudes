import React from 'react';
import './TarjetaChipComponent.scss';
import TARJETA from '../../static/images/tarjeta.png';

const TarjetaChipComponent = () => {
    return (
        <img className="tarjetachip" src={TARJETA} alt="tarjeta"/>
    );
}

export default TarjetaChipComponent;
