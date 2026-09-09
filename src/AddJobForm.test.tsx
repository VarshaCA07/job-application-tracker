import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import AddJobForm from './AddJobForm'

describe('AddJobForm', () => {
  it('renders company and role inputs', () => {
    render(<AddJobForm onAdd={vi.fn()} />)

    expect(screen.getByPlaceholderText('Company name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Role')).toBeInTheDocument()
  })

  it('calls onAdd with correct values when submitted', async () => {
    const user = userEvent.setup()
    const mockOnAdd = vi.fn()

    render(<AddJobForm onAdd={mockOnAdd} />)

    await user.type(screen.getByPlaceholderText('Company name'), 'Google')
    await user.type(screen.getByPlaceholderText('Role'), 'SWE Intern')
    await user.click(screen.getByText('Add Job'))

    expect(mockOnAdd).toHaveBeenCalledWith('Google', 'SWE Intern')
  })

  it('clears inputs after submission', async () => {
    const user = userEvent.setup()
    render(<AddJobForm onAdd={vi.fn()} />)

    const companyInput = screen.getByPlaceholderText('Company name') as HTMLInputElement
    const roleInput = screen.getByPlaceholderText('Role') as HTMLInputElement

    await user.type(companyInput, 'Amazon')
    await user.type(roleInput, 'Frontend Intern')
    await user.click(screen.getByText('Add Job'))

    expect(companyInput.value).toBe('')
    expect(roleInput.value).toBe('')
  })
})