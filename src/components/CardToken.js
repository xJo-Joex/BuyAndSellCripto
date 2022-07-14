import React from "react";
import styled from "styled-components";

const Card = styled.div`
	/* background-color: rgba(76, 36, 159, 0.7); */
	/* border-radius: 2rem; */
	box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.377);
	color: white;
	font-size: 2rem;
	height: 25rem;
	margin-top: 1rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 1rem;
	background-color: #2266c3;
	&:hover {
		border: 0.2rem solid transparent;
		border-image: linear-gradient(to bottom, rgba(53, 240, 208, 0.8) 100%, #2266c3 100%) 1;
	}
`;
const Span = styled.span`
	display: block;
`;
const H3 = styled.h3`
	font-size: 2rem;
	text-align: center;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	margin-top: 1rem;
	color: white;
	font-size: 1rem;
	padding: 1rem;
	transition: color 1s linear;
	cursor: pointer;
	&:hover {
		color: rgba(53, 240, 208, 0.8);
	}
`;
const CardToken = (props) => {
	const { token, setFavoriteTokens, deleteFavorite } = props;
	const handleFavorite = () => {
		if (deleteFavorite.value) {
			setFavoriteTokens((tokens) => tokens.filter((tkn) => tkn !== token));
		} else {
			setFavoriteTokens((tokens) => [...tokens, token]);
		}
	};
	return (
		<Card>
			{token.price ? (
				<>
					<h2>{token.selectOption.symbol.substring(0, 7)}</h2>
					<H3>
						Precio: <Span> {Number(token.price).toFixed(10)} TUSD</Span>
					</H3>
					<Button onClick={handleFavorite}>{deleteFavorite.msg}</Button>
				</>
			) : (
				<p>Selecciona un token</p>
			)}
		</Card>
	);
};

export default CardToken;
