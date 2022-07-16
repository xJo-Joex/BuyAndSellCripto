import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { customStyles } from "../FetchApi/Modal";

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
	border: 0.2rem solid transparent;
	&:hover {
		border-image: linear-gradient(to bottom, rgba(53, 240, 208, 0.8) 100%, #2266c3 100%) 1;
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
	font-size: 1rem;
	text-align: center;
	margin-top: 1rem;
`;
const SpanAvarage = styled.span`
	color: #4c249f;
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
	font-weight: small;
	padding: 0.5rem;
	/* background-color: transparent; */
	font-size: 1rem;
	border: none;
	border-radius: 0.5rem;
	border-bottom: 0.1rem rgba(53, 240, 208, 0.5) solid;
	border-top: 0.1rem rgba(53, 240, 208, 0.5) solid;
	width: auto;
	background-color: rgba(53, 240, 208, 0.5);
	color: ${(props) => props.borderColor};
	transition: color 0.3s ease;
	&:hover {
		cursor: pointer;
	}
	&:disabled {
		background-color: transparent;
		color: #4c249f;
	}
	@media (min-width: 570px) {
		font-size: 1rem;
	}
`;

const FormConfirmation = styled.form`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-evenly;
`;

const CardToken = (props) => {
	const { token, setFavoriteTokens, deleteFavorite, favoriteTokens } = props;
	const [modalIsOpen, setIsOpen] = useState(false);
	const [average, setAverage] = useState(Number(token.price));
	const handleFavorite = () => {
		//Verify that token not was added already
		if (
			favoriteTokens?.some((tkn) => tkn.selectOption.symbol === token.selectOption.symbol) &&
			!deleteFavorite.value
		)
			return;
		//Delete a token
		if (deleteFavorite.value) {
			return setFavoriteTokens((tokens) => tokens.filter((tkn) => tkn !== token));
		}

		//Add a token
		if (!deleteFavorite.value && favoriteTokens.length < 3) {
			setFavoriteTokens((tokens) => {
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

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<Card>
			{token.price ? (
				<>
					<h2>{token.selectOption.symbol.substring(0, 7)}</h2>
					<H3>
						Precio:{" "}
						{deleteFavorite.value /* && !(Number(token.price) === Number(average)) */ ? (
							<>
								<Span colorPrice={Number(token.price) <= Number(average) ? " #9c0720 " : "#98ff96"}>
									{Number(token.price)}
								</Span>
								DAI
							</>
						) : (
							<>
								<Span colorPrice={"white"}> {Number(token.price)} </Span>DAI
							</>
						)}
					</H3>
					{deleteFavorite.value && (
						<Promedio>
							Promedio úitimas 5 lecturas: <SpanAvarage>${average}</SpanAvarage>{" "}
						</Promedio>
					)}
					<Button
						disabled={favoriteTokens?.length === 3 ? true : false}
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
								onClick={openModal}
							>
								Comprar
							</Btn>
							<Btn
								// borderColor={"rgba(53, 240, 208, 1)"}
								disabled={!(Number(token.price) > Number(average))}
								onClick={openModal}
							>
								Vender
							</Btn>
						</ContainerBtn>
					)}
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						overlayClassName="Overlay"
						ariaHideApp={false}
						style={customStyles}
						contentLabel="Example Modal"
					>
						{/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
						<FormConfirmation>
							<h2>¿Estás seguro de realizar esta acción?</h2>
							<ContainerBtn>
								<Btn backgroundColor={"#4c249f"} onClick={closeModal}>
									Confirmar
								</Btn>
								<Btn backgroundColor={"rgba(53, 240, 208, 1)"} onClick={closeModal}>
									Cancelar
								</Btn>
							</ContainerBtn>
						</FormConfirmation>
					</Modal>
				</>
			) : (
				<p>Selecciona un token</p>
			)}
		</Card>
	);
};

export default CardToken;
