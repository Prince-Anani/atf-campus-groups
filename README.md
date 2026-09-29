# ATF Campus Groups

A responsive GitHub Pages directory for ATF campus and young-professional groups.

## Files

- `index.html` — main website
- `css/style.css` — complete design
- `js/app.js` — search, filters, cards and statistics
- `data/groups.json` — group information
- `campuses/` — optional place for individual campus pages
- `images/` — optional place for logos/photos

## Edit the groups

Open:

`data/groups.json`

Each group looks like:

```json
{
  "name": "ATF University of Ghana",
  "university": "University of Ghana",
  "country": "Ghana",
  "city": "Accra",
  "type": "University",
  "description": "Short description.",
  "link": "https://example.com"
}
```

Replace the sample information with your real groups and invite links.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `atf-campus-groups`.
2. Upload all files and folders from this project.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.
7. GitHub will give you a URL similar to:

`https://YOUR-USERNAME.github.io/atf-campus-groups/`

## Important

The sample links in `groups.json` are placeholders. Replace them before publishing.

This is a static website, so no database or server is required for the basic directory.
