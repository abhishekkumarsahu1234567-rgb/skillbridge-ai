import type { Profile } from './types'

export type ProfileErrors = Partial<Record<keyof Profile | 'skillsText', string>>

export function validateProfile(profile: Profile): ProfileErrors {
  const errors: ProfileErrors = {}
  if (!profile.skills.length) errors.skillsText = 'Add at least one current skill.'
  if (!profile.targetRole.trim()) errors.targetRole = 'Add a target career role.'
  if (!profile.experience.trim()) errors.experience = 'Choose your experience level.'
  if (!Number.isInteger(profile.weeklyHours) || profile.weeklyHours < 1 || profile.weeklyHours > 20) errors.weeklyHours = 'Choose between 1 and 20 hours.'
  return errors
}
