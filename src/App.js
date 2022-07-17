import { useEffect, useState } from "react";
import FavoritesTokens from "./components/FavoritesTokens";
import useTokens from "./hooks/useTokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./views/Home";

const Header = styled.header`
	width: 100%;
`;
const Nav = styled.nav`
	display: flex;
	color: white;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	font-size: 2rem;
`;

const Logo = styled.h1`
	font-size: 1.2rem;

	@media (min-width: 570px) {
		font-size: 2rem;
	}
`;

const Button = styled.button`
	font-weight: bold;
	padding: 10px;
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

function App() {
	const [favoritesTokens, setFavoritesTokens] = useState([]);
	const [updateFavorites, setUpdateFavorites] = useState(0);
	const [token, setToken] = useState({});
	const [, SelectCripto, selectOption] = useTokens();

	useEffect(() => {
		setInterval(() => {
			setUpdateFavorites((count) => count + 1);
		}, 30000);
	}, []);

	return (
		<>
			<Header>
				<Nav>
					<Logo>CriptoApp</Logo>
					<Button>Conectar Wallet</Button>
				</Nav>
			</Header>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								setFavoritesTokens={setFavoritesTokens}
								favoritesTokens={favoritesTokens}
								token={token}
								setToken={setToken}
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
								updateFavorites={updateFavorites}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
