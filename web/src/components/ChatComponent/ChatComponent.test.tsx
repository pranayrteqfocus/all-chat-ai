import { render } from '@redwoodjs/testing/web'

import ChatComponent from './ChatComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatComponent />)
    }).not.toThrow()
  })
})
