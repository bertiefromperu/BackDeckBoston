# Back Deck Boston — Website Rebuild

A Flask/Jinja2 rebuild of backdeckboston.com, replacing the legacy Drupal 7 site. Plain HTML/CSS/JS, no front-end framework, mobile-first.

## Running it locally

```bash
pip install -r requirements.txt
python app.py
```

Then open [http://127.0.0.1:5000](http://127.0.0.1:5000). Debug mode is on, so template/CSS/JS edits reload automatically.

## Mobile preview (no server needed)

`mobile-preview.html` is a single, self-contained file (inline CSS/JS, only Google Fonts loaded externally) that distills the homepage, menu highlights, private events and contact/hours into one scrolling page. AirDrop or text it to a phone to pitch the design before any hosting conversation — it needs no local server and no other file in this repo.

## Project structure

```
app.py                   Flask routes
templates/                Jinja2 templates (base.html = shared header/footer/nav)
static/css/style.css      Design system (colors, type, components)
static/js/scripts.js      Mobile nav, scroll-reveal, mailto-form handler
static/img/               Real photography goes here (currently empty — see below)
mobile-preview.html        Standalone single-file mobile pitch deck
```

## Before client handoff: drop in real photography

Every photo on the site is currently a styled color-gradient placeholder (via layered CSS backgrounds), so the site looks intentional even with zero images. To bring in real photography, just add JPGs to `static/img/` with these exact filenames — nothing else needs to change:

| Filename | Used for |
|---|---|
| `home-hero.jpg` | Homepage hero background |
| `charcoal-fire.jpg` | Fire / charcoal close-ups |
| `the-deck.jpg` | The deck / dining room |
| `food-grill-1.jpg` | Food close-up |
| `food-grill-2.jpg` | Food close-up |
| `cocktail.jpg` | Cocktail / bar shot |
| `team.jpg` | Team / staff photo |
| `grills.jpg` | The three grills (also used as an accent image on the homepage "Our Story" section) |
| `upper-deck.jpg` | Upper Deck event space |
| `find-us.jpg` | Exterior / street shot for the Find Us map section |
| `favicon.png` | Browser tab icon (32×32 or 64×64) |

Each image degrades gracefully to its gradient if the file is missing, so there's no rush to have all of them before a soft launch.

## Menu content

Lunch, Dinner, Brunch, Kid's and Beverage menus are built as real structured HTML (not embedded PDFs) using the actual current items and prices pulled from the live PDFs at backdeckboston.com. Each menu page keeps a "Download PDF" link to the source PDF as a secondary option. When prices or items change, edit the corresponding `templates/menu_*.html` file directly — there's no CMS or database.

## Third-party integrations (linked, not rebuilt)

- **Reservations** — OpenTable: `http://www.opentable.com/back-deck-reservations-boston?rtype=ism&restref=99712`
- **Online ordering** — Toast: `https://www.toasttab.com/back-deck-2-west-st/v3`
- **Gift cards** — Toast: `https://www.toasttab.com/back-deck-2-west-st/giftcards`

These are linked out to directly (header, footer, mobile CTA bar, and dedicated pages) rather than rebuilt in-house.

## Analytics

The existing Google Tag Manager container (`GTM-KMBPJDR`) is wired into `templates/base.html` exactly as it was on the legacy site — no new container needed.

## Responsive QA

Verified at 375px (mobile), 768px (tablet) and 1440px (desktop) widths: sticky header collapses to a hamburger + slide-in nav panel below 900px, a thumb-friendly sticky Reserve/Order bar appears below 900px, menu columns collapse from two columns to one below 860px, and all card/quicklink grids reflow from 3–4 columns down to 1–2.
