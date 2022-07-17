import React, { useEffect, useState } from "react";
import { getTokenByAddress } from "../FetchApi/GetData";
import CardToken from "./CardToken";

const FavoritesTokens = ({ favoritesTokens, setFavoriteTokens,  updateFavorites }) => {

	useEffect(() => {
		favoritesTokens.length > 0 &&
			favoritesTokens.map((token) =>
				getTokenByAddress(token.buyTokenAddress, token.symbol).then((tokenUpdate) =>
					setFavoriteTokens((oldTokens) =>
						oldTokens.map((oldTkn) =>{
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
							: oldTkn
						}
						)
					)
				)
			);
	}, [updateFavorites]);
	return (
		<div>
			{favoritesTokens.map((token, idx) => (
				<CardToken
					key={token.selectOption.symbol + idx}
					token={token}
					setFavoriteTokens={setFavoriteTokens}
					deleteFavorite={{ value: true, msg: "Eliminar favorito" }}
				/>
			))}
		</div>
	);
};

export default FavoritesTokens;
