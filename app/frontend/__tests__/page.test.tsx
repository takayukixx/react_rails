import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders the main page', () => {
    render(<Home />)
    
    // Check if the page renders without crashing
    expect(document.body).toBeInTheDocument()
  })
})