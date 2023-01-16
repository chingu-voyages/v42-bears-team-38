import React from 'react';
import DataReducers from '../../utils/DataReducers';
import { Header } from './Header';

export default {
	title: 'Example/Header',
	component: Header,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
};

const Template = args => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
	user: {
		name: 'Jane Doe',
	},
};
LoggedIn.decorators = [
	Story => (
		<DataReducers>
			<Story />
		</DataReducers>
	),
];

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
LoggedOut.decorators = [
	Story => (
		<DataReducers>
			<Story />
		</DataReducers>
	),
];
