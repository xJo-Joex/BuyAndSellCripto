import React, { useState } from "react";
import Modal from "react-modal";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		height: "200px",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		backgroundColor: "white",
		boxShadow: " 1px 1px #2841dd",
	},
};

const ModalComponent = ({activeModal, infoModal}) => {
	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			overlayClassName="Overlay"
			ariaHideApp={false}
			style={customStyles}
			contentLabel="Example Modal"
		></Modal>
	);
};

export default ModalComponent;
