# LINE ZERO — Beyond Shapes

A static, GitHub-Pages-ready prototype for Line Zero Studio.

## What is included
- `index.html` — complete single-page site
- `css/style.css` — visual system and responsive layout
- `js/main.js` — lightweight Three.js hero interaction + portfolio filters/modal
- `assets/models/showcase.glb` — place your own GLB here
- `assets/images/` — place project images here

## Why this architecture
It uses plain HTML/CSS/JavaScript, so there is no build step required. GitHub Pages can publish
static HTML, CSS and JavaScript directly from a repository.

The site uses CDN imports for:
- Three.js
- `<model-viewer>`

For production, pin versions and consider self-hosting critical libraries if desired.

## Add your first real 3D model
1. Put a GLB file at:
   `assets/models/showcase.glb`
2. Refresh the site.
3. The interactive viewer will load it automatically.

## Add real portfolio projects
Replace the four placeholder project cards in `index.html` with your real projects.
For each project, you can later create:
`projects/project-name/index.html`
and link the card to that page.

Recommended project case-study structure:
- Hero render
- Interactive GLB
- Brief
- Challenge
- Modeling / texturing process
- Materials / surfaces
- Technical specifications
- Final renders
- Animation/video
- CTA

## GitHub Pages
Create a public repository, upload these files, then go to:
Settings → Pages → Deploy from a branch → main → / (root) → Save.

Your site will be available at the GitHub Pages address shown by GitHub.

## Important
GitHub Pages is static hosting. It is excellent for a portfolio, but GitHub's current documentation
says Pages is not intended to be used as free web hosting for an online business/e-commerce site
primarily facilitating commercial transactions. Keep the Line Zero site as a portfolio/lead-generation
presence and use a suitable service for transactional functionality if you later need it.
