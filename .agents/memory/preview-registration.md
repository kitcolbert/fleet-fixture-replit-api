---
name: Preview registration
description: Distinguishes a working proxied HTML URL from a page discoverable in the Preview pane.
---

Register the bookstore HTML page in a web artifact, not only in the API artifact.

**Why:** Serving HTML from the API and taking a successful screenshot of its URL still left the user’s Preview pane showing “Nothing to preview yet.” API artifacts are not treated as previewable web apps.

**How to apply:** Keep the Express endpoints in the API artifact and present the web artifact for the page. Check artifact registration as well as the rendered URL when diagnosing an empty Preview pane.
