import React from 'react';
import {Container} from './Container.js';
import {Text} from 'ink';
import {UncontrolledTextInput as TextInput} from 'ink-text-input';
import GoBackMessage from './GoBackMessage.js';
import alarms from '../alarms.js';
import {validateTimeInput} from '../utils/validateTimeInput.js';

export default function SetAlarms({onAlarmSet}: {onAlarmSet: () => void}) {
	const handleSetAlarm = (input: string) => {
		if (validateTimeInput(input)) {
			alarms.setAlarm(input);
			onAlarmSet();
		}
	};
	return (
		<Container>
			<Text>Set Alarm</Text>
			<Text>{`Please enter time in format HH:MM <day of the week>:  `}</Text>
			<TextInput onSubmit={handleSetAlarm} />
			<Container>
				<Text>
					Example input: 14:50 | 12:00 Mon | 12:30 Tuesday (Time is in 24h
					format)
				</Text>
				<Text>
					Week day is optional, if not supplied it sets alarm for today
				</Text>
			</Container>
			<GoBackMessage />
		</Container>
	);
}
