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
	const mostrarAlerta = (alerta) => {
		setAlerta(alerta);
		setTimeout(() => {
			setAlerta({});
			navigate("proyectos");
		}, 3000);
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
			console.log(error);
		} finally {
			setCargando(false);
		}
	};

	const submitProyecto = async (proyecto) => {
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
	return (
		<ProyectoContext.Provider
			value={{
				proyectos,
				mostrarAlerta,
				alerta,
				submitProyecto,
				obtenerProyecto,
				proyecto,
				cargando,
			}}
		>
			{children}
		</ProyectoContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectoContext;
