import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTokenByAddress } from "../FetchApi/GetData";
import useTokens from "../hooks/useTokens";
import CardToken from "./CardToken";

const ContainerFavorites = styled.section`
	height: auto;
	margin: 0 auto;
	width: auto;
	@media (min-width: 580px) {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		flex-direction: row;
		column-row: 4rem;
		/* flex: 0 0 200px; */
	}
	/* background-color: white; */
`;

const FavoritesTokens = ({ favoritesTokens, setFavoritesTokens /* , updateFavorites */ }) => {
	// console.log(favoritesTokens);
	const [updateFavorites, setUpdateFavorites] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			if (favoritesTokens.length < 1) return () => clearInterval(timer);
			console.log("hola");
			setUpdateFavorites((count) => (count < 5 ? count + 1 : 0));
		}, 30000);
		return () => clearInterval(timer);
	}, [favoritesTokens]);

	useEffect(() => {
		if (favoritesTokens.length > 0 && updateFavorites <= 5 && updateFavorites > 0) {
			console.log(updateFavorites)
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
		}
	}, [updateFavorites]);
	if (favoritesTokens.length < 1) return;
	return (
		<>
			<ContainerFavorites className="animate__animated animate__fadeIn animate__delay-1s ">
				{favoritesTokens.map((token, idx) => (
					<CardToken
						key={token.selectOption.symbol + idx}
						token={token}
						setFavoritesTokens={setFavoritesTokens}
						deleteFavorite={{ value: true, msg: "Eliminar favorito" }}
					/>
				))}
			</ContainerFavorites>
		</>
	);
};

export default FavoritesTokens;
