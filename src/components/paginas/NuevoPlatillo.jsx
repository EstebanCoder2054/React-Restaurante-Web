import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useHistory } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

const NuevoPlatillo = () => {
  // state para las imagenes
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState("");
  const [subiendoError, setSubiendoError] = useState(false);

  //context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);
  //   console.log("firebase ===> ", firebase);
  //Hook para redireccionar
  const navigate = useHistory();

  //validaciones y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    //esquema de validaciones con Yup
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "El nombre del platillo debe de tener al menos 3 caracteres")
        .required("El nombre del platillo es obligatorio"),
      precio: Yup.number()
        .min(1, "Debes de agregar un número")
        .required("El precio del platillo es obligatorio"),
      categoria: Yup.string().required(
        "La categoría del platillo es obligatoria"
      ),
      descripcion: Yup.string()
        .min(
          10,
          "La descripción del platillo debe de tener al menos 10 caracteres"
        )
        .required("La descripción del platillo es obligatoria"),
    }),
    //si pasa todas las validaciones se ejjecuta el handleSubmit
    onSubmit: (platillo) => {
      try {
        platillo.existencia = true;
        platillo.imagen = urlImagen;
        firebase.db.collection("productos").add(platillo);

        //redireccionar en caso de que se agregue correctamente el item
        navigate.push("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

  //funciones para la subida de imagenes
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };
  const handleUploadError = (error) => {
    setSubiendo(false);
    setSubiendoError(true);
    console.log(error);
  };
  const handleUploadSuccess = async (nombreImagen) => {
    setProgreso(100);
    setSubiendo(false);

    // para almacenar la URL donde queda la imagen
    const url = await firebase.storage
      .ref("productos")
      .child(nombreImagen)
      .getDownloadURL();

    console.log("esta es la URL -> ", url);
    setUrlImagen(url);
  };
  const handleProgress = (progreso) => {
    setProgreso(progreso);
    console.log(progreso);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Desde NuevoPlatillo.jsx</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="nombre"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="ej. Bandeja Paisa"
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Oops...</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="precio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="ej. 20,000$"
                min="0"
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Oops...</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Categoría
              </label>
              <select
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="categoria"
                name="categoria"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">-Seleccione-</option>
                <option value="desayunos">Desayunos</option>
                <option value="almuerzos">Almuerzos</option>
                <option value="comidas">Comidas</option>
                <option value="bebidas">Bebidas</option>
                <option value="postres">Postres</option>
                <option value="ensaladas">Ensaladas</option>
                <option value="licores">Licores</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Oops...</p>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>

            {subiendo && (
              <div className="h-12 relative w-full border-green-900">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progreso}%` }}
                >
                  {progreso} %
                </div>
              </div>
            )}

            {urlImagen && (
              <p className="bg-green-200 text-green-800 p-3 text-center my-5">
                La imagen ha sido subida correctamente
              </p>
            )}

            {subiendoError && (
              <p className="bg-red-200 text-red-800 p-3 text-center my-5">
                No se ha podido subir la imagen, intente nuevamente
              </p>
            )}

            <div className="mb-4">
              <div className="flex justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <span className="text-indigo-900 text-sm flex justify-end">
                  {formik.values.descripcion.length} / 2000
                </span>
              </div>

              <textarea
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="descripcion"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                maxLength="2000"
                placeholder="Descripción del platillo"
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Oops...</p>
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-indigo-900 hover:bg-yellow-500 w-full mt-5 p-2 text-white font-bold text-center cursor-pointer hover:text-gray-900"
              value="Agregar nuevo platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlatillo;
