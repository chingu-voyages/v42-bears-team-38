import { addDecorator } from '@storybook/react';
import { DataContext } from '../src/utils/DataContext';
import DataReducers from '../src/utils/DataReducers';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
