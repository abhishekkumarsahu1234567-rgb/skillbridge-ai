import type { AnalysisResponse, Profile } from './types'

type CareerTrack = {
  label: string
  project: string
  projectTask: string
  depthTitle: string
  depthDescription: string
  depthTasks: string[]
  signalTasks: string[]
}

function trackForRole(role: string): CareerTrack {
  const normalized = role.toLowerCase()
  if (/(data|analytics|scientist|sql|business intelligence)/.test(normalized)) {
    return {
      label: 'data and analytics',
      project: 'Build an analytics portfolio project',
      projectTask: 'Create a small dashboard that answers one business question',
      depthTitle: 'Strengthen your analysis toolkit',
      depthDescription: 'Practice the SQL, measurement, and communication habits that make insights actionable.',
      depthTasks: ['Complete two SQL analysis exercises', 'Explain one insight in a concise decision memo'],
      signalTasks: ['Publish the dashboard with a short methodology note', 'Practice three metric-focused interview stories'],
    }
  }
  if (/(design|ux|ui|research|creative)/.test(normalized)) {
    return {
      label: 'design and user experience',
      project: 'Create a portfolio case study',
      projectTask: 'Run a lightweight usability review and document the user problem',
      depthTitle: 'Sharpen your design practice',
      depthDescription: 'Turn research, interaction decisions, and iteration into a clear product narrative.',
      depthTasks: ['Complete one usability test with three participants', 'Create and critique two solution directions'],
      signalTasks: ['Publish the case study with before-and-after evidence', 'Practice three critique and collaboration stories'],
    }
  }
  return {
    label: 'product engineering',
    project: 'Choose your proof project',
    projectTask: 'Define the user problem and choose a small build that demonstrates your strengths',
    depthTitle: 'Build technical depth',
    depthDescription: 'Practice the core concepts that unlock your target role and turn them into visible work.',
    depthTasks: ['Complete two guided builds', 'Get feedback from one peer'],
    signalTasks: ['Publish your case study', 'Run three mock interviews'],
  }
}

export function demoAnalysis(profile: Profile): AnalysisResponse {
  const role = profile.targetRole || 'your target role'
  const track = trackForRole(role)
  const skills = profile.skills.length ? profile.skills.slice(0, 3).join(', ') : 'your current skills'
  const readiness = Math.min(88, 48 + Math.min(profile.skills.length * 4, 16) + Math.min(profile.weeklyHours * 2, 24))
  return { source: 'demo', message: 'Deterministic local demo · connect an OmniRush agent for a personalized analysis', result: {
    summary: `You are building toward ${role} in the ${track.label} track. Your starting point includes ${skills}. Build proof through one focused project and sharpen the skills that hiring teams scan for first. At ${profile.weeklyHours} hours per week, a consistent six-week sprint is realistic.`,
    readiness,
    skills: [
      { name: 'Communication', level: 82, target: 85, status: 'strong' }, { name: 'Problem solving', level: 74, target: 88, status: 'focus' }, { name: 'Technical depth', level: 58, target: 82, status: 'focus' }, { name: 'Portfolio proof', level: 36, target: 78, status: 'new' }
    ],
    roadmap: [
      { week: 'Week 1', title: track.project, description: 'Turn your experience into a small, visible case study.', tasks: [track.projectTask, 'Write a one-page project brief'], status: 'current' },
      { week: 'Weeks 2–3', title: track.depthTitle, description: track.depthDescription, tasks: track.depthTasks, status: 'upcoming' },
      { week: 'Weeks 4–6', title: 'Package your signal', description: 'Make your strengths easy for a hiring team to see.', tasks: track.signalTasks, status: 'upcoming' }
    ]
  } }
}
