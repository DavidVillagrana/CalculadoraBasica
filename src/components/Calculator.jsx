import "./calculator.css";
import Btn from "./Btn.jsx";
import { useState, useEffect } from "react";
import Switch from "./Switch.jsx";
import { evaluate } from "mathjs";

const Calculator = () => {
  // Estado inicial con useState
  const [data, setData] = useState({ operacion: "", resultado: "" });

  // Funcion de escritura se activa al momento de dar clic a un boton
  const escritura = (event) => {
    const valor = event.target.innerText;
    console.log("info de Valor: ", valor);

    //Verifica si el boton presionado es una operacion matematica
    const esOperacion =
      valor === "+" ||
      valor === "-" ||
      valor === "*" ||
      valor === "/" ||
      valor === "%";

    if (data.operacion.length >= 10) return; //Limitador de 10 caracteres en la operacion
    if (valor === "+/-" && data.operacion === "") return; //No permite poner signo negativo con esta tecla "+/-" si no hay un numero escrito
    if (valor === "%" && data.operacion.includes("%")) return; //Evita usar % más de una vez

    //Si la operacion tiene un error, se reemplaza con el nievo valor
    if (data.operacion.includes("Error")) {
      setData({ ...data, operacion: valor });

      //Si ya hay un resultado y se comienza con una nueva operacion, se reutiliza ese resultado
    } else if (data.resultado != "" && data.operacion === "" && esOperacion) {
      setData({ ...data, operacion: `${data.resultado}` + valor });

      //Funcion del boton "+/-"
      //Si el número es negativo, lo hace positivo
    } else if (valor === "+/-" && data.operacion != "") {
      if (data.operacion.slice(0, 1) === "-") {
        setData({
          ...data,
          operacion: `${data.operacion.slice(1, data.operacion.length)}`,
        });

        //Si es positivo, lo convierte en negativo
      } else {
        setData({ ...data, operacion: `-${data.operacion}` });
      }
    } //Fin de Funcion del boton "+/-"

    //Por defecto, concatena el valor al final de la operacion
    else {
      setData({
        ...data,
        operacion: `${data.operacion}` + event.target.innerText,
      });
    }
  }; //Fin de funcion escritura

  //Funcion eliminar
  //Elimina el ultimo caracter de la operacion
  const eliminar = () => {
    setData({
      ...data,
      operacion: data.operacion.slice(0, data.operacion.length - 1),
    });
  }; //Fin de funcion eliminar

  //Funcion limpiar
  //Borra completamente tanto la operacion como el resultado
  const limpiar = () => {
    setData({ operacion: "", resultado: "" });
  }; //Fin de funcion limpiar

  //Funcion resultado
  const resultado = () => {
  try {
    let resultado = "";

    // Si hay un "%", lo interpreta como porcentaje
    if (data.operacion.includes("%")) {
      const valores = data.operacion.split("%");
      resultado = evaluate(`${valores[1]}*(${valores[0]}/100)`);
    } else {
      resultado = evaluate(data.operacion); // Evaluación normal
    }

    // Formateo inteligente:
    if (typeof resultado === "number") {
      // Si es entero (ej: 6), lo dejamos como está
      if (Number.isInteger(resultado)) {
        resultado = resultado.toString(); // "6"
      } else {
        // Si es decimal, limitamos a 10 cifras significativas
        resultado = Number(resultado).toPrecision(10);
      }
    }

    setData({
      ...data,
      resultado,
      operacion: "",
    });
  } catch (error) {
    setData({ ...data, operacion: "Error" });
  }
};


  return (
    <main>
      <Switch />
      <span className="resultado">{data.resultado}</span>
      <span className="display">{data.operacion}</span>
      <Btn texto="C" clase="gris" handleClick={limpiar} />
      <Btn texto="+/-" clase="gris" handleClick={escritura} />
      <Btn texto="%" clase="gris" handleClick={escritura} />
      <Btn texto="/" clase="operacion" handleClick={escritura} />
      <Btn texto="7" clase="numero" handleClick={escritura} />
      <Btn texto="8" clase="numero" handleClick={escritura} />
      <Btn texto="9" clase="numero" handleClick={escritura} />
      <Btn texto="*" clase="operacion" handleClick={escritura} />
      <Btn texto="4" clase="numero" handleClick={escritura} />
      <Btn texto="5" clase="numero" handleClick={escritura} />
      <Btn texto="6" clase="numero" handleClick={escritura} />
      <Btn texto="-" clase="operacion" handleClick={escritura} />
      <Btn texto="1" clase="numero" handleClick={escritura} />
      <Btn texto="2" clase="numero" handleClick={escritura} />
      <Btn texto="3" clase="numero" handleClick={escritura} />
      <Btn texto="+" clase="operacion" handleClick={escritura} />
      <Btn texto="." clase="numero" handleClick={escritura} />
      <Btn texto="0" clase="numero" handleClick={escritura} />
      <Btn texto="⌫" clase="numero" handleClick={eliminar} />
      <Btn texto="=" clase="operacion" handleClick={resultado} />
    </main>
  );
};

export default Calculator;
