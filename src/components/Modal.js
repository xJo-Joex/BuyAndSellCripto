import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		height: "auto",
		width: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "2rem",
		border: "none",
		padding: "0",
		backgroundColor: "white",
		// boxShadow: " 1px 1px #2841dd",
	},
};

const FormConfirmation = styled.form`
	display: flex;
	height: 25rem;
	background-color: #4c249f;
	color: white;
	font-family: "Open Sans", sans-serif;
	width: 100%;
	padding: 1rem;
	border: none;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	@media (min-width: 570px) {
		/* min-width: 400px; */

		font-size: 1rem;
	}
`;
const ContainerBtn = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;
const Btn = styled.button`
	padding: 1rem;
	font-family: "Poppins", sans-serif;
	color: white;
	font-size: 1rem;
	border: none;
	border-radius: 1.2rem;
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
		font-size: 1.5rem;
	}
`;
const ModalComponent = ({ modalIsOpen, infoModal, setIsOpen }) => {
	return (
		<div className="animate__animated animate__zoomIn animate__delay-2s animate__fadeOut">
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setIsOpen(false)}
				overlayClassName="Overlay"
				ariaHideApp={false}
				style={customStyles}
			>
				<FormConfirmation>
					<h2>
						{infoModal.numberFavorites < 4 && !infoModal.value
							? infoModal.msg
							: "¿Estás seguro de realizar esta acción?"}
					</h2>
					<ContainerBtn>
						<Btn backgroundColor={"#4c249f"} onClick={() => setIsOpen(!modalIsOpen)}>
							Cerrar
						</Btn>
						{/* <Btn backgroundColor={"rgba(53, 240, 208, 1)"} onClick={() => setIsOpen(!modalIsOpen)}>
						Cancelar
					</Btn> */}
					</ContainerBtn>
				</FormConfirmation>
			</Modal>
		</div>
	);
};

export default ModalComponent;
