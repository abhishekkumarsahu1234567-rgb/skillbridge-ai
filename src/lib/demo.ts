import type { AnalysisResponse, Profile } from './types'

export function demoAnalysis(profile: Profile): AnalysisResponse {
  const role = profile.targetRole || 'your target role'
  return { source: 'demo', message: 'Deterministic local demo · connect an OmniRush agent for a personalized analysis', result: {
    summary: `You have a strong foundation for ${role}. Build proof through one focused project and sharpen the skills that hiring teams scan for first. At ${profile.weeklyHours} hours per week, a consistent six-week sprint is realistic.`,
    readiness: 64,
    skills: [
      { name: 'Communication', level: 82, target: 85, status: 'strong' }, { name: 'Problem solving', level: 74, target: 88, status: 'focus' }, { name: 'Technical depth', level: 58, target: 82, status: 'focus' }, { name: 'Portfolio proof', level: 36, target: 78, status: 'new' }
    ],
    roadmap: [
      { week: 'Week 1', title: 'Choose your proof project', description: 'Turn your experience into a small, visible case study.', tasks: ['Define the user problem', 'Write a one-page project brief'], status: 'current' },
      { week: 'Weeks 2–3', title: 'Build technical depth', description: 'Practice the core concepts that unlock your target role.', tasks: ['Complete two guided builds', 'Get feedback from one peer'], status: 'upcoming' },
      { week: 'Weeks 4–6', title: 'Package your signal', description: 'Make your strengths easy for a hiring team to see.', tasks: ['Publish your case study', 'Run three mock interviews'], status: 'upcoming' }
    ]
  } }
}
