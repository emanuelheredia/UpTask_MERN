import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
	const [alerta, setAlerta] = useState({});
	const [tokenValido, setTokenValido] = useState(false);
	const [password, setPassword] = useState("");
	const { token } = useParams();
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				//TODO:Mover hacia un cliente axios
				const { data } = await axios(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/app/usuario/olvide-password/${token}`,
				);
				setTokenValido(true);
			} catch (error) {
				setAlerta({ msg: error.response.data.msg, error: true });
			}
		};
		comprobarToken();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password.length < 6) {
			setAlerta({
				msg: "El password debe ser minimo de 6 caracteres",
				error: true,
			});
			return;
		}
		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/app/usuario/olvide-password/${token}`,
				{ password },
			);
			setAlerta({ msg: data.msg, error: false });
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};
	const { msg } = alerta;
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Reestablece tu password y no pierdas acceso a tus{" "}
				<span className="text-slate-700">Proyectos</span>
			</h1>
			{msg && <Alerta alerta={alerta} />}
			{tokenValido && (
				<form
					className="my-10 bg-white shadow rounded-lg p-10"
					onSubmit={handleSubmit}
				>
					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
							htmlFor="password"
						>
							Nuevo Password
						</label>
						<input
							id="password"
							type="password"
							placeholder="Escribe tu Nuevo Password"
							className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<input
						type="submit"
						value="Guardar Nuevo Password"
						className=" mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
					/>
				</form>
			)}
		</>
	);
};

export default NuevoPassword;
