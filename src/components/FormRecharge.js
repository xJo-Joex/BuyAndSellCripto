import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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
	},
};

const FormContainer = styled.div`
	height: auto;
	min-height: 70vh;
	font-family: "Jost", sans-serif;
	max-width: 50rem;
	background-color: #4c249f;
	color: white;
	font-size: 1.2rem;
	padding: 1rem;
	min-width: 100%;

	@media (min-width: 570px) {
		width: 30rem;
		padding: 2rem;
	}
`;
const DivInput = styled.div`
	display: flex;
	row-gap: 1rem;
	height: 10rem;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&:last-child {
		flex-direction: row;
		justify-content: space-around;
		height: 5rem;
	}
`;

const Label = styled.label`
	/* margin-top: 1rem; */
	align-self: flex-start;
`;
const Labelerror = styled.div`
	color: #f5d033;
	height: 2rem;
	font-size: 1rem;
`;
const Btn = styled.button`
	font-family: "Poppins", sans-serif;
	color: white;
	font-size: 1rem;
	align-self: center;
	margin-top: 1rem;
	border: none;
	border-radius: 1.2rem;
	border-bottom: 0.1rem rgba(53, 240, 208, 0.5) solid;
	border-top: 0.1rem rgba(53, 240, 208, 0.5) solid;
	width: auto;
	background-color: rgba(53, 240, 208, 0.5);
	color: ${(props) => props.borderColor};
	transition: color 0.3s ease;
	padding: 1rem;
	&:hover {
		cursor: pointer;
	}
`;
const InputAmount = styled.input`
	padding: 1rem;
	font-size: 2rem;
	text-align: right;
`;
const FormRecharge = ({ setIsOpen, modalIsOpen, setBalance }) => {
	const [showPanel, setShowPanel] = useState(false);
	const DisplayingErrorMessagesSchema = Yup.object().shape({
		username: Yup.string()
			.matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{1,50}$/, "Digite al menos dos nombres válidos")
			.required("Este es un campo requerido"),
		numbertarget: Yup.string()
			.matches(
				/(^4{1}2{1}\d{1}[1-9]{1}\d{12}$)|(^[4-9]{1}[3-9]{1}\d{14}$)/,
				"16 dígitos y no se aceptan tarjetas de débito "
			)
			.required("Este campo es requerido"),
		cvc: Yup.string()
			.matches(/^[0-9]{3}$/, "El código debe ser de 3 digitos")
			.required("cvc es un campo requerido"),
		mounth: Yup.string()
			.matches(
				/^((0[7-9]{1})|10|11|12)\/(22)|(((0[1-9]{1})|10|11|12)\/([3-9]{1}[0-9]{1})|[2-9]{1,2})$/,
				"Fecha inválida"
			)
			.required("Campo requerido"),
	});
	const handleAmount = (e) => {
		e.preventDefault();
		setShowPanel(false);
		setBalance((balance) => balance + Number(e.target.amount.value));
	};
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => setIsOpen(false)}
			overlayClassName="Overlay"
			ariaHideApp={false}
			style={customStyles}
		>
			{!showPanel ? (
				<FormContainer>
					<h1>Digite los campos de su tarjeta de crédito</h1>
					<Formik
						initialValues={{
							username: "",
							numbertarget: "",
							cvc: "",
							mounth: "",
						}}
						validationSchema={DisplayingErrorMessagesSchema}
						onSubmit={(values) => {
							// setIsOpen(false);
							setShowPanel(true);
							// same shape as initial values
						}}
					>
						{({ errors, touched }) => (
							<Form>
								<DivInput>
									<Label>Nómbre del titular de la tarjeta </Label>
									<Field name="username" className="inputFormik" />
									{touched.username && errors.username && <Labelerror>{errors.username}</Labelerror>}
								</DivInput>

								<DivInput>
									<Label>Número de tarjeta: </Label>
									<Field name="numbertarget" className="inputFormik numbertarget" />
									{touched.numbertarget && errors.numbertarget && (
										<Labelerror>{errors.numbertarget}</Labelerror>
									)}
								</DivInput>

								<div className="container-input">
									<DivInput className="mounth-cvc">
										<Label>MM/AA: </Label>
										<Field name="mounth" title="fecha mala" className="inputFormi" />
										{touched.mounth && errors.mounth && <Labelerror>{errors.mounth}</Labelerror>}
									</DivInput>
									<DivInput className="mounth-cvc">
										<Label>CVC: </Label>
										<Field name="cvc" className="inputFormik " />
										{touched.cvc && errors.cvc && <Labelerror>{errors.cvc}</Labelerror>}
									</DivInput>
								</div>
								<DivInput>
									<Btn type="submit">Validar</Btn>
									<Btn onClick={() => setIsOpen(false)}>Cerrar</Btn>
								</DivInput>
							</Form>
						)}
					</Formik>
				</FormContainer>
			) : (
				<form onSubmit={handleAmount}>
					<FormContainer>
						{" "}
						<DivInput>
							<Label>Digite la cantidad a recargar</Label>{" "}
							<InputAmount
								type={"text"}
								name="amount"
								pattern="^[1-9]{1}[0-9]{1,4}"
								title="Solo puedes recargar máximo una cantidad de 5 cifras cifras y mínimo 100$"
								required
							/>
						</DivInput>
						<DivInput>
							<Btn className="bnt-recargar" type="submit">
								Recargar
							</Btn>
							<Btn lassName="bnt-recargar" onClick={() => setShowPanel(false)}>
								Cerrar
							</Btn>
						</DivInput>
					</FormContainer>
				</form>
			)}
		</Modal>
	);
};

export default FormRecharge;
