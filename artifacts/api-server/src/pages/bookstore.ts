export const bookstorePage = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f4f0e6">
  <title>Paper &amp; Spine — Neighborhood Bookshop</title>
  <style>
    :root {
      color-scheme: light;
      --paper: #f4f0e6;
      --card: #fffdf7;
      --ink: #253b35;
      --muted: #68776c;
      --line: #d8d8c9;
      --moss: #496b50;
      --moss-dark: #35533c;
      --clay: #bd6447;
      --wash: #e9eadc;
      --serif: Georgia, "Times New Roman", serif;
      --sans: "Trebuchet MS", "Gill Sans", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: var(--paper);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
    }
    button, input { font: inherit; }
    .page {
      width: min(100% - 36px, 760px);
      margin: 0 auto;
      padding: 42px 0 64px;
    }
    .masthead {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--line);
      color: var(--moss-dark);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .15em;
      text-transform: uppercase;
    }
    .mark {
      display: grid;
      width: 30px;
      height: 30px;
      place-items: center;
      border: 1px solid var(--moss);
      border-radius: 50%;
      font-family: var(--serif);
      font-size: 17px;
      letter-spacing: 0;
    }
    .intro { padding: 37px 0 28px; }
    .eyebrow {
      margin: 0 0 9px;
      color: var(--clay);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(38px, 8vw, 56px);
      font-weight: 400;
      letter-spacing: -.045em;
      line-height: 1.02;
    }
    .intro-copy {
      max-width: 490px;
      margin: 13px 0 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.6;
    }
    .shelf {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin: 12px 0 11px;
    }
    h2 {
      margin: 0;
      font-family: var(--serif);
      font-size: 24px;
      font-weight: 400;
    }
    .shelf-actions { display: flex; align-items: center; gap: 12px; }
    .count { color: var(--muted); font-size: 12px; }
    .text-button {
      padding: 7px 0;
      border: 0;
      background: transparent;
      color: var(--moss-dark);
      cursor: pointer;
      font-size: 13px;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .text-button:hover { color: var(--clay); }
    .book-list {
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--card);
    }
    .book-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      min-height: 73px;
      padding: 14px 18px;
      border-bottom: 1px solid #e8e6da;
      animation: arrive .22s ease-out both;
    }
    .book-row:last-child { border-bottom: 0; }
    .book-copy { min-width: 0; }
    .book-title {
      overflow-wrap: anywhere;
      font-family: var(--serif);
      font-size: 17px;
      line-height: 1.35;
    }
    .book-author {
      margin-top: 3px;
      color: var(--muted);
      font-size: 13px;
    }
    .delete-button {
      flex: 0 0 auto;
      padding: 7px 9px;
      border: 1px solid transparent;
      border-radius: 5px;
      background: transparent;
      color: #8d5140;
      cursor: pointer;
      font-size: 12px;
      transition: background .15s ease, border-color .15s ease;
    }
    .delete-button:hover { border-color: #e2c9bb; background: #fbf0e9; }
    .add-panel {
      margin-top: 28px;
      padding: 21px;
      border: 1px solid #d6ddcf;
      border-radius: 8px;
      background: var(--wash);
    }
    .add-heading {
      margin: 0 0 15px;
      font-family: var(--serif);
      font-size: 20px;
      font-weight: 400;
    }
    .add-form {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      align-items: end;
      gap: 12px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      color: #53665a;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    input {
      width: 100%;
      height: 41px;
      padding: 0 11px;
      border: 1px solid #c9d1c2;
      border-radius: 5px;
      outline: none;
      background: var(--card);
      color: var(--ink);
      font-size: 14px;
    }
    input:focus { border-color: var(--moss); box-shadow: 0 0 0 3px #496b5020; }
    .add-button {
      min-height: 41px;
      padding: 0 17px;
      border: 1px solid var(--moss-dark);
      border-radius: 5px;
      background: var(--moss-dark);
      color: #fffdf7;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      transition: background .15s ease, transform .15s ease;
      white-space: nowrap;
    }
    .add-button:hover:not(:disabled) { background: var(--moss); transform: translateY(-1px); }
    button:disabled { cursor: wait; opacity: .55; }
    .feedback {
      min-height: 20px;
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .feedback.error { color: #9b493c; }
    .feedback.success { color: var(--moss-dark); }
    .state {
      padding: 28px 18px;
      color: var(--muted);
      text-align: center;
      font-size: 14px;
    }
    .state strong {
      display: block;
      margin-bottom: 5px;
      color: var(--ink);
      font-family: var(--serif);
      font-size: 18px;
      font-weight: 400;
    }
    .skeleton {
      height: 73px;
      border-bottom: 1px solid #e8e6da;
      background: linear-gradient(90deg, #fffdf7 25%, #f4f0e6 50%, #fffdf7 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
    }
    .skeleton:last-child { border-bottom: 0; }
    footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid var(--line);
      color: #829083;
      font-size: 11px;
      letter-spacing: .04em;
    }
    :focus-visible { outline: 3px solid #bd644766; outline-offset: 3px; }
    @keyframes arrive { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shimmer { to { background-position: -200% 0; } }
    @media (max-width: 620px) {
      .page { width: min(100% - 28px, 500px); padding-top: 26px; }
      .intro { padding-top: 30px; }
      .add-form { grid-template-columns: 1fr; gap: 11px; }
      .add-button { width: 100%; margin-top: 2px; }
      .add-panel { padding: 17px; }
      .book-row { padding: 13px; }
      .shelf { align-items: flex-start; }
      .shelf-actions { gap: 9px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="masthead">
      <span class="mark" aria-hidden="true">P</span>
      <span>Paper &amp; Spine</span>
    </header>
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow">A little shop on Alder Street</p>
      <h1 id="page-title">The neighborhood shelf</h1>
      <p class="intro-copy">A small, well-loved list of books passing through our hands. Add a favorite; make room when it finds a new home.</p>
    </section>
    <section aria-labelledby="shelf-title">
      <div class="shelf">
        <h2 id="shelf-title">On the shelf</h2>
        <div class="shelf-actions">
          <span class="count" id="book-count" aria-live="polite"></span>
          <button class="text-button" id="refresh-button" type="button">Refresh list</button>
        </div>
      </div>
      <div class="book-list" id="book-list" aria-live="polite" aria-busy="true">
        <div class="skeleton" aria-hidden="true"></div>
        <div class="skeleton" aria-hidden="true"></div>
      </div>
    </section>
    <section class="add-panel" aria-labelledby="add-title">
      <h2 class="add-heading" id="add-title">Add to the shelf</h2>
      <form class="add-form" id="add-form">
        <div>
          <label for="title">Book title</label>
          <input id="title" name="title" type="text" maxlength="200" autocomplete="off" required>
        </div>
        <div>
          <label for="author">Author</label>
          <input id="author" name="author" type="text" maxlength="160" autocomplete="off" required>
        </div>
        <button class="add-button" id="add-button" type="submit">Add book</button>
      </form>
      <p class="feedback" id="feedback" role="status" aria-live="polite"></p>
    </section>
    <footer>Good books make good neighbors.</footer>
  </main>
  <script>
    (function () {
      "use strict";
      var list = document.getElementById("book-list");
      var count = document.getElementById("book-count");
      var feedback = document.getElementById("feedback");
      var form = document.getElementById("add-form");
      var refreshButton = document.getElementById("refresh-button");
      var addButton = document.getElementById("add-button");
      var titleInput = document.getElementById("title");
      var authorInput = document.getElementById("author");
      var busy = false;
      var books = [];

      function setFeedback(message, kind) {
        feedback.textContent = message || "";
        feedback.className = "feedback" + (kind ? " " + kind : "");
      }

      function setBusy(value) {
        busy = value;
        list.setAttribute("aria-busy", value ? "true" : "false");
        refreshButton.disabled = value;
        addButton.disabled = value;
        titleInput.disabled = value;
        authorInput.disabled = value;
        Array.prototype.forEach.call(list.querySelectorAll("button"), function (button) {
          button.disabled = value;
        });
      }

      function showLoading() {
        list.replaceChildren();
        for (var i = 0; i < 2; i += 1) {
          var skeleton = document.createElement("div");
          skeleton.className = "skeleton";
          skeleton.setAttribute("aria-hidden", "true");
          list.appendChild(skeleton);
        }
        count.textContent = "";
      }

      function showState(heading, detail, retry) {
        list.replaceChildren();
        var state = document.createElement("div");
        state.className = "state";
        var strong = document.createElement("strong");
        strong.textContent = heading;
        state.appendChild(strong);
        var message = document.createElement("span");
        message.textContent = detail;
        state.appendChild(message);
        if (retry) {
          var retryButton = document.createElement("button");
          retryButton.type = "button";
          retryButton.className = "text-button";
          retryButton.textContent = "Try again";
          retryButton.addEventListener("click", loadBooks);
          state.appendChild(document.createElement("br"));
          state.appendChild(retryButton);
        }
        list.appendChild(state);
      }

      function renderBooks(items) {
        books = items;
        list.replaceChildren();
        count.textContent = items.length + (items.length === 1 ? " book" : " books");
        if (items.length === 0) {
          showState("A little room on the shelf.", "Add the first book below.", false);
          return;
        }
        items.forEach(function (book) {
          var row = document.createElement("article");
          row.className = "book-row";
          var copy = document.createElement("div");
          copy.className = "book-copy";
          var title = document.createElement("div");
          title.className = "book-title";
          title.textContent = book.title;
          var author = document.createElement("div");
          author.className = "book-author";
          author.textContent = "by " + book.author;
          copy.appendChild(title);
          copy.appendChild(author);
          var remove = document.createElement("button");
          remove.type = "button";
          remove.className = "delete-button";
          remove.textContent = "Remove";
          remove.setAttribute("aria-label", "Remove " + book.title);
          remove.addEventListener("click", function () { deleteBook(book); });
          row.appendChild(copy);
          row.appendChild(remove);
          list.appendChild(row);
        });
      }

      async function readError(response) {
        try {
          var body = await response.json();
          if (body && typeof body.error === "string") return body.error;
        } catch (ignored) {}
        return "Something went wrong. Please try again.";
      }

      async function loadBooks(options) {
        if (busy) return false;
        var quiet = options && options.quiet;
        setBusy(true);
        if (!quiet) showLoading();
        try {
          var response = await fetch("/api/books", { headers: { "Accept": "application/json" } });
          if (!response.ok) throw new Error(await readError(response));
          var data = await response.json();
          if (!Array.isArray(data)) throw new Error("The shelf couldn't be read. Please try again.");
          renderBooks(data);
          if (quiet) setFeedback("Shelf updated.", "success");
          return true;
        } catch (error) {
          showState("The shelf is out of reach.", error.message || "Please check your connection and try again.", true);
          count.textContent = "";
          setFeedback("Couldn't load the books.", "error");
          return false;
        } finally {
          setBusy(false);
        }
      }

      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (busy || !form.reportValidity()) return;
        var title = titleInput.value.trim();
        var author = authorInput.value.trim();
        if (!title || !author) {
          setFeedback("Please enter both a title and an author.", "error");
          return;
        }
        setBusy(true);
        setFeedback("Adding to the shelf…");
        try {
          var response = await fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ title: title, author: author })
          });
          if (!response.ok) throw new Error(await readError(response));
          form.reset();
          setFeedback("Added “" + title + "” to the shelf.", "success");
          setBusy(false);
          await loadBooks({ quiet: true });
        } catch (error) {
          setFeedback(error.message || "Couldn't add that book. Please try again.", "error");
          setBusy(false);
        }
      });

      async function deleteBook(book) {
        if (busy) return;
        if (!window.confirm("Remove “" + book.title + "” from the shelf?")) return;
        setBusy(true);
        setFeedback("Removing “" + book.title + "”…");
        try {
          var response = await fetch("/api/books/" + encodeURIComponent(book.id), { method: "DELETE", headers: { "Accept": "application/json" } });
          if (!response.ok) throw new Error(await readError(response));
          setFeedback("Removed “" + book.title + "” from the shelf.", "success");
          setBusy(false);
          await loadBooks({ quiet: true });
        } catch (error) {
          setFeedback(error.message || "Couldn't remove that book. Please try again.", "error");
          setBusy(false);
        }
      }

      refreshButton.addEventListener("click", function () {
        setFeedback("");
        loadBooks();
      });
      loadBooks();
    }());
  </script>
</body>
</html>`;
