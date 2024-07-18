import {Text} from 'ink';
import React from 'react';
import {Container} from './Container.js';

export default function GoBackMessage() {
	return (
		<Container>
			<Text>
				Press <Text color="yellowBright">b</Text> to go back
			</Text>
		</Container>
	);
}
