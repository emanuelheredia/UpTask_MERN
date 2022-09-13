import React from "react";
import { Link } from "react-router-dom";

const Registrar = () => {
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Crea tu Cuenta y Administra tus{" "}
				<span className="text-slate-700">Proyectos</span>
			</h1>
			<form className="my-10 bg-white shadow rounded-lg p-10">
				<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="nombre"
					>
						Nombre
					</label>
					<input
						id="nombre"
						type="text"
						placeholder="Tu Nombre"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
					/>
				</div>
				<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
					/>
				</div>
				<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="password"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						placeholder="Password de Registro"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
					/>
				</div>
				<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="password2"
					>
						Repetir Password
					</label>
					<input
						id="password2"
						type="password"
						placeholder="Repetir Password"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
					/>
				</div>
				<input
					type="submit"
					value="Crear Cuenta"
					className=" mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>
			<nav className="flex justify-between">
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm"
					to="/"
				>
					¿Ya tienes una Cuenta? Inicia Sesión
				</Link>
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm"
					to="/olvide-password"
				>
					Olvide mi password
				</Link>
			</nav>
		</>
	);
};

export default Registrar;
