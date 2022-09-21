import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";

const EditarProyecto = () => {
	const { obtenerProyecto, proyecto, cargando } = useProyectos();
	const { id } = useParams();

	useEffect(() => {
		obtenerProyecto(id);
	}, []);
	const { nombre } = proyecto;
	if (cargando) return "Cargando...";
	return (
		<>
			{" "}
			<h1 className="font-bold text-4xl">Editar Proyecto: {nombre}</h1>
			<div className="mt-10 flex justify-center">
				<FormularioProyecto />
			</div>
		</>
	);
};

export default EditarProyecto;
