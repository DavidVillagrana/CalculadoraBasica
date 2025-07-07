import { useEffect, useState } from 'react';
import './switch.css'

const Switch = () => {

    const [theme, setTheme] =useState('claro'); //Declaramos nuestro tema 'claro' para poder modificarlo con setTheme

    const handleChange = (e) => setTheme(e.target.checked ? 'oscuro' : 'claro'); //El evento se ejecutara cuando el usuario usa el interruptor (checkbox)

    useEffect(() => {
        document.body.setAttribute('data-theme', theme) //Cada vez que se active se agregara el atributo 'claro' o 'oscuro' al <body>
    }, [theme]) 

  return (
    <section className="switch">
      <label className="toggle">
        <input type="checkbox" className="check-switch" onChange={handleChange} hidden/>
        <span className="slider" />
      </label>
    </section>
  );
}

export default Switch;
