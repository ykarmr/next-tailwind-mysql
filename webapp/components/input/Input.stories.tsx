import React, { Children } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'number',
  onChange: (e) => console.log(e.target.name),
};
