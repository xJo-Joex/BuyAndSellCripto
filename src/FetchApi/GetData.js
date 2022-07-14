export const getListTokens = async () => {
	const res = await fetch("https://api.0x.org/swap/v1/tokens");
	const { records: tokens } = await res.json();
	tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
	return tokens;
};

export const getTokenByAddress = async (address) => {
	// const URI = `https://api.0x.org/swap/v1/price?sellToken=${address}&buyToken=TUSD&sellAmount=1000000000000000000`;
	const URI = `https://api.0x.org/swap/v1/quote?buyToken=${address}&sellToken=DAI&sellAmount=100000000000000000`;
	const res = await fetch(URI);

	const token = await res.json();
	return token;
};
