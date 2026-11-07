# Jason Jhonson

**Live site:** https://jasonjhonson.com/

Jason Jhonson's professional home: a place to understand the work he has done, how he thinks about building companies, and what he is working on now.

## Purpose

Present Jason as an experienced business builder and operating executive whose work crosses strategy, product, marketing, sales, partnerships, and commercial leadership. The site should offer more perspective than a resume or LinkedIn profile, with firsthand work, writing, and active projects as evidence.

## Audience and role

Built for people who want to understand Jason's experience and point of view, including executives, founders, investors, recruiters, collaborators, and readers. It is the hub of a connected but distinct set of properties:

- [Notes](https://notes.jasonjhonson.com/) is the publishing home for essays and exploratory Build Notes, managed separately in Ghost.
- [Designed Scale](https://designedscale.com/) explains Jason's independent strategy and commercial advisory work.
- [LinkedIn](https://www.linkedin.com/in/jasonjhonson/) carries the full career history and helps distribute the writing.
- Linked project repositories show current software experiments, including the Relationship Agent.

## Site content

The single-page site has four main sections: **Experience**, **Focus**, **Writing**, and **Contact**. Experience gives the career through-line; Focus connects current executive/advisory work and software building; Writing features the latest Notes article plus four recent posts; Contact makes it easy to start a conversation.

Keep the voice personal and direct. The goal is to demonstrate judgment and curiosity, not turn the page into a longer CV or a sales brochure.

## Stack and deployment

- Static **HTML, CSS, and JavaScript**. No framework, package manager, database, or build command is required.
- Source is in this GitHub repository. Netlify deploys the `main` branch with publish directory `.`.
- Cloudflare manages DNS. The `notes` subdomain points separately to Ghost.
- `index.html` contains the page structure and a useful static fallback for the writing section.
- `assets/site.css` owns styling; `assets/site.js` handles navigation and small interactions.
- `assets/writing-feed.js` reads the public Ghost RSS feed through the same-origin `/ghost-feed.xml` Netlify redirect defined in `netlify.toml`. No Ghost API key is needed. If the feed fails, the article cards already in `index.html` remain visible.
- The GitHub contribution chart is a third-party image with a fallback link if unavailable.

## Integrations and connected sites

Notes content is written and published in Ghost, not in this repository. The personal homepage displays that writing automatically; links also lead visitors to Designed Scale, LinkedIn, and selected GitHub projects. Keep the roles of these sites distinct rather than duplicating their content.

## Maintenance

Edit the relevant HTML, CSS, JavaScript, or image assets, commit to `main`, and check the Netlify deployment. For visible changes, verify the desktop and mobile layouts, external links, and the Ghost writing feed. Development can be AI-assisted, but Jason makes the editorial and product decisions and reviews the published result.

Avoid committing credentials or changing DNS records casually, particularly the separate Ghost subdomain.

## Search visibility

The homepage has canonical, social, and structured identity metadata; `robots.txt` permits crawling, and `sitemap.xml` lists the homepage. The domain is verified in Google Search Console, with the sitemap submitted. See [SEO_AND_LAUNCH.md](SEO_AND_LAUNCH.md) for the original launch checklist.
