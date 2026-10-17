import { useState } from 'react'
import type { Profile } from '../lib/types'
import { Icon } from './Icon'
import { validateProfile } from '../lib/profile'

type Props = { onSubmit: (profile: Profile) => void; loading: boolean }
export function ProfileForm({ onSubmit, loading }: Props) {
  const [skills, setSkills] = useState('TypeScript, React, Communication')
  const [targetRole, setTargetRole] = useState('Senior Product Engineer')
  const [experience, setExperience] = useState('3–5 years')
  const [weeklyHours, setWeeklyHours] = useState(6)
  const [error, setError] = useState('')
  function submit(e: React.FormEvent) { e.preventDefault(); const profile = { skills: skills.split(',').map(s => s.trim()).filter(Boolean), targetRole: targetRole.trim(), experience, weeklyHours }; const errors = validateProfile(profile); if (Object.keys(errors).length) { setError(Object.values(errors)[0] || 'Check your profile details.'); return } setError(''); onSubmit(profile) }
  return <form className="profile-card" onSubmit={submit}>
    <div className="card-heading"><div><span className="eyebrow">01 · Your starting point</span><h2>Tell us where you’re headed</h2><p>Give your mentor a little context. You can refine this anytime.</p></div><div className="heading-icon"><Icon name="target" /></div></div>
     <label htmlFor="skills">Current skills <span className="hint">Separate with commas</span><input id="skills" value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. SQL, Figma, Python" /></label>
     <label htmlFor="target-role">Target role<input id="target-role" value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. Product Designer" /></label>
     <div className="form-grid"><label htmlFor="experience">Experience<select id="experience" value={experience} onChange={e => setExperience(e.target.value)}><option>0–1 years</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option></select></label><label htmlFor="hours">Hours per week<div className="range-row"><input id="hours" type="range" min="1" max="20" value={weeklyHours} onChange={e => setWeeklyHours(Number(e.target.value))} /><strong>{weeklyHours}h</strong></div></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" disabled={loading}>{loading ? <><span className="spinner" /> Building your path…</> : <>Generate my roadmap <Icon name="arrow" /></>}</button>
  </form>
}
