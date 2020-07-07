function nthIndex(str, pat, n) {
	let L = str.length,
		i = -1;
	while (n-- && i++ < L) {
		i = str.indexOf(pat, i);
		if (i < 0) break;
	}
	return i;
}

function currencyFormat(value) {
	let val = (value / 1).toFixed(0).replace(".", ",");
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export { nthIndex, currencyFormat };
