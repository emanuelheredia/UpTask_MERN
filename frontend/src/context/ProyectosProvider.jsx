import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectoContext = createContext();

const ProyectosProvider = ({ children }) => {
	const navigate = useNavigate();
	const [proyectos, setProyectos] = useState([]);
	const [proyecto, setProyecto] = useState({});
	const [alerta, setAlerta] = useState({});
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
	const [tarea, setTarea] = useState({});
	const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
	const [colaborador, setColaborador] = useState({});
	const [modalEliminarColaborador, setModalEliminarColaborador] =
		useState(false);

	const mostrarAlerta = (alerta) => {
		setAlerta(alerta);
		setTimeout(() => {
			setAlerta({});
		}, 2000);
	};
	useEffect(() => {
		const obtenerProyectos = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) return;
				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				};
				const { data } = await clienteAxios("/proyectos", config);
				setProyectos(data);
			} catch (error) {
				console.log(error);
			}
		};
		obtenerProyectos();
	}, []);

	const obtenerProyecto = async (id) => {
		setCargando(true);
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios(`/proyectos/${id}`, config);
			setProyecto(data);
		} catch (error) {
			setAlerta({ msg: error.response.data.msg });
		} finally {
			setCargando(false);
		}
	};

	const submitProyecto = async (proyecto) => {
		if (proyecto.id) {
			await editarProyecto(proyecto);
		} else {
			await crearProyecto(proyecto);
		}
	};
	const crearProyecto = async (proyecto) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post(
				"/proyectos",
				proyecto,
				config,
			);
			setProyectos([...proyectos, data]);
			mostrarAlerta({
				msg: "Proyecto Creado Correctamente",
				error: false,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const editarProyecto = async (proyecto) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.put(
				`/proyectos/${proyecto.id}`,
				proyecto,
				config,
			);
			const proyectosActualizados = proyectos.map((proyectoState) =>
				data._id === proyectoState._id ? data : proyectoState,
			);
			setProyectos(proyectosActualizados);
			mostrarAlerta({
				msg: "Proyecto Actualizado Correctamente",
				error: false,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const eliminarProyecto = async (id) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.delete(
				`/proyectos/${id}`,
				config,
			);
			const proyectosActualizados = proyectos.filter(
				(proyectoState) => id !== proyectoState._id,
			);
			setProyectos(proyectosActualizados);
			mostrarAlerta({
				msg: data.msg,
				error: false,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleModalTarea = () => {
		setModalFormularioTarea(!modalFormularioTarea);
		setTarea({});
	};
	const handleModalEditarTarea = (tarea) => {
		setModalFormularioTarea(true);
		setTarea(tarea);
	};
	const submitTarea = async (tarea) => {
		if (tarea.id2) {
			await editarTarea(tarea);
		} else {
			await crearTarea(tarea);
		}
	};
	const crearTarea = async (tarea) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post("/tareas", tarea, config);
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = [...proyecto.tareas, data];
			setProyecto(proyectoActualizado);
			setModalFormularioTarea(false);
		} catch (error) {
			console.log(error);
		}
	};
	const editarTarea = async (tarea) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.put(
				`/tareas/${tarea.id2}`,
				tarea,
				config,
			);
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyectoActualizado.tareas.map(
				(tareaState) =>
					tareaState._id === data._id ? data : tareaState,
			);
			setProyecto(proyectoActualizado);
			setModalFormularioTarea(false);
			setAlerta({});
		} catch (error) {
			console.log(error);
		}
	};
	const handleModalEliminarTarea = (tarea) => {
		setModalEliminarTarea(!modalEliminarTarea);
		setTarea(tarea);
	};
	const eliminarTarea = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.delete(
				`/tareas/${tarea._id}`,
				config,
			);
			setAlerta({ msg: data.msg, error: false });
			setTimeout(() => setAlerta({}), 2000);
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
				(tareaState) => tareaState._id !== tarea._id,
			);
			setProyecto(proyectoActualizado);
			setModalEliminarTarea(false);
			setTarea({});
		} catch (error) {
			console.log(error);
		}
	};
	const submitColaborador = async (email) => {
		setCargando(true);
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post(
				`proyectos/colaboradores`,
				{ email },
				config,
			);
			setColaborador(data);
			setAlerta({});
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true });
		} finally {
			setCargando(false);
		}
	};
	const agregarColaborador = async (email) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post(
				`proyectos/colaboradores/${proyecto._id}`,
				email,
				config,
			);
			setAlerta({ msg: data.msg, error: false });
			setColaborador({});
			setTimeout(() => {
				setAlerta({});
			}, 2000);
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true });
		}
	};
	const handleModalEliminarColaborador = (colaborador) => {
		setModalEliminarColaborador(!modalEliminarColaborador);
		setColaborador(colaborador);
	};
	const eliminarColaborador = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.post(
				`proyectos/eliminar-colaborador/${proyecto._id}`,
				{ id: colaborador._id },
				config,
			);
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.colaboradores =
				proyectoActualizado.colaboradores.filter(
					(colaboradorState) =>
						colaboradorState._id !== colaborador._id,
				);
			setProyecto(proyectoActualizado);
			setAlerta({ msg: data.msg, error: false });
			setColaborador({});
			setModalEliminarColaborador(false);
		} catch (error) {
			console.log(error.response);
		}
	};
	return (
		<ProyectoContext.Provider
			value={{
				proyectos,
				mostrarAlerta,
				alerta,
				setAlerta,
				submitProyecto,
				obtenerProyecto,
				proyecto,
				cargando,
				eliminarProyecto,
				handleModalTarea,
				modalFormularioTarea,
				submitTarea,
				handleModalEditarTarea,
				tarea,
				handleModalEliminarTarea,
				modalEliminarTarea,
				eliminarTarea,
				submitColaborador,
				colaborador,
				agregarColaborador,
				handleModalEliminarColaborador,
				modalEliminarColaborador,
				eliminarColaborador,
			}}
		>
			{children}
		</ProyectoContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectoContext;
