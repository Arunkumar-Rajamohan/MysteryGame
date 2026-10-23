# MysteryBox — Case 001: The Missing Trophy

A small, original browser-based detective mystery built with plain HTML, CSS, and JavaScript. No build step, paid API, framework, or server is required.

## Run locally

1. Download and unzip the project folder.
2. Open the `MysteryBox` folder.
3. Double-click `index.html` to open it in a modern browser.
4. Click **Open the case** and start investigating.

If your browser restricts local file behavior, use VS Code with the free **Live Server** extension, or run a local server from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `index.html` — page structure and screen containers.
- `css/style.css` — cinematic noir styling and responsive layouts.
- `js/app.js` — screen rendering, buttons, and user interactions.
- `js/game.js` — case state, scoring, and local progress.
- `data/case001.js` — fictional suspects, clues, choices, and solution.
- `assets/` — reserved for future original artwork (not required by this version).

## Progress saving

The game uses browser `localStorage` to save reviewed clues and the last submitted result. This data stays in the same browser on the same device. Clearing browser data, using another browser, or using private browsing may remove or isolate it. The game works without saving if storage is unavailable.

## Publish on GitHub Pages for free

1. Sign in to GitHub and create a **public** repository, for example `mysterybox`.
2. Upload the contents of this folder (the files and folders inside `MysteryBox`, not the ZIP itself) to the repository root.
3. Open the repository's **Settings**.
4. Choose **Pages** in the sidebar.
5. Under the build/deployment source, choose **Deploy from a branch**.
6. Choose branch `main` and folder `/(root)`, then save.
7. Wait for the Pages deployment to finish. The site URL will be shown in Settings → Pages and usually follows `https://YOUR-USERNAME.github.io/mysterybox/`.

Keep the relative paths in `index.html` as they are:
- `css/style.css`
- `data/case001.js`
- `js/game.js`
- `js/app.js`

They work on GitHub Pages project URLs because they are relative paths.

## Important: make the mystery fair

The solution is Kabir. The decisive storage photograph links the trophy to the blue-marked sports trunk and shows a hand wearing Kabir's red captain's armband gripping it at 7:18 PM. The case text deliberately treats timestamps as limited evidence: Kabir's 7:24 receipt does not prove where he was earlier. Before publishing publicly, test the case with people who have not seen the solution and confirm they can infer the culprit from the clues.

## Current MVP limitations

- Single-player only; no user accounts or multiplayer rooms.
- Case content is included in JavaScript and is visible to anyone who inspects the page source. Do not use this client-side design for competitive hidden-answer contests.
- No server-side leaderboard or payment integration.
- The visual case art and typography use local CSS and system fonts. No external fonts, APIs, images, or libraries are required.
- All story and character content is original fictional material.

## Suggested next improvements

1. Add a short, optional tutorial for first-time players.
2. Add more cases after testing Case 001.
3. Add a printable/shareable result card.
4. Add keyboard-friendly clue navigation and run accessibility checks.
5. Consider a backend only if real players request accounts, cross-device sync, or multiplayer.
