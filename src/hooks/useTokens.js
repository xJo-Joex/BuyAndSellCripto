import { useEffect, useState } from "react";
import { getListTokens } from "../FetchApi/GetData";
import styled from "styled-components";

const Label = styled.label`
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1rem;
	display: block;
	margin-bottom: 1rem;
`;

const Select = styled.select`
	border-radius: 1rem;
	padding: 1.2rem;
	margin: 2% auto;
	margin-top: 0;
	text-align: center;
	display: block;
	font-weight: 400;
	color: #444;
	line-height: 1.3;
	width: 100%;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
		linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
	background-repeat: no-repeat, repeat;
	background-position: right 0.7em top 50%, 0 0;
	background-size: 0.65em auto, 100%;
	&::-ms-expand {
		display: none;
	}
`;
const Option = styled.option`
	margin: 0 auto;
`;

const useTokens = () => {
	const [tokens, setTokens] = useState([]);
	const [selectOption, setSelectOption] = useState({ address: "", symbol: "" });
	useEffect(() => {
		getListTokens().then(setTokens);
	}, []);
	const SelectCripto = () => {
		return (
			<>
				<Label>Elige un token</Label>
				<Select
					onChange={(e) => {
						const idx = e.target.selectedIndex;
						setSelectOption({ address: e.target.value, symbol: e.target.options[idx].text.trim() });
					}}
					value={selectOption.address}
				>
					<Option disabled value="">
						Selecciona un token
					</Option>
					{tokens.map((opcion, idx) => (
						<Option value={opcion.address} key={opcion.symbol + idx}>
							{opcion.symbol} {/* -- {opcion.name} */}
						</Option>
					))}
				</Select>
			</>
		);
	};

	return [tokens, SelectCripto, selectOption];
};

export default useTokens;
