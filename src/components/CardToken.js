import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalComponent from "./Modal";

const Card = styled.div`
	background-color: rgba(76, 36, 159, 0.19);
	/* border-radius: 2rem; */
	box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.377);
	color: white;
	font-size: 2.5rem;
	height: 27rem;
	margin-top: 1rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 1rem;
	/* background-color: #2266c3; */
	border: 0.2rem solid transparent;
	transition: border-color 1s ease-in;
	&:hover {
		/* border-image: linear-gradient(to bottom, rgba(53, 240, 208, 0.8) 100%, #2266c3 100%) 1; */
		border-color: #2dfdf0;
	}
	@media (min-width: 670px) {
		min-width: auto;
		max-width: 28rem;
		/* width: auto; */
		/* flex: 0 1 200px; */
		/* min-width:300px; */
		/* height: 27rem; */
		margin: 1rem auto;
	}
`;
const Span = styled.span`
	display: block;
	padding: 0.4rem;
	color: ${(props) => props.colorPrice};
	font-size: 1.1rem;

	@media (min-width: 580px) {
		font-size: 1.3rem;
	}
	@media (min-width: 610px) {
		font-size: 1.5rem;
	}
`;
const H2Token = styled.h2`
	text-align: center;
	background: linear-gradient(#2266c3, #2dfdf0);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
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
	&:disabled {
		color: rgba(255, 255, 255);
	}
`;
const Promedio = styled.p`
	font-size: 1.5rem;
	text-align: center;
	margin-top: 1rem;
`;
const SpanAvarage = styled.span`
	/* color: #4c249f; */
	color: black;
	color: #d3fef7;
	font-weight: bold;
	display: block;
	margin-top: 0.4rem;
`;
const ContainerBtn = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;
const Btn = styled.button`
	/* font-weight: small; */
	font-family: "Jost", sans-serif;
	padding: 0.5rem;
	/* background-color: transparent; */
	font-size: 1rem;
	border: none;
	border-radius: 0.5rem;
	border-bottom: 0.1rem rgba(53, 240, 208, 0.5) solid;
	border-top: 0.1rem rgba(53, 240, 208, 0.5) solid;
	width: auto;
	background-color: rgba(53, 240, 208, 0.5);
	color: white;
	color: ${(props) => props.borderColor};
	transition: color 0.3s ease;
	&:hover {
		cursor: pointer;
	}
	&:disabled {
		background-color: transparent;
		/* color: #4c249f; */
		color: white;
	}
	@media (min-width: 570px) {
		font-size: 1rem;
	}
`;

const ParagraphNoFound = styled.p`
	text-align: center;
`;

const CardToken = (props) => {
	const { token, setFavoritesTokens, deleteFavorite, favoritesTokens } = props;
	// console.log(favoritesTokens);
	const [modalIsOpen, setIsOpen] = useState(false);

	const [msgModal, setMsgModal] = useState("");
	const [average, setAverage] = useState(Number(token.price));
	const handleFavorite = (e) => {
		//verify limit tokens
		setIsOpen(true);

		if (!deleteFavorite.value && favoritesTokens?.length === 3) {
			return setMsgModal("Solo puedes añadir hasta 3 favoritos");
		}
		//Verify that token not was added already
		if (
			favoritesTokens?.some((tkn) => tkn.selectOption.symbol === token.selectOption.symbol) &&
			!deleteFavorite.value
		) {
			setMsgModal("El token ya ha sido añadido");
			return;
		}
		//Delete a token
		if (deleteFavorite.value) {
			return setFavoritesTokens((tokens) => tokens.filter((tkn) => tkn !== token));
		}

		//Add a token
		if (!deleteFavorite.value && favoritesTokens?.length < 3) {
			setFavoritesTokens((tokens) => {
				setMsgModal("Token añadido a favoritos");
				return [...tokens, token];
			});
		}
	};
	useEffect(() => {
		// if (isNaN(average)) return;
		if (Object.keys(token).length > 0 && token?.lastPrices?.length === 5) {
			// console.log(token)
			setAverage(Number(token.lastPrices.reduce((a, b) => a + b)) / Number(token.lastPrices?.length));
		}
	}, [token, average]);
	// if (typeof token.average === "string") return null;

	// if (Object.keys(token).length < 1) return;
	return (
		<Card className={`animate__animated  animate__bounceIn`}>
			{token.price ? (
				<>
					<p></p>
					<H2Token>{token.selectOption.symbol.substring(0, 7)} </H2Token>
					<H3>
						Precio:{" "}
						{deleteFavorite.value /* && !(Number(token.price) === Number(average)) */ ? (
							<>
								<Span
									colorPrice={
										Number(token.price) === Number(average)
											? " white "
											: Number(token.price) <= Number(average)
											? "#fd1d1d"
											: "#98ff96"
									}
								>
									{Number(token.price).toLocaleString("en-IN", {
										style: "decimal",
										minimumFractionDigits: 18,
										currency: "INR",
									})}
								</Span>
								DAI
							</>
						) : (
							<>
								<Span colorPrice={"white"}>
									{" "}
									{Number(token.price).toLocaleString("en-IN", {
										style: "decimal",
										minimumFractionDigits: 14,
									})}{" "}
								</Span>
								DAI
							</>
						)}
					</H3>
					{deleteFavorite.value && (
						<Promedio>
							Promedio úitimas 5 lecturas:{" "}
							<SpanAvarage>
								DAI{" "}
								{Number(average).toLocaleString("en-IN", {
									style: "decimal",
									minimumFractionDigits: 18,
								})}
							</SpanAvarage>{" "}
						</Promedio>
					)}
					<Button
						// disabled={favoritesTokens?.length === 3 ? true : false}
						title="Solo puedes añadir hasta 3 tokens diferentes"
						onClick={handleFavorite}
					>
						{deleteFavorite.msg}
					</Button>
					{deleteFavorite.value && (
						<ContainerBtn>
							<Btn
								// borderColor={"rgba(53, 240, 208, 1)"}
								disabled={!(Number(token.price) <= Number(average))}
								onClick={() => setIsOpen(true)}
							>
								Comprar
							</Btn>
							<Btn
								// borderColor={"rgba(53, 240, 208, 1)"}
								disabled={!(Number(token.price) > Number(average))}
								onClick={() => setIsOpen(true)}
							>
								Vender
							</Btn>
						</ContainerBtn>
					)}
					<ModalComponent
						modalIsOpen={modalIsOpen}
						setIsOpen={setIsOpen}
						infoModal={{
							value: deleteFavorite.value,
							numberFavorites: favoritesTokens?.length,
							msg: msgModal,
						}}
						// whatShow={deleteFavorite}
					></ModalComponent>
				</>
			) : token.code === 100 ? (
				<ParagraphNoFound>
					:( Lo sentimos este Token no esta disponible en este momento
				</ParagraphNoFound>
			) : (
				<ParagraphNoFound>Selecciona un token</ParagraphNoFound>
			)}
		</Card>
	);
};

export default CardToken;
