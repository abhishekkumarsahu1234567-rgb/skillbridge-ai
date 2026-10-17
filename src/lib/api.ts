import type { AnalysisResponse, Profile } from './types'
import { demoAnalysis } from './demo'

export async function analyzeProfile(profile: Profile): Promise<AnalysisResponse> {
  // No supported OmniRush runtime is configured for this workspace. Keep this
  // path deterministic and honest instead of presenting a local heuristic as
  // agent-generated output.
  await Promise.resolve()
  return demoAnalysis(profile)
}
