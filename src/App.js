import { useState, useEffect } from "react";
import FavoritesTokens from "./components/FavoritesTokens";
import useTokens from "./hooks/useTokens";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./views/Home";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormRecharge from "./components/FormRecharge";

const Header = styled.header`
	width: 100%;
	margin-bottom: 2rem;
`;
const Nav = styled.nav`
	display: flex;
	color: white;
	width: 100%;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	row-gap: 1rem;
	font-size: 2rem;
`;

const Logo = styled.h1`
	font-size: 1.5rem;
	font-weight: 800;

	@media (min-width: 570px) {
		font-size: 2rem;
	}
`;

const Button = styled.button`
	font-weight: bold;
	padding: 0.8rem;
	background-color: rgba(53, 240, 208, 1);
	box-shadow: 0 0 0 3px rgba(53, 240, 208, 0.5);
	font-size: 1rem;
	border: none;
	width: auto;
	border-radius: 10px;
	color: #4c249f;
	transition: background-color 0.3s ease;
	&:hover {
		cursor: pointer;
		background-color: rgba(53, 240, 208, 0.8);
	}
	@media (min-width: 570px) {
		font-size: 1.5rem;
	}
`;
const ContainerLogo = styled.div`
	a {
		display: inline-block;
		color: white;
		padding-left: 1rem;
		padding-right: 1rem;
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 2.5rem;
		text-decoration: none;
		border-radius: 1.2rem;
		cursor: pointer;
		@media (min-width: 570px) {
			width: 10rem;
		}
		&:hover {
			border-color: #2dfdf0;
		}
	}
`;
const ContainerLink = styled.div`
	padding: 0.5rem;
	border-radius: 1.2rem;
	width: auto;
	border: 0.1rem #4c249f solid;
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 1rem;
	transition: border-color 1s ease;
	&:hover {
		border-color: #2dfdf0;
	}

	a {
		display: inline-block;
		background: linear-gradient(#f5d033, #2dfdf0);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		padding-left: 1rem;
		padding-right: 1rem;
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 1.4rem;
		text-decoration: none;
		border-radius: 1.2rem;
		cursor: pointer;
		transition: background-color 1s ease-in;
		/* transition: color 2s ease-in; */
		@media (min-width: 570px) {
			width: 10rem;
		}
		&:hover {
			color: #4c249f;
			background: none;
			-webkit-background-clip: none;
			background-clip: none;
			padding-left: 1rem;
			background-color: #2dfdf0;
		}
	}
`;

function App() {
	const [favoritesTokens, setFavoritesTokens] = useState([]);
	const [, SelectCripto, selectOption] = useTokens();
	const { pathname } = useLocation();
	const [modalIsOpen, setIsOpen] = useState(false);
	return (
		<>
			<Header>
				<Nav>
					<ContainerLogo>
						<Link to="/">CriptoApp</Link>
					</ContainerLogo>

					<ContainerLink>
						{(pathname === "/favoritos" || pathname === "/recargar") && <Link to="/">Inicio</Link>}
						{pathname === "/" && <Link to="/favoritos">favoritos</Link>}
						<Link to="/recargar" onClick={() => setIsOpen(true)}>
							{" "}
							Saldo $0.00
						</Link>
					</ContainerLink>
					<Button>Conectar Wallet</Button>
				</Nav>
			</Header>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							setFavoritesTokens={setFavoritesTokens}
							favoritesTokens={favoritesTokens}
							selectOption={selectOption}
							SelectCripto={SelectCripto}
						/>
					}
				/>
				<Route
					path="/favoritos"
					element={
						<FavoritesTokens
							favoritesTokens={favoritesTokens}
							setFavoritesTokens={setFavoritesTokens}
							// updateFavorites={updateFavorites}
						/>
					}
				/>
				<Route
					path="/recargar"
					element={<FormRecharge modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />}
				/>
			</Routes>
		</>
	);
}

export default App;
