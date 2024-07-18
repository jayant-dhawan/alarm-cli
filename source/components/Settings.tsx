import React from 'react';
import SelectInput from 'ink-select-input';
import {Container} from './Container.js';
import {Text} from 'ink';
import {TimeFormats} from '../constants/timeFormats.js';
import GoBackMessage from './GoBackMessage.js';

type SettingsProps = {
	timeFormat: TimeFormats;
	onTimeFormatChange: (value: TimeFormats) => void;
};
export default function Settings({
	timeFormat,
	onTimeFormatChange,
}: SettingsProps) {
	const [currentTimeFormat, setCurrentTimeFormat] = React.useState(timeFormat);
	const handleSelect = ({value}: {value: TimeFormats}) => {
		setCurrentTimeFormat(value);
		onTimeFormatChange(value);
	};

	const items = [
		{
			label: TimeFormats['12h'],
			value: TimeFormats['12h'],
		},
		{
			label: TimeFormats['24h'],
			value: TimeFormats['24h'],
		},
	];

	return (
		<Container>
			<Text>Settings</Text>
			<Text>Current Time Format: {currentTimeFormat}</Text>
			<SelectInput
				items={items}
				onSelect={handleSelect}
				initialIndex={currentTimeFormat === TimeFormats['12h'] ? 0 : 1}
			/>
			<GoBackMessage />
		</Container>
	);
}
