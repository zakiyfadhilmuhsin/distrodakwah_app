function nthIndex(str, pat, n) {
	let L = str.length,
		i = -1;
	while (n-- && i++ < L) {
		i = str.indexOf(pat, i);
		if (i < 0) break;
	}
	return i;
}

function plainToLinks(text) {

	// var Rexp =
	// 	/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
	// const matches = text.match(Rexp)
	// if (matches.lenhth <=0) return text;
	// let uniqueMatches = new Set([...matches]);
	// uniqueMatches = [...uniqueMatches];

	// uniqueMatches.forEach(match => {
	// 	text = text.replaceAll(match, `<a target='_blank' href="${match}">${match}</a>`)
	// })

	// return text;

	var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })

}

function currencyFormat(value) {
	let val = (value / 1).toFixed(0).replace(".", ",");
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export { nthIndex, currencyFormat, plainToLinks };
