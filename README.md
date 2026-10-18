# SkillBridge AI — Agentic Career Mentor

SkillBridge AI is an open-source, responsive dark dashboard for turning a student's current skills and career goal into a focused learning plan. It includes a validated student profile form, skill-gap analysis, readiness summary, practical project recommendations, loading/error states, and a six-week roadmap.

## Submission status and AI boundary

This repository was inspected against the supported OmniRush.ai documentation and the current workspace configuration.

The OmniRush runtime is **not available to this project at runtime**:

- `C:\Users\abhis\omnirush.ai\opencode.jsonc` only contains the OpenCode schema reference.
- `C:\Users\abhis\omnirush.ai\.opencode\omnirush.json` contains workspace metadata and an authorized root, but no MCP server, agent workflow, provider, model, or endpoint.
- The workspace has no `opencode` executable on `PATH`.
- The current project has no authenticated Den, OAuth token, provider credential, or supported MCP client configuration.
- OmniRush.ai does not expose a public hosted Den. The supported external-client path is an authenticated remote MCP server at the `/mcp/agent` path of a self-hosted Den.

Therefore the app does **not** invent an HTTP agent API, token variable, provider variable, or fake AI result. The current roadmap path is intentionally deterministic and is labeled in the UI as **Local demo mode**. It is not AI-generated and should not be described as an OmniRush response.

When a supported OmniRush/OpenCode environment is available, the documented setup is to configure OmniRush.ai Connect in OpenCode and authenticate it there:

```json
{
  "mcp": {
    "omnirush": {
      "type": "remote",
      "enabled": true,
      "url": "https://<your-self-hosted-den-api-origin>/mcp/agent",
      "oauth": {}
    }
  }
}
```

Then authenticate with:

```bash
opencode mcp auth omnirush
```

The placeholder URL above is intentionally not a credential or a claimed working endpoint. Use the API origin of the organization's self-hosted Den. This frontend does not receive or store that OAuth token.

Documentation sources:

- `cloud/run-in-the-cloud/cloud-mcp.mdx` — gateway, self-hosted Den, OAuth, and `/mcp/agent`
- `model-context-protocol/opencode.mdx` — supported OpenCode configuration and authentication

## Requirements

- Node.js `22.14.0` (`.nvmrc`)
- npm 10+

## Setup

From the project folder:

```bash
cd /path/to/skillbridge-ai
npm ci
```

On Windows PowerShell, use:

```powershell
Set-Location C:\Users\abhis\omnirush.ai\skillbridge-ai
npm ci
```

No `.env` file is required for the deterministic demo. `.env.example` is included to make that boundary explicit; it contains no secrets and no invented application credentials.

## Run locally

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Open <http://localhost:5173/>.

## Open a project-linked OmniRush session

To start a new OmniRush session for this existing project without creating a second copy:

1. In the OmniRush desktop app, create or open a **local workspace** using this exact folder:
   `C:\Users\abhis\omnirush.ai\skillbridge-ai`
2. If using the folder picker, select the existing folder; do not choose a new child folder and do not copy the project.
3. Create a new session from that selected workspace.
4. Before doing project work, verify the session/workspace header or session metadata shows the `skillbridge-ai` workspace/path. If it still shows the parent `omnirush.ai` workspace, the session is not confirmed as project-linked.

The current session that produced this README is visibly in the `omnirush.ai` workspace, so it is **not** being claimed as project-linked to `skillbridge-ai`. The files and checks below were run directly from the exact project folder above.

The form accepts:

1. Current skills, separated by commas
2. A target career role
3. Experience level
4. Weekly study hours from 1 to 20

Selecting **Generate my roadmap** shows the deterministic local roadmap. The result includes the profile's target role in the summary and practical milestones such as a proof project, technical-depth work, and portfolio/interview packaging.

## Tests and production build

Run the complete test suite:

```bash
npm test
```

Run the typecheck and production build:

```bash
npm run build
```

For a clean Linux/macOS rebuild using the pinned runtime and lockfile:

```bash
nvm install
nvm use
npm ci
npm test
npm run build
```

The tests cover:

- Main page rendering
- SkillBridge AI brand and headings
- Skills input
- Target-role / career-goal input
- Experience selection
- Weekly-hours slider
- Roadmap generation with meaningful milestones
- Explicit local-demo labeling
- Validation for incomplete profiles
- Returning from the roadmap to edit the profile
- Pure profile validation and deterministic demo behavior

## Architecture

```text
src/main.tsx
  └── App.tsx
      ├── components/ProfileForm.tsx
      │   └── lib/profile.ts       validation
      ├── components/Analysis.tsx  roadmap and skill-gap UI
      └── lib/api.ts                explicit deterministic analysis boundary
          └── lib/demo.ts           non-AI local roadmap data
```

- `src/components/` contains the accessible UI components.
- `src/lib/profile.ts` contains profile validation.
- `src/lib/demo.ts` contains deterministic, non-AI demo guidance.
- `src/lib/api.ts` is the application analysis boundary. It currently delegates only to deterministic demo mode because no supported OmniRush runtime is available.
- `vite.config.ts` contains only the React/Vite setup and deliberately does not proxy to an undocumented external endpoint.
- `tests/` contains Vitest and Testing Library coverage.

## Limitations

- The current environment cannot invoke an OmniRush agent workflow from this web app because no supported MCP client/runtime, self-hosted Den endpoint, OAuth session, or `opencode` executable is configured.
- The local roadmap is deterministic and is clearly labeled as such.
- No user profile is persisted to a database; it exists in the current page session.
- The included UI is a Vite development/preview application. Production hosting should use a suitable static asset server or the project's deployment platform.

## Buildathon readiness

Completed locally:

- Responsive dark dashboard and accessible profile form
- Skills, target-role, experience, and weekly-hours inputs
- Validation, loading, error, and start states
- Skill-gap cards and a practical six-week roadmap
- Automated interaction and validation tests
- Pinned Node runtime, npm lockfile, Dockerfile, MIT license, and GitHub-safe ignore rules
- README setup, run, test, architecture, and limitation documentation

Not verifiable in this environment:

- An actual OmniRush agent response from the app
- OmniRush MCP/OAuth connectivity
- AI-generated roadmap content

Until a supported OmniRush/OpenCode MCP runtime is configured and tested, the application must remain in **Local demo mode** and its deterministic roadmap must not be described as AI-generated.

## Docker

```bash
docker build -t skillbridge-ai .
docker run --rm -p 5173:5173 skillbridge-ai
```

The image serves the built `dist/` output with Vite preview. It does not add or proxy any AI provider credentials.
