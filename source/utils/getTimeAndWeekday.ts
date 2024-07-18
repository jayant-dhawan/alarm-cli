const weekdayMapper: Record<string, number> = {
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6,
	sun: 7,
};

export function getTimeAndWeekday(input: string) {
	const [time, weekday] = input.trim().split(' ');
	const [hour, minute] = time!.split(':').map(Number);
	const weekdayNumber = weekday
		? weekdayMapper[weekday.toLowerCase().substring(0, 3)]
		: undefined;
	return [hour, minute, weekdayNumber];
}
