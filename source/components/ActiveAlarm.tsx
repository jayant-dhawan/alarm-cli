import React, {useEffect} from 'react';
import {Container} from './Container.js';
import {Text} from 'ink';
import alarms, {SNOOZE_COUNT} from '../alarms.js';

export default function ActiveAlarm() {
	const [activeAlarm, setActiveAlarm] = React.useState(alarms.getActiveAlarm());
	const leftSnoozeCount = SNOOZE_COUNT - (activeAlarm?.snoozeCount || 0);

	useEffect(() => {
		const handleAlarmChange = () => {
			setActiveAlarm(alarms.getActiveAlarm());
		};

		alarms.addAlarmListener(handleAlarmChange);

		return () => {
			alarms.removeAlarmListener(handleAlarmChange);
		};
	}, []);

	if (!activeAlarm) {
		return null;
	}

	return (
		<Container marginTop={1} marginLeft={1}>
			<Text>Ting Ting Ting</Text>
			<Text>
				Press <Text color={'yellowBright'}>s</Text> to snooze Alarm
			</Text>
			<Text>Snooze left: {leftSnoozeCount}</Text>
			<Text>Can only be snoozed on main menu</Text>
			{leftSnoozeCount === 0 && <Text>This alarm can not be snoozed now.</Text>}
		</Container>
	);
}
