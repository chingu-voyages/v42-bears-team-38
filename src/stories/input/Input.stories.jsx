import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

import { Input } from './Input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Example/Input',
	component: Input,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		backgroundColor: { control: 'color' },
	},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = args => <Input {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	primary: true,
	label: 'Input',
	icon: <FaEnvelope />,
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Input',
	icon: <FaEnvelope />,
};

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	label: 'Input',
	icon: <FaEnvelope />,
};

export const Small = Template.bind({});
Small.args = {
	size: 'small',
	label: 'Input',
	icon: <FaEnvelope />,
};
