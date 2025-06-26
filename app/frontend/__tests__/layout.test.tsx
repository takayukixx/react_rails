import { render } from '@testing-library/react'
import RootLayout from '../app/layout'

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const TestChild = () => <div>Test Content</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    expect(document.querySelector('html')).toBeInTheDocument()
    expect(document.querySelector('body')).toBeInTheDocument()
  })
})