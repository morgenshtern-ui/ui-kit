import { TAvatar } from '@teleskop-labs/ui-kit-components'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/TAvatar',
  component: TAvatar,
  render: (args) => ({
    setup() {
      return () => <TAvatar {...args} />
    },
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
    },
    appearance: {
      control: 'select',
      options: ['circle', 'square'],
    },
    status: {
      control: 'select',
      options: ['approved', 'declined', 'locked', undefined],
    },
    presence: {
      control: 'select',
      options: ['online', 'busy', 'focus', 'offline', undefined],
    },
    src: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
  args: {
    size: 'medium',
    appearance: 'circle',
    isDisabled: false,
    status: undefined,
    presence: undefined,
  },
} satisfies Meta<typeof TAvatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Image: Story = {
  args: {
    src: 'https://i.pinimg.com/originals/37/19/f7/3719f73bc788e438be142cc7214df6da.jpg',
  },
}

export const Button: Story = {
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
  args: {
    src: 'https://i.pinimg.com/originals/37/19/f7/3719f73bc788e438be142cc7214df6da.jpg',
  },
}
