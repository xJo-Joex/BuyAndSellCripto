import { useEffect, useState } from "react";
import { getTokenByAddress } from "../FetchApi/GetData";
import CardToken from "../components/CardToken";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SeLectionToken = styled.section`
	display: flex;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	@media (min-width: 570px) {
		width: 50%;
	}
`;

const Home = ({
	setFavoritesTokens,
	favoritesTokens,
	token,
	setToken,
	SelectCripto,
	selectOption,
}) => {
	useEffect(() => {
		if (selectOption.address !== "" && selectOption.symbol !== "") {
			getTokenByAddress(selectOption.address, selectOption.symbol).then(setToken);
		}
	}, [selectOption]);
	const [updateFavorites, setUpdateFavorites] = useState(0);
	useEffect(() => {
		setInterval(() => {
			setUpdateFavorites((count) => count + 1);
		}, 30000);
	}, []);

	return (
		<>
			<Link to="/favoritos" className="btn-borde">
				Favoritos
			</Link>
			<SeLectionToken>
				<SelectCripto />
				<CardToken
					token={{ ...token, selectOption }}
					setFavoritesTokens={setFavoritesTokens}
					favoritesTokens={favoritesTokens}
					deleteFavorite={{ value: false, msg: "Añadir a favorito" }}
				/>
			</SeLectionToken>
		</>
	);
};
export default Home;
