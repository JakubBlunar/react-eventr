import React from 'react'
import { Example } from '..'
import { render } from '@testing-library/react'

describe('Example Component', () => {
  it('Example renders', () => {
    const { container } = render(<Example />)

    const node = container.querySelector('button.Example')
    expect(node!.className).toEqual('Example')
  })
})
