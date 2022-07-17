import React, { useEffect } from "react";
import styled from "styled-components";
import { getTokenByAddress } from "../FetchApi/GetData";
import CardToken from "./CardToken";
import { Link } from "react-router-dom";

const ContainerFavorites = styled.section`
	height: auto;
	margin: 0 auto;
	@media (min-width: 570px) {
		width: 50%;
	}
	/* background-color: white; */
`;
const FavoritesTokens = ({ favoritesTokens, setFavoritesTokens, updateFavorites }) => {
	useEffect(() => {
		favoritesTokens.length > 0 &&
			favoritesTokens.map((token) =>
				getTokenByAddress(token.buyTokenAddress, token.symbol).then((tokenUpdate) =>
					setFavoritesTokens((oldTokens) =>
						oldTokens.map((oldTkn) => {
							// console.log(tokenUpdate)
							return oldTkn.selectOption.symbol === tokenUpdate.symbol
								? {
										...tokenUpdate,
										selectOption: { ...oldTkn.selectOption },
										lastPrices:
											oldTkn.lastPrices?.length < 5
												? [...oldTkn.lastPrices, tokenUpdate.price]
												: [...oldTkn.lastPrices.slice(-4), tokenUpdate.price],
								  }
								: oldTkn;
						})
					)
				)
			);
	}, [updateFavorites]);
	return (
		<>
			'
			<Link to="/" className="btn-borde">
				Inicio
			</Link>
			<ContainerFavorites>
				{favoritesTokens.map((token, idx) => (
					<CardToken
						key={token.selectOption.symbol + idx}
						token={token}
						setFavoriteTokens={setFavoritesTokens}
						deleteFavorite={{ value: true, msg: "Eliminar favorito" }}
					/>
				))}
			</ContainerFavorites>
		</>
	);
};

export default FavoritesTokens;
