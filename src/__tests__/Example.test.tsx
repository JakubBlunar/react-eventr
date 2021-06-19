import React from 'react'
import { Example } from '../../examples/Example'
import { render } from '@testing-library/react'

describe('Example Component', () => {
  it('Example renders', () => {
    const { container } = render(<Example />)

    const node = container.querySelector('button')
    expect(node).toBeDefined()
  })
})
