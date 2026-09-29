# Prashant's personal website

The first section is **DeutschWeg**, a German course from A1 to C1 built around the Goethe-Zertifikat exams.

## Put it online with GitHub Pages (about 10 minutes, free)

1. Create a free account at github.com if you do not have one.
2. Click **New repository**. Name it `yourusername.github.io` (use your real GitHub username). Set it to Public. Create it.
3. On the repository page click **Add file → Upload files**. Unzip this folder on your laptop and drag in everything inside it (`index.html`, `README.md` and the `german` folder). Click **Commit changes**.
4. Go to **Settings → Pages**. Under "Build and deployment" choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
5. After a minute or two your site is live at `https://yourusername.github.io`. The German course is at `https://yourusername.github.io/german/`.

YouTube videos play inside the site once it is hosted like this. They did not play before because the app preview blocks embedded players.

## Use it on your phone

Open the German page in Chrome on the phone, tap the ⋮ menu and choose **Add to Home screen**. It then opens like an app.

## Keep progress in sync between laptop and phone

Progress is saved in each browser. To share it between devices:

1. On github.com go to **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**. Tick only **gist**. Set an expiry you are comfortable with. Copy the token.
2. On the laptop open DeutschWeg → Settings. Paste the token, tick "Sync automatically", click **Save and push now**. A Gist ID appears.
3. On the phone open Settings, paste the same token and that Gist ID, tick "Sync automatically", click **Pull from cloud**.

From then on the site pushes your progress a few seconds after each change and loads the newest version when it opens. Do not study on both devices at the same moment, because the newest save wins.

Also use **Download backup** in Settings once a month.

## Updating the site later

When a new level (A2, B1 ...) is ready, upload the new files into the same folders on GitHub and replace the old ones. Your progress is not affected.

## Files

- `german/js/course.js` : level map, exam formats, roadmap for A2 to C1
- `german/js/a1.js` : all A1 content (12 units + mock exam)
- `german/js/app.js` : the app itself
- `german/css/style.css` : design
