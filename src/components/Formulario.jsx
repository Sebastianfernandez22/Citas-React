import { useState, useEffect } from 'react';
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)



  useEffect(() => {
    if (Object.keys(paciente).length > 0) { // este codigo detecta el objeto vacio  
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])



  // si el useefect pasamos las dependencias vacias esto hara que se ejecute sola 1 vez mientras que si  que si tiene dependencias con datos
  // se ejecutara cada vez que paciente cambie o algo cambie o el componente este listo 

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    // Validacion de formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay almenos un campo vacio')

      setError(true)
      return;
    }
    setError(false)

    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
    //  Editando el registro
    objetoPaciente.id =paciente.id
    const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id ===
      paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)
      setPaciente({})

    }else {
    // Nuevo registro
    objetoPaciente.id =generarId();
    setPacientes([...pacientes, objetoPaciente]);

  }



    // Reiniciar el Form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setFecha('')


  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento
        Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10 font-bold ">Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>


      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error><p>Todos los campos son Obligatorios</p></Error>}
        <div className="mb-10">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>


        <div className="mb-10">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>


        <div className="mb-8">
          <label htmlFor="Email" className="block text-gray-700 uppercase font-bold">Email
          </label>

          <input
            id="Email"
            type="text"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">ALTA
          </label>

          <input
            id="alta"
            type="date"
            placeholder=""
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>


        <div className="mb-8">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
            placeholder="Describe los Sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase
           font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar paciente' : 'agregar paciente'}
        />
      </form>

    </div>
  )
}

export default Formulario
