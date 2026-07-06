# Ejikeme Okoye — Developer Portfolio

Personal portfolio website built with **HTML5**, **CSS3**, and **vanilla JavaScript**.

**Author:** Ejikeme Okoye

**Live site:** [ejike-art.github.io/ejike_developer_portfolio](https://ejike-art.github.io/ejike_developer_portfolio/)

## Structure

```
├── index.html          # Main portfolio page
├── css/
│   └── styles.css      # All styles (CSS3)
├── js/
│   └── main.js         # Navigation, scroll, animations
└── projects/           # Individual project detail pages
    ├── crenotive.html
    ├── devLinks.html
    ├── electro-ev.html
    ├── epikcart.html
    ├── property-pro.html
    └── resume-roaster.html
```

## Run locally

From the project root (the folder that contains `index.html`):

```bash
npm install
npm run dev
```

Then open **http://localhost:8080** in your browser (no trailing dot).

Keep the terminal open while developing — closing it stops the server.

Or run the helper script (uses npm if available, otherwise Python):

```bash
./start.sh
```

### Troubleshooting

- **Connection refused** — the dev server is not running. Run `npm run dev` or `./start.sh` first.
- **Port 8080 in use** — start on a different port: `npx serve . -l 3000`
- **Wrong page loads** — make sure you run the command from this folder (where `index.html` lives).

### Alternatives

```bash
# Python
python3 -m http.server 8080

# One-off without installing dependencies
npx serve . -l 8080
```

### Cursor / VS Code

Run **Tasks: Run Task → Start Dev Server** to launch the site without typing commands.

## Sections

- **Hero** — Introduction and stats
- **About** — Bio and design philosophy
- **Skills** — Tech stack
- **Experience** — Work history
- **Projects** — Selected work with detail pages
- **Contact** — Email and availability

## License

© Ejikeme Okoye. All rights reserved.


