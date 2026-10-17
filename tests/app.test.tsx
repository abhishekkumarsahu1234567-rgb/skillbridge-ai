import React from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'

afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('SkillBridge landing page', () => {
  it('renders the career mentor heading and profile form', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /skillbridge ai/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /make your next move feel inevitable/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /tell us where you’re headed/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generate my roadmap/i })).toBeInTheDocument()
  })

  it('accepts skills, career goal, experience, and study hours, then generates a roadmap', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('No agent configured'))
    render(<App />)

    const skills = screen.getByRole('textbox', { name: /current skills/i })
    const targetRole = screen.getByRole('textbox', { name: /target role/i })
    const experience = screen.getByRole('combobox', { name: /experience/i })
    const hours = screen.getByRole('slider', { name: /hours per week/i })

    fireEvent.change(skills, { target: { value: 'Python, SQL, User research' } })
    fireEvent.change(targetRole, { target: { value: 'Product Data Analyst' } })
    fireEvent.change(experience, { target: { value: '1–3 years' } })
    fireEvent.change(hours, { target: { value: '8' } })
    fireEvent.click(screen.getByRole('button', { name: /generate my roadmap/i }))

    expect(await screen.findByText(/local demo mode/i)).toBeInTheDocument()
    expect(screen.getByText(/product data analyst/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /six-week roadmap/i })).toBeInTheDocument()
    expect(screen.getByText(/choose your proof project/i)).toBeInTheDocument()
    expect(screen.getByText(/build technical depth/i)).toBeInTheDocument()
    expect(screen.getByText(/package your signal/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /edit my profile/i }))
    expect(screen.getByRole('textbox', { name: /current skills/i })).toHaveValue('TypeScript, React, Communication')
  })

  it('shows validation feedback instead of generating an incomplete profile', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('No agent configured'))
    render(<App />)
    fireEvent.change(screen.getByRole('textbox', { name: /current skills/i }), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: /generate my roadmap/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/at least one current skill/i))
    expect(screen.queryByRole('heading', { name: /six-week roadmap/i })).not.toBeInTheDocument()
  })
})
