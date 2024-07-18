import React from 'react';
import {Container} from './Container.js';
import {Text} from 'ink';
import alarms from '../alarms.js';
import GoBackMessage from './GoBackMessage.js';
import TextInput from 'ink-text-input';

export default function ListAlarms() {
	const [input, setInput] = React.useState('');
	const list = alarms.list;
	const handleDelete = (input: string) => {
		const index = parseInt(input) - 1;
		if (!isNaN(index) && index >= 0 && index < list.length) {
			alarms.deleteAlarm(index);
			setInput('');
		}
	};

	return (
		<Container>
			<Text>List</Text>
			{list.map((alarm, index) => (
				<Text key={index}>
					{`${index + 1}. ${alarm.time}`}{' '}
					{alarm.inactive && <Text color={'redBright'}>(Inactive)</Text>}
				</Text>
			))}
			{list.length > 0 ? (
				<>
					<Text>Enter number to delete: </Text>
					<TextInput
						value={input}
						onChange={setInput}
						onSubmit={handleDelete}
					/>
				</>
			) : (
				<Text>No Alarms</Text>
			)}
			<GoBackMessage />
		</Container>
	);
}
