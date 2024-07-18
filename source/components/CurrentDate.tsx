import {Text} from 'ink';
import React from 'react';
import {getFormattedDate} from '../utils/getFormattedDate.js';
import {TimeFormats} from '../constants/timeFormats.js';

export default function CurrentDate({timeFormat}: {timeFormat: TimeFormats}) {
	const [date, setDate] = React.useState(
		getFormattedDate(timeFormat === TimeFormats['12h']),
	);
	React.useEffect(() => {
		const interval = setInterval(() => {
			setDate(getFormattedDate(timeFormat === TimeFormats['12h']));
		}, 1000);
		return () => clearInterval(interval);
	}, [timeFormat]);
	return <Text color={'greenBright'}>{date}</Text>;
}
