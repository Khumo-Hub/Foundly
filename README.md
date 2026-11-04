# Foundly — Discover Independent, Shop Local

**Foundly** is a Gauteng-first marketplace concept built to help South African small businesses get discovered. This repository contains an interactive, responsive **frontend prototype** of the marketplace.

**Live preview:** [foundly.kabelolomko.chatgpt.site](https://foundly.kabelolomko.chatgpt.site/)

> **Project status:** Frontend demo. Product listings, sellers and prices are illustrative. The site does not accept real seller registrations, orders or payments.

## What the project demonstrates

- A distinctive marketplace brand and responsive storefront with an editorial look and feel.
- Three launch categories: fashion and accessories, homeware and décor, and beauty accessories.
- A searchable, filterable sample catalogue with individual product photographs.
- Sample seller profiles, product quick views, favourites and a demonstration shopping bag.
- A seller-first landing page with client-side form validation (no submission or data storage).
- Supporting pages for the company story, FAQs, contact, delivery/returns, terms and privacy.
- Fast internal navigation through vanilla JavaScript route prefetching, while retaining direct-accessible HTML pages.

## Technology

| Layer | Implementation |
| --- | --- |
| Structure | HTML5, semantic page markup |
| Styles | CSS3, responsive layouts and accessible focus states |
| Behaviour | Modern vanilla JavaScript (ES6 modules) |
| Product data | A single local JavaScript data module |
| Images | Optimised WebP assets |
| Build tools | None — no React, npm, or CSS framework |

## Run locally

The website is static. Serve the repository from any local HTTP server to support JavaScript modules and page prefetching:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

You can also upload all files at the repository root directly to the `public_html` folder of a standard static host.

## Project structure

```text
index.html         Home
shop.html          Sample product catalogue
sellers.html       Sample seller directory
sell.html          Seller-first landing page
story.html         Brand story
faq.html           Frequently asked questions
contact.html       Contact information
returns.html       Draft delivery and returns guidance
terms.html         Draft website terms
privacy.html       Draft privacy notice
assets/css/        Styles
assets/js/         Interactions and sample product data
assets/images/     Product and editorial imagery
assets/icons/      Brand favicon
```

## Next steps toward a live marketplace

1. Secure accounts, seller verification and product management.
2. Backend database and administrative review tools.
3. Stock tracking, order workflows and fulfilment integration.
4. Payment provider integration, marketplace commissions, refunds and settlements.
5. Final consumer policies, POPIA controls, security testing and controlled Gauteng pilot.

## Development approach

Foundly is an iterative, AI-assisted product prototype developed through business-model discovery, design feedback, frontend implementation and user-experience testing. The focus is on balancing visual quality with accessibility, speed and clear marketplace journeys.

---

**Note for reviewers:** The interactive features in this repository demonstrate the intended user experience; they should not be mistaken for completed financial, account or fulfilment integrations.
