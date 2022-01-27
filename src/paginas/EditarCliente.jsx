import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const { id } = useParams();

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCargando(!cargando);
    }, 1000);
    const obtenerClienteApi = async () => {
      const url = `${import.meta.env.VITE_API_URL}/${id}`;
      try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClienteApi();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-10">Utiliza este formulario para editar un cliente</p>

      {cliente?.nombre ? <Formulario cliente={cliente} cargando={cargando} /> : <p>
        Cliente id no valido</p>}
    </>
  );
};

export default EditarCliente;
