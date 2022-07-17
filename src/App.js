import { useEffect, useState } from "react";
import styled from "styled-components";
import CardToken from "./components/CardToken";
import FavoritesTokens from "./components/FavoritesTokens";
import { getTokenByAddress } from "./FetchApi/GetData";
import useTokens from "./hooks/useTokens";

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
const MainContainer = styled.div`
	display: block;
	margin-top: 2rem;
	@media (min-width: 570px) {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
`;
const SeLectionToken = styled.section`
	display: flex;
	width: 100%;
	margin-top: 1rem;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	@media (min-width: 570px) {
		width: 40%;
	}
`;
const Favoritos = styled.section`
	margin-top: 1rem;
	height: auto;
	@media (min-width: 570px) {
		width: 50%;
	}
`;
const Title = styled.h3`
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1rem;
	display: block;
	margin-bottom: 1rem;
`;
function App() {
	const [, SelectCripto, selectOption] = useTokens();
	const [token, setToken] = useState({});
	useEffect(() => {
		if (selectOption.address !== "" && selectOption.symbol !== "") {
			getTokenByAddress(selectOption.address, selectOption.symbol).then(setToken);
		}
	}, [selectOption]);
	const [favoritesTokens, setFavoriteTokens] = useState([]);
	const [updateFavorites, setUpdateFavorites] = useState(0);
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
			<MainContainer>
				<SeLectionToken>
					<SelectCripto />
					<CardToken
						token={{ ...token, selectOption }}
						setFavoriteTokens={setFavoriteTokens}
						favoriteTokens={favoritesTokens}
						deleteFavorite={{ value: false, msg: "Añadir a favorito" }}
					/>
				</SeLectionToken>
				<Favoritos>
					<Title>Favoritos</Title>
					<FavoritesTokens
						favoritesTokens={favoritesTokens}
						setFavoriteTokens={setFavoriteTokens}
						updateFavorites={updateFavorites}
					/>
				</Favoritos>
			</MainContainer>
		</>
	);
}

export default App;
