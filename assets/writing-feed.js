// The Writing section reads Ghost's public RSS feed through a same-origin
// Netlify proxy. Static article cards in index.html remain as a fallback.
(() => {
  const featured = document.getElementById('featured-article');
  const recent = document.getElementById('recent-writing');
  if (!featured || !recent) return;

  const articleHost = 'notes.jasonjhonson.com';
  const mediaNamespace = 'http://search.yahoo.com/mrss/';
  const formatDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'America/Denver'
  });

  function node(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = content;
    return el;
  }

  function safeArticleUrl(raw) {
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' && url.hostname === articleHost
        ? url.href : null;
    } catch (_) {
      return null;
    }
  }

  function safeImageUrl(raw) {
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' ? url.href : null;
    } catch (_) {
      return null;
    }
  }

  function itemText(item, tag) {
    return item.getElementsByTagName(tag)[0]?.textContent?.trim() || '';
  }

  function parseFeed(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) return [];

    return Array.from(doc.getElementsByTagName('item'))
      .map((item) => {
        const url = safeArticleUrl(itemText(item, 'link'));
        const title = itemText(item, 'title');
        const description = itemText(item, 'description');
        const rawDate = itemText(item, 'pubDate');
        const date = new Date(rawDate);
        const media = item.getElementsByTagNameNS(mediaNamespace, 'content')[0];
        const image = safeImageUrl(media?.getAttribute('url'));
        const categories = Array.from(item.getElementsByTagName('category'))
          .map((category) => category.textContent.trim().toLowerCase());
        const isBuildNote = categories.some((tag) =>
          /^build[\s-]?notes?$/.test(tag)
        );

        return {
          url, title, description, image, date,
          kind: isBuildNote ? 'Build Note' : 'Essay'
        };
      })
      .filter((post) => post.url && post.title && !Number.isNaN(post.date.valueOf()))
      .sort((a, b) => b.date - a.date);
  }

  function linkedToPost(element, post) {
    element.href = post.url;
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
    return element;
  }

  function articleImage(post, className) {
    if (!post.image) return null;
    const imageLink = linkedToPost(node('a', className), post);
    const image = node('img');
    image.src = post.image;
    image.alt = 'Illustration for ' + post.title;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => imageLink.remove(), { once: true });
    imageLink.appendChild(image);
    return imageLink;
  }

  function renderFeatured(post) {
    const media = articleImage(post, 'feature-media');
    const body = node('div', 'feature-body');
    const kicker = node('div', 'article-kicker');
    kicker.append(node('span', 'eyebrow-dash'));
    kicker.append(document.createTextNode(' Latest ' + post.kind.toLowerCase() +
      ' / ' + formatDate.format(post.date)));

    const heading = node('h3');
    const headingLink = linkedToPost(node('a', 'feature-title-link', post.title), post);
    headingLink.append(node('span', 'article-arrow', ' ↗'));
    heading.append(headingLink);

    const summary = node('p', 'feature-excerpt', post.description);
    const footer = node('div', 'feature-footer');
    footer.append(linkedToPost(
      node('a', 'article-cta', 'Read ' + (post.kind === 'Essay' ? 'the essay' : 'the build note') + ' ↗'),
      post
    ));
    footer.append(node('span', 'feature-endnote', 'Published on Notes'));

    body.append(kicker, heading, summary, footer);
    featured.replaceChildren(...(media ? [media, body] : [body]));
    featured.setAttribute('aria-label', 'Latest ' + post.kind.toLowerCase());
  }

  function renderRecent(posts) {
    const cards = posts.map((post) => {
      const card = linkedToPost(node('a', 'post-card'), post);
      const thumb = post.image ? node('span', 'post-thumb') : null;
      if (thumb) {
        const image = node('img');
        image.src = post.image;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        image.addEventListener('error', () => thumb.remove(), { once: true });
        thumb.append(image);
        card.append(thumb);
      } else {
        card.classList.add('without-image');
      }

      const copy = node('span', 'post-copy');
      copy.append(node('span', 'post-meta', post.kind + ' / ' + formatDate.format(post.date)));
      copy.append(node('span', 'post-name', post.title));
      copy.append(node('span', 'post-excerpt', post.description));
      card.append(copy, node('span', 'post-arrow', '↗'));
      return card;
    });
    if (cards.length) recent.replaceChildren(...cards);
  }

  (async () => {
    try {
      const response = await fetch('/ghost-feed.xml', { cache: 'no-cache' });
      if (!response.ok) return;
      const posts = parseFeed(await response.text());
      if (!posts.length) return;
      renderFeatured(posts[0]);
      renderRecent(posts.slice(1, 4));
    } catch (_) {
      // Leave the useful, server-rendered fallback in place.
    }
  })();
})();
