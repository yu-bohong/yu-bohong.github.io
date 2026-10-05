# Yu Bohong · Personal space

A warm personal homepage for **https://yubohong.me/**. Plain HTML, CSS and
JavaScript, hosted on GitHub Pages. No framework, build step, runtime dependency,
third-party font, analytics, or external asset request.

## Structure

- `index.html`: semantic content, navigation, verified social URLs and SEO metadata.
- `style.css`: design tokens, layouts, responsive breakpoints and motion styles.
- `main.js`: accessible mobile navigation, reveal observer and restrained parallax.
- `assets/`: optimized character artwork, favicon PNGs and the 1200 × 630 OG image.
- `assets/README.md`: artwork sources, usage rules and replacement guidance.
- `avatar.png`: the original GitHub avatar, retained in the footer.
- `CNAME` and `.nojekyll`: existing GitHub Pages configuration.

## Preview

From this directory, use any static file server. If Python is installed:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open **http://127.0.0.1:4173/**. Stop the server with `Ctrl+C`.
The page also works with JavaScript disabled; navigation and all content remain
available. Reduced-motion settings disable reveals, floating and parallax.

## Maintain

Edit biography, interests and profile links directly in `index.html`. The four
active profiles are X, YouTube, GitHub and Steam.

Use the `:root` tokens in `style.css` to adjust the palette. Layout breakpoints
are 1100px, 760px and 360px, with a wider canvas from 2200px. Character image
dimensions are intentionally limited by the official usage rules.

The Projects entry opens the actual GitHub repository list. No fictional project
or professional biography is presented.

CSS, JavaScript and SVG favicon URLs include a content-version query in
`index.html`. When changing one of those files, refresh its `?v=` value (a new
short version string or the file's SHA-256 prefix) so returning visitors receive
the update immediately instead of using their previous cached asset.

## Publish

GitHub Pages publishes the `main` branch, `/ (root)`. Commit and push the page
files to update the live site. Keep `CNAME` set to `yubohong.me`.

The existing custom domain, Dynadot A records, `www` CNAME and Enforce HTTPS
remain in place. Design updates require no DNS changes.

## Artwork

This is a personal, non-commercial fan presentation, unaffiliated with YUZUSOFT.
Character and game artwork: **© YUZUSOFT/JUNOS INC.**
See `assets/README.md` and the official guidelines before reusing any artwork.
