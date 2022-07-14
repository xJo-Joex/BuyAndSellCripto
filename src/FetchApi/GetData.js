export const getListTokens = async () => {
	const res = await fetch("https://api.0x.org/swap/v1/tokens");
	const { records: tokens } = await res.json();
	tokens.sort((a, b) =>  a.symbol.localeCompare(b.symbol));
	return tokens;
};

export const getTokenByAddress = async (address) => {
	const res = await fetch(
		`https://api.0x.org/swap/v1/price?sellToken=${address}&buyToken=TUSD&sellAmount=1000000000000000000`
	);
	const token = await res.json();
	return token;
};
