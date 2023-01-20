import React from "react";

import { Button } from "./Button";
import { FaSearch } from "react-icons/fa";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Button",
  icon: <FaSearch />,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
  primary: false,
  icon: <FaSearch />,
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
  icon: <FaSearch />,
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
  icon: <FaSearch />,
};
