import React from 'react';
import {Box, BoxProps} from 'ink';

type ContainerProps = {
	children: React.ReactNode;
} & BoxProps;

export function Container({children, ...restProps}: ContainerProps) {
	return (
		<Box marginTop={1} flexDirection="column" {...restProps}>
			{children}
		</Box>
	);
}
