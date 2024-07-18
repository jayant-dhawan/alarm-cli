export function validateTimeInput(time: string) {
	const timeWithDayRegex =
		/^([01]\d|2[0-3]):([0-5]\d)( (Sun|Mon|Tue|Wed|Thu|Fri|Sat|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))?$/i;
	return timeWithDayRegex.test(time);
}
