# Cloudflare Pages previews for pull requests

The `Cloudflare Pages PR Preview` workflow builds every pull request targeting
`main`. For branches in this repository it deploys the generated `dist` folder
to the existing `pueblo-magico-web` Cloudflare Pages project.

Each pull request gets a stable Cloudflare branch named `pr-<number>`. After a
successful deployment, the workflow creates or updates one pull-request comment
containing the preview URL. Cloudflare also creates an immutable URL for each
individual deployment.

## One-time activation

1. In Cloudflare, open **My Profile > API Tokens > Create Token > Custom token**.
2. Give the token the **Account > Cloudflare Pages > Edit** permission and scope
   it to the account containing the `pueblo-magico-web` Pages project.
3. Copy the account ID from the Cloudflare dashboard.
4. In GitHub, open **Settings > Secrets and variables > Actions** for this
   repository and create these repository secrets:
   - `CLOUDFLARE_API_TOKEN`: the token from step 2.
   - `CLOUDFLARE_ACCOUNT_ID`: the account ID from step 3.
5. In **Settings > Actions > General**, keep GitHub Actions enabled. If the
   organization restricts the automatic `GITHUB_TOKEN`, allow workflows to
   create deployments and write pull-request comments. The workflow declares
   only `contents: read`, `deployments: write`, and `pull-requests: write`.
6. Re-run the `Cloudflare Pages PR Preview` workflow for the open pull request,
   or push a new commit to it.

The stable URL for pull request 7 will normally be:

`https://pr-7.pueblo-magico-web.pages.dev`

Use the URL posted by the workflow as the authoritative value, because
Cloudflare may normalize a branch alias.

## Security behavior

Pull requests from forks run the build but skip deployment. This prevents
untrusted fork code from receiving the Cloudflare credentials. A maintainer can
create an in-repository branch for a trusted external change when a preview is
required.
