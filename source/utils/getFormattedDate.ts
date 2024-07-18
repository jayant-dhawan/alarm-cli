export function getFormattedDate(is12Hours: boolean) {
	return new Date().toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: '2-digit',
		hour12: is12Hours,
	});
}
