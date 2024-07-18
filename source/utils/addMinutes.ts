import {getTimeAndWeekday} from './getTimeAndWeekday.js';

export function addMinutes(time: string, addMinutes: number) {
	const [hours = 0, minutes = 0, weekday] = getTimeAndWeekday(time);
	let totalMinutes = hours * 60 + minutes + addMinutes;

	const newHours = Math.floor(totalMinutes / 60) % 24;
	const newMinutes = totalMinutes % 60;

	const formattedHours = newHours.toString().padStart(2, '0');
	const formattedMinutes = newMinutes.toString().padStart(2, '0');

	return [formattedHours, formattedMinutes, weekday];
}
