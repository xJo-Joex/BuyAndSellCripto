import React, { useEffect, useState } from "react";
import { getTokenByAddress } from "../FetchApi/GetData";
import CardToken from "./CardToken";

const FavoritesTokens = ({ favoritesTokens, setFavoriteTokens /*  updateFavorites */ }) => {
	const [updateFavorites, setUpdateFavorites] = useState(0);
	useEffect(() => {
		setInterval(() => {
			setUpdateFavorites((count) => count + 1);
		}, 30000);
	}, []);
	useEffect(() => {
		favoritesTokens.length > 0 &&
			favoritesTokens.map((token) =>
				getTokenByAddress(token.buyTokenAddress).then((tokenUpdate) =>
					setFavoriteTokens((oldTokens) =>
						oldTokens.map((oldTkn) =>
							oldTkn.buyTokenAddress === tokenUpdate.buyTokenAddress
								? {
										...tokenUpdate,
										selectOption: { ...oldTkn.selectOption },
										lastPrices:
											oldTkn.lastPrices?.length < 5
												? [...oldTkn.lastPrices, tokenUpdate.price]
												: [...oldTkn.lastPrices.slice(-4), tokenUpdate.price],
								  }
								: oldTkn
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
