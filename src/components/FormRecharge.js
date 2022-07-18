import React from "react";
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
	&::last-child {
		height: 5rem;
	}
`;

const Label = styled.label`
	margin-top: 1rem;
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
const FormRecharge = ({ setIsOpen, modalIsOpen }) => {
	const DisplayingErrorMessagesSchema = Yup.object().shape({
		username: Yup.string()
			.matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{1,50}$/, "Digite al menos dos nombres válidos")
			.required("Este es un campo requerido"),
		numbertarget: Yup.string()
			.matches(/^[4-9]{1}[2-9]{1}[0-9]{1}[0-9]{13}$/, "No se aceptan tarjetas de débito")
			.required("Este campo es requerido"),
		cvc: Yup.string()
			.matches(/^[0-9]{3}$/, "El código debe ser de 3 digitos")
			.required("cvc es un campo requerido"),
	});
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => setIsOpen(false)}
			overlayClassName="Overlay"
			ariaHideApp={false}
			style={customStyles}
		>
			<FormContainer>
				<h1>Digite los campos de su tarjeta de crédito</h1>
				<Formik
					initialValues={{
						username: "",
						numbertarget: "",
						cvc: "",
					}}
					validationSchema={DisplayingErrorMessagesSchema}
					onSubmit={(values) => {
						setIsOpen(false);
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

							<DivInput>
								<Label>CVC: </Label>
								<Field name="cvc" className="inputFormik" />
								{touched.cvc && errors.cvc && <Labelerror>{errors.cvc}</Labelerror>}
							</DivInput>
							<DivInput>
								<Btn type="submit">Validar</Btn>
							</DivInput>
						</Form>
					)}
				</Formik>
			</FormContainer>
		</Modal>
	);
};

export default FormRecharge;
