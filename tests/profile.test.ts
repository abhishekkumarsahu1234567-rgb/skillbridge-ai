import { describe, expect, it } from 'vitest'
import { validateProfile } from '../src/lib/profile'
import { demoAnalysis } from '../src/lib/demo'

describe('profile validation', () => {
  it('rejects an empty profile and out-of-range study time', () => {
    const errors = validateProfile({ skills: [], targetRole: '', experience: '', weeklyHours: 21 })
    expect(errors.skillsText).toBeTruthy()
    expect(errors.targetRole).toBeTruthy()
    expect(errors.weeklyHours).toBeTruthy()
  })

  it('accepts a complete profile', () => {
    expect(validateProfile({ skills: ['React'], targetRole: 'Product Engineer', experience: '1–3 years', weeklyHours: 6 })).toEqual({})
  })
})

describe('demo mode', () => {
  it('returns explicitly non-AI deterministic guidance', () => {
    const response = demoAnalysis({ skills: ['React'], targetRole: 'Product Engineer', experience: '1–3 years', weeklyHours: 6 })
    expect(response.source).toBe('demo')
    expect(response.message).toMatch(/demo/i)
  })
})
