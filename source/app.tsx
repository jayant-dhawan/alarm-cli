import React from 'react';
import CurrentDate from './components/CurrentDate.js';
import {TimeFormats} from './constants/timeFormats.js';
import {Container} from './components/Container.js';
import {useApp, useInput} from 'ink';
import {Menus} from './constants/menu.js';
import MainMenu from './components/MainMenu.js';
import Settings from './components/Settings.js';
import ListAlarms from './components/ListAlarms.js';
import SetAlarms from './components/SetAlarms.js';
import scheduler from './scheduler.js';
import ActiveAlarm from './components/ActiveAlarm.js';
import alarms from './alarms.js';

export default function App() {
	const [timeFormat, setTimeFormat] = React.useState(TimeFormats['24h']);
	const [currentMenu, setCurrentMenu] = React.useState(0);
	const handleAlarmSet = () => setCurrentMenu(Menus['MAIN']);
	const {exit} = useApp();

	useInput(input => {
		if (input.toLowerCase() === 'q') {
			scheduler.cancelAllJobs().finally(() => exit());
		}
		if (input.toLowerCase() === 'b') {
			setCurrentMenu(Menus['MAIN']);
		}
		if (currentMenu === Menus['MAIN']) {
			if (input === '1') {
				setCurrentMenu(Menus['ALARMS']);
			} else if (input === '2') {
				setCurrentMenu(Menus['LIST']);
			} else if (input === '3') {
				setCurrentMenu(Menus['SETTINGS']);
			} else if (input === '4') {
				scheduler.cancelAllJobs().finally(() => exit());
			} else if (input.toLowerCase() === 's') {
				alarms.snoozeAlarm();
			}
		}
	});

	return (
		<Container margin={0}>
			<CurrentDate timeFormat={timeFormat} />
			<ActiveAlarm />
			{currentMenu === Menus['MAIN'] && <MainMenu />}
			{currentMenu === Menus['ALARMS'] && (
				<SetAlarms onAlarmSet={handleAlarmSet} />
			)}
			{currentMenu === Menus['LIST'] && <ListAlarms />}
			{currentMenu === Menus['SETTINGS'] && (
				<Settings
					timeFormat={timeFormat}
					onTimeFormatChange={value => setTimeFormat(value)}
				/>
			)}
		</Container>
	);
}
