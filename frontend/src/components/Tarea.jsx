import React from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
	const { nombre, descripcion, fechaEntrega, prioridad, estado } = tarea;
	const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
	return (
		<div className="border-b p-5 flex justify-between items-center">
			<div>
				<div className="mb-1 text-xl">{nombre}</div>
				<div className="mb-1 text-sm text-gray-500 uppercase">
					{descripcion}
				</div>
				<div className="mb-1 text-sm">
					{formatearFecha(fechaEntrega)}
				</div>
				<div className="mb-1 text-xl text-gray-600">
					Prioridad: {prioridad}
				</div>
			</div>
			<div className="flex gap-2">
				<button
					className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
					onClick={() => handleModalEditarTarea(tarea)}
				>
					Editar
				</button>
				{estado ? (
					<button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
						Completa
					</button>
				) : (
					<button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
						Incompleta
					</button>
				)}
				<button
					className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
					onClick={() => handleModalEliminarTarea(tarea)}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Tarea;
