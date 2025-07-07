import './btn.css';

const Btn = (params) => {
    const {operacion, clase, handleClick, texto} = params

    return <button id={operacion} className={clase} onClick={handleClick}>{texto}</button>
}

export default Btn
