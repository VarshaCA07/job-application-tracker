import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'

function TestComponent() {
  const { user, token, login, logout } = useAuth()

  return (
    <div>
      <p data-testid="user-status">{user ? `Logged in as ${user.name}` : 'Not logged in'}</p>
      <p data-testid="token-status">{token ? 'Has token' : 'No token'}</p>
      <button onClick={() => login({ id: '1', name: 'Varsha', email: 'v@test.com' }, 'fake-token')}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  it('starts with no user logged in', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in')
    expect(screen.getByTestId('token-status')).toHaveTextContent('No token')
  })

  it('logs a user in and stores their info', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByText('Login').click()
    })

    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Varsha')
    expect(screen.getByTestId('token-status')).toHaveTextContent('Has token')
  })

  it('logs a user out and clears their info', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByText('Login').click()
    })
    await act(async () => {
      screen.getByText('Logout').click()
    })

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in')
    expect(screen.getByTestId('token-status')).toHaveTextContent('No token')
  })
})