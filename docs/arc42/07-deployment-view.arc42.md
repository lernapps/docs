# Deployment View

lernapps.net runs entirely on GitHub (`con-github-means-of-production`): every repository publishes its site to its
own `gh-pages` branch, and GitHub Pages serves all of them under the one domain lernapps.net (`dec-one-domain`), each
repository at `lernapps.net/<repo>/` and the website at the root. Builds, checks and publications run on GitHub
Actions. There is no server of the platform's own; the only services outside GitHub are GoatCounter for the
platform's open counts and, for now, e-mail for thanks.

```arc42
:::diagram
id: deployment-overall
view: deployment
notation: mermaid-architecture
aliases: env_production=env-production, dn_pages_root=dn-pages-root, dn_pages_catalog=dn-pages-catalog, dn_pages_docs=dn-pages-docs, dn_pages_tooling=dn-pages-tooling, dn_pages_practice=dn-pages-practice, env_build=env-build, dn_repositories=dn-repositories, dn_actions=dn-actions, bb_website=bb-website, bb_catalog=bb-catalog, bb_docs=bb-docs, bb_tooling=bb-tooling, bb_practice=bb-practice, bb_org=bb-org, bb_app_templates=bb-app-templates
:::
```

```mermaid
architecture-beta
    group env_production(cloud)[GitHub Pages under lernapps.net]
    group dn_pages_root(server)[lernapps.net] in env_production
    group dn_pages_catalog(server)[lernapps.net/apps] in env_production
    group dn_pages_docs(server)[lernapps.net/docs] in env_production
    group dn_pages_tooling(server)[lernapps.net/tooling] in env_production
    group dn_pages_practice(server)[lernapps.net/practice] in env_production
    service bb_website(internet)[Website] in dn_pages_root
    service bb_catalog(internet)[Catalog and app copies] in dn_pages_catalog
    service bb_docs(internet)[Docs] in dn_pages_docs
    service bb_tooling(internet)[Tooling pages] in dn_pages_tooling
    service bb_practice(internet)[Practice] in dn_pages_practice
    group env_build(cloud)[GitHub]
    group dn_repositories(database)[Repositories] in env_build
    service bb_org(disk)[Organisation] in dn_repositories
    service bb_app_templates(disk)[App templates] in dn_repositories
```

## Production: GitHub Pages under lernapps.net

Every page and every app copy a person opens is served by GitHub Pages under lernapps.net. Each site lives on the
`gh-pages` branch of its repository; pull request previews live below `pr-preview/pr-<number>/` of the same branch.

```arc42
:::deployment-node
id: env-production
title: GitHub Pages under lernapps.net
type: environment
:::
```

### lernapps.net

The website at the root of the domain, from the `gh-pages` branch of lernapps.github.io.

```arc42
:::deployment-node
id: dn-pages-root
title: lernapps.net
type: server
parent: env-production
hosts: bb-website
:::
```

### lernapps.net/apps

The catalog's pages and, below `start/<id>/`, the served copy of every listed app.

```arc42
:::deployment-node
id: dn-pages-catalog
title: lernapps.net/apps
type: server
parent: env-production
hosts: bb-catalog
:::
```

### lernapps.net/docs

The pages of the platform design, the business model and this architecture.

```arc42
:::deployment-node
id: dn-pages-docs
title: lernapps.net/docs
type: server
parent: env-production
hosts: bb-docs
:::
```

### lernapps.net/tooling

The tooling's pages: guidance, rules, the prompt engineering page and the llms.txt for assistants.

```arc42
:::deployment-node
id: dn-pages-tooling
title: lernapps.net/tooling
type: server
parent: env-production
hosts: bb-tooling
:::
```

### lernapps.net/practice

The guidance for the family's assistant and the temporary apps.

```arc42
:::deployment-node
id: dn-pages-practice
title: lernapps.net/practice
type: server
parent: env-production
hosts: bb-practice
:::
```

## Build: GitHub

The repositories hold the source of every building block, including the organisation repository, and the pull
requests through which every change and every listing arrives. GitHub Actions runners build, check and publish;
they also run the tooling's actions in the app repositories, which are outside the system.

```arc42
:::deployment-node
id: env-build
title: GitHub
type: environment
:::
```

### Repositories

The source of every building block and the pull requests every change arrives through; the organisation's rules and
the app templates are used from here directly.

```arc42
:::deployment-node
id: dn-repositories
title: Repositories
type: server
parent: env-build
hosts: bb-org, bb-app-templates
:::
```

### Actions runners

The runners that build, check and publish the sites, the catalog's copies and the apps.

```arc42
:::deployment-node
id: dn-actions
title: Actions runners
type: server
parent: env-build
hosts: bb-tooling, bb-catalog
:::
```
