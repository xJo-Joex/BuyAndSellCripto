import { useEffect, useState } from "react";
import { getTokenByAddress } from "../FetchApi/GetData";
import CardToken from "../components/CardToken";
import styled from "styled-components";

const SeLectionToken = styled.section`
	display: flex;
	width: 100%;
	height: 100%;
	margin: 1rem auto;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	@media (min-width: 570px) {
		width: 50%;
	}
`;

const Home = ({ setFavoritesTokens, favoritesTokens, SelectCripto, selectOption }) => {
	const [token, setToken] = useState({});

	useEffect(() => {
		if (selectOption.address !== "" && selectOption.symbol !== "") {
			getTokenByAddress(selectOption.address, selectOption.symbol).then(setToken);
		}
	}, [selectOption]);

	return (
		<>
			<SeLectionToken className="animate__animated animate__fadeIn animate__delay-1s ">
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
