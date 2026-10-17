export type Profile = { skills: string[]; targetRole: string; experience: string; weeklyHours: number }
export type Skill = { name: string; level: number; target: number; status: 'strong' | 'focus' | 'new' }
export type RoadmapStep = { week: string; title: string; description: string; tasks: string[]; status: 'complete' | 'current' | 'upcoming' }
export type MentorResult = { summary: string; readiness: number; skills: Skill[]; roadmap: RoadmapStep[] }
export type AnalysisResponse = { source: 'omnirush' | 'demo'; result: MentorResult; message?: string }
