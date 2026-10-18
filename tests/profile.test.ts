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

  it('personalizes the deterministic roadmap to the target career track', () => {
    const analytics = demoAnalysis({ skills: ['Excel', 'SQL'], targetRole: 'Product Data Analyst', experience: '1–3 years', weeklyHours: 8 })
    const designer = demoAnalysis({ skills: ['Figma'], targetRole: 'UX Designer', experience: '0–1 years', weeklyHours: 3 })

    expect(analytics.result.roadmap[0].title).toBe('Build an analytics portfolio project')
    expect(analytics.result.roadmap[1].title).toBe('Strengthen your analysis toolkit')
    expect(analytics.result.summary).toContain('Excel, SQL')
    expect(analytics.result.readiness).toBeGreaterThan(designer.result.readiness)
    expect(designer.result.roadmap[0].title).toBe('Create a portfolio case study')
    expect(designer.result.roadmap[1].title).toBe('Sharpen your design practice')
  })
})
