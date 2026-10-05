# Yu Bohong · Links

A minimal personal link hub for **https://yubohong.me**, hosted on GitHub Pages.

## Edit the page

- Update the biography and social links in `index.html`.
- Replace `avatar.png` to change the avatar.
- Adjust colors and spacing in `style.css`.
- Pending social rows are deliberately non-clickable. Replace a pending row's
  `<div>` with an `<a href="https://your-profile-url" target="_blank"
  rel="me noopener noreferrer">`, remove `aria-disabled` and `pending`, and
  remove the pending label. Close the row with `</a>`.

No framework, package installation, or build step is required. GitHub Pages
should publish from the `main` branch, `/ (root)`.

## Domain

Use `yubohong.me` in Settings → Pages → Custom domain. GitHub adds a `CNAME`
file when this setting is saved. At Dynadot, point the root domain to all four
GitHub Pages A records and `www` to `yu-bohong.github.io`. Enable Enforce HTTPS
after DNS validation and certificate provisioning complete.
