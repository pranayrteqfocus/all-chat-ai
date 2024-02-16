import type { Meta, StoryObj } from '@storybook/react'

import ChatLayout from './ChatLayout'

const meta: Meta<typeof ChatLayout> = {
  component: ChatLayout,
}

export default meta

type Story = StoryObj<typeof ChatLayout>

export const Primary: Story = {}
