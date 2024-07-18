import React from 'react';
import {Container} from './Container.js';
import {Text} from 'ink';

export default function MainMenu() {
	return (
		<Container>
			<Text>Menu</Text>
			<Text>1. Set Alarm</Text>
			<Text>2. List Alarms</Text>
			<Text>3. Settings</Text>
			<Text>4. Quit</Text>
		</Container>
	);
}
