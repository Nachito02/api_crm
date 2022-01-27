import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";

import * as Yup from "yup";

const Formulario = ({cliente, cargando}) => {

      

    const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    
      empresa: Yup.string()
                .required("El nombre de la empresa es obligatorio "),
    
    email: Yup  .string()
                .email('El email no es valido')
                .required("El email es obligatorio"),


    telefono: Yup.number()
                .integer('numero no valido')
                .positive('numero no valido')
    .typeError('El numero no es valido'),
    notas: "",
  });

  const handleSubmit = async (valores) => {
    let respuesta
      try {
       
          if(cliente.id) {
            //editando un registro
            
            const url = `http://localhost:4000/clientes/${cliente.id}`;

               respuesta = await fetch(url, {
                   method: 'PUT',
                   body: JSON.stringify(valores),
                   headers: {
                     'Content-Type': 'application/json'
                   }
               })

          } else {

              //agregando nuevo registro

            const url = 'http://localhost:4000/clientes';

               respuesta = await fetch(url, {
                   method: 'POST',
                   body: JSON.stringify(valores),
                   headers: {
                     'Content-Type': 'application/json'
                   }
       
       
               })
       
               
          }
      } catch (error) {
          console.log(error)
      }

         await respuesta.json()
       
      navigate('/clientes');
  };




  return (

        cargando ? <Spinner /> : (

    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
       {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}

        enableReinitialize={true}

        validationSchema={nuevoClienteSchema}
        onSubmit={ async (values, {resetForm}) => {
         await handleSubmit(values);

          resetForm();
        }}
      >
        {({ errors, touched }) => {
          // console.log(data);

          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="nombre"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa
                </label>
                <Field
                  name="empresa"
                  type="text"
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                />

                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del cliente"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono
                </label>
                <Field
                  name="telefono"
                  type="tel"
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del cliente"
                />
                 {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Telefono
                </label>
                <Field
                  name="notas"
                  as="textarea"
                  type="text"
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente"
                />
                  
              </div>

              <input
                type="submit"
                value= {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div> )
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario;
