# ThindTech Labs — Model Index

A polished, dependency-free model showcase designed for GitHub Pages.

## Run locally

Open `index.html` directly, or serve the folder with any static server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Customize the model catalog

Edit the `models` array near the top of `script.js`. Each entry supports:

- `name`
- `category` (`image-gen`, `text`, or `vision`)
- `version`
- `description`
- `tags`
- `link` — the direct Hugging Face model repository URL
- `featured` (optional)

The catalog currently uses the repository pattern `https://huggingface.co/ThindTechLabs/<model-slug>`. Replace the slugs with the exact repository names if your Hugging Face organization uses different names.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the branch and `/ (root)` folder.
4. Save. GitHub Pages will serve `index.html` as the site entry point.

The site uses only relative asset paths, so it works with project pages hosted below a repository path as well as custom domains.
