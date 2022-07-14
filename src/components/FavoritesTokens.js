import React, { useEffect } from "react";
import { getTokenByAddress } from "../FetchApi/GetData";
import CardToken from "./CardToken";

const FavoritesTokens = ({ favoritesTokens, setFavoriteTokens }) => {

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (favoritesTokens > 0) {
	// 			favoritesTokens.map((token) =>
	// 				getTokenByAddress(token.selectOption.address).then((token) => console.log(token))
	// 			);
	// 		}
	// 	}, 3000);
	// });
	return (
		<div>
			{favoritesTokens?.map((token) => (
				<CardToken
					key={token.selectOption.symbol}
					token={token}
					setFavoriteTokens={setFavoriteTokens}
					deleteFavorite={{ value: true, msg: "Eliminar favorito" }}
				/>
			))}
		</div>
	);
};

export default FavoritesTokens;
