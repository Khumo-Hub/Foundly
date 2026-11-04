import { categories, products, stores, rand, storeFor } from './data.js';

// A fully local, interactive visual preview. No network requests, payments,
// real seller registration or transaction processing are performed here.
const page = document.body.dataset.page || 'home';
const paths = { home: 'index.html', shop: 'shop.html', sellers: 'sellers.html', story: 'story.html', sell: 'sell.html' };
const icon = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="7.1"/><path d="m16 16 5 5"/></svg>',
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16l-1.2 13H5.2L4 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
};

const header = document.querySelector('#site-header');
const footer = document.querySelector('#site-footer');
const overlayRoot = document.querySelector('#site-overlays');
const current = (key) => page === key ? ' aria-current="page"' : '';
header.innerHTML = `
  <div class="preview-ribbon"><b>FOUNDLY PREVIEW</b> Explore the design · Sample listings only · Payments are not live</div>
  <header class="site-header">
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="wordmark" href="index.html" aria-label="Foundly home">foundly<span>.</span></a>
      <div class="nav-links"><a href="shop.html"${current('shop')}>Shop the finds</a><a href="sellers.html"${current('sellers')}>Meet the stores</a><a href="story.html"${current('story')}>Our story</a><a href="sell.html"${current('sell')}>For sellers</a></div>
      <div class="nav-actions"><button class="nav-action" type="button" data-action="search" aria-label="Search products">${icon.search}</button><button class="nav-action" type="button" data-action="cart" aria-label="Open demo shopping bag">${icon.bag}<span class="bag-count" id="bag-count" hidden>0</span></button><a class="nav-cta" href="sell.html">Open your shop ↗</a><button class="nav-action menu-toggle" type="button" data-action="menu" aria-label="Open menu" aria-expanded="false">${icon.menu}</button></div>
    </nav>
    <div class="mobile-menu" id="mobile-menu"><a href="shop.html">Shop the finds</a><a href="sellers.html">Meet the stores</a><a href="story.html">Our story</a><a href="sell.html">Open your shop ↗</a></div>
  </header>`;
footer.innerHTML = `
  <footer class="site-footer"><div class="footer-inner">
    <div class="footer-topline"><p>Good things happen<br>when we <em>find each other.</em></p><a href="sell.html" class="footer-toplink">Grow with Foundly <span>↗</span></a></div>
    <div class="footer-upper">
      <div class="footer-brand"><a href="index.html" class="wordmark">foundly<span>.</span></a><p>Great businesses deserve to be found. A new way to discover independent, thoughtfully made for South Africa.</p><small>Gauteng first. South Africa next.</small></div>
      <nav class="footer-column" aria-label="Explore"><h3>EXPLORE</h3><a href="shop.html">Shop all finds</a><a href="shop.html?category=fashion">Fashion & accessories</a><a href="shop.html?category=home">Homeware & décor</a><a href="shop.html?category=beauty">Beauty accessories</a></nav>
      <nav class="footer-column" aria-label="Company and sellers"><h3>FOUNDLY</h3><a href="sellers.html">Meet the stores</a><a href="sell.html">Become a seller</a><a href="story.html">Our story</a></nav>
      <nav class="footer-column" aria-label="Help and support"><h3>HELP & SUPPORT</h3><a href="faq.html">FAQs</a><a href="returns.html">Delivery & returns</a><a href="contact.html">Contact & support</a></nav>
      <nav class="footer-column" aria-label="Legal information"><h3>THE FINE PRINT</h3><a href="terms.html">Terms & conditions</a><a href="privacy.html">Privacy notice</a><span>Policies are drafts for review.</span></nav>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Foundly. A concept marketplace. No live sales or applications.</span><span>Independent by nature. Found together. ✳</span></div>
  </div></footer>`;

const getSession = (key, fallback) => { try { return JSON.parse(sessionStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let cart = getSession('foundly-demo-bag', []);
let favorites = getSession('foundly-demo-favorites', []);
const saveSession = () => { try { sessionStorage.setItem('foundly-demo-bag', JSON.stringify(cart)); sessionStorage.setItem('foundly-demo-favorites', JSON.stringify(favorites)); } catch { /* storage optional */ } };
const bagCount = document.querySelector('#bag-count');
const updateBagCount = () => { bagCount.textContent = String(cart.length); bagCount.hidden = cart.length === 0; };
updateBagCount();

let toastTimer;
const toast = (message) => {
  let notice = document.querySelector('.notification');
  if (!notice) { notice = document.createElement('div'); notice.className = 'notification'; notice.setAttribute('role', 'status'); document.body.appendChild(notice); }
  notice.textContent = message;
  notice.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => notice.classList.remove('show'), 3700);
};

const productMarkup = (product, index = 0) => {
  const seller = storeFor(product.store);
  return `<article class="product-card" data-product="${product.id}"><div class="product-image"><img src="${product.image}" alt="Illustrative photograph for ${product.name}" loading="lazy" style="object-position:${index % 3 === 0 ? '50% 30%' : index % 3 === 1 ? '65% 55%' : '35% 70%'}"><span class="product-label"${product.tag ? '' : ' hidden'}>${product.tag}</span><button class="wish-button ${favorites.includes(product.id) ? 'is-saved' : ''}" type="button" data-favorite="${product.id}" aria-label="${favorites.includes(product.id) ? 'Remove' : 'Save'} ${product.name} ${favorites.includes(product.id) ? 'from' : 'to'} favourites" aria-pressed="${favorites.includes(product.id)}">${favorites.includes(product.id) ? '♥' : '♡'}</button><button type="button" class="product-quick" data-quick="${product.id}" aria-label="Quick view ${product.name}">Explore this find ↗</button></div><div class="product-details"><div><h3>${product.name}</h3><p>${seller.name} · Preview store</p></div><span class="product-price">${rand(product.price)}</span></div></article>`;
};

// Re-run this small setup only for the page being shown. It is also used by
// the instant-navigation layer when a new <main> is swapped into the document.
const mountPage = () => {
  const featured = document.querySelector('#featured-products');
  if (featured) featured.innerHTML = [products[0], products[3], products[6], products[1]].map(productMarkup).join('');

  // Catalogue filtering, query state, and URL-deep-linkable category filters.
  const shopGrid = document.querySelector('#shop-products');
  let activeCategory = new URLSearchParams(location.search).get('category') || 'all';
  if (!['all', ...categories.map((c) => c.id)].includes(activeCategory)) activeCategory = 'all';
  const shopSearch = document.querySelector('#shop-search');
  const filterHost = document.querySelector('#category-filters');
  const renderShop = () => {
    if (!shopGrid) return;
    const term = shopSearch.value.toLocaleLowerCase('en-ZA').trim();
    const matching = products.filter((p) => (activeCategory === 'all' || p.category === activeCategory) && [p.name, p.description, storeFor(p.store).name, categories.find(c => c.id === p.category).name].join(' ').toLocaleLowerCase('en-ZA').includes(term));
    shopGrid.innerHTML = matching.map(productMarkup).join('');
    document.querySelector('#results-count').textContent = `${matching.length} ${matching.length === 1 ? 'find' : 'finds'}`;
    document.querySelector('#empty-results').hidden = matching.length !== 0;
    filterHost.innerHTML = [{ id: 'all', short: 'All finds' }, ...categories].map((c) => `<button class="filter-tab" type="button" data-filter="${c.id}" aria-pressed="${activeCategory === c.id}">${c.short}</button>`).join('');
  };
  if (shopGrid) {
    renderShop();
    shopSearch.addEventListener('input', renderShop);
    filterHost.addEventListener('click', (event) => {
      const filter = event.target.closest('[data-filter]');
      if (!filter) return;
      activeCategory = filter.dataset.filter;
      const next = new URL(location.href);
      if (activeCategory === 'all') next.searchParams.delete('category'); else next.searchParams.set('category', activeCategory);
      history.replaceState({}, '', `${next.pathname}${next.search}`);
      renderShop();
    });
    document.querySelector('#clear-filters').addEventListener('click', () => { activeCategory = 'all'; shopSearch.value = ''; history.replaceState({}, '', location.pathname); renderShop(); });
  }

  const sellerGrid = document.querySelector('#seller-grid');
  if (sellerGrid) sellerGrid.innerHTML = stores.map((seller) => `<article class="seller-tile"><div class="seller-tile-image"><img src="${seller.image}" loading="lazy" alt="Illustrative products for ${seller.name} concept store"><div class="store-initials">${seller.initials}</div></div><div class="seller-tile-content"><span class="store-location">${seller.location} / Preview store</span><h2>${seller.name}</h2><p>${seller.intro}</p><a href="shop.html?category=${products.find((p) => p.store === seller.id).category}">Explore sample products ↗</a></div></article>`).join('');

  const sellerForm = document.querySelector('#seller-form');
  if (sellerForm) sellerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...sellerForm.querySelectorAll('input[required],select[required]')];
    fields.forEach((field) => field.setAttribute('aria-invalid', String(!field.checkValidity())));
    const firstInvalid = fields.find((field) => !field.checkValidity());
    const result = document.querySelector('#seller-form-result');
    if (firstInvalid) { result.hidden = false; result.textContent = 'Please complete the highlighted fields with valid information to preview the form.'; firstInvalid.focus(); return; }
    result.hidden = false;
    result.textContent = 'Beautiful! This is how the seller-interest confirmation could appear. Nothing was sent or saved; live applications will open only after secure processing is implemented.';
    sellerForm.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
  });
};

// Dialog layer, with an accessible focus escape and ESC/backdrop close.
let activeDialog = null;
let previouslyFocused = null;
const closeOverlay = () => {
  if (!activeDialog) return;
  const { backdrop, panel } = activeDialog;
  backdrop.classList.remove('is-open'); panel.classList.remove('is-open');
  const old = activeDialog;
  activeDialog = null;
  document.body.classList.remove('overlay-open');
  setTimeout(() => { old.backdrop.remove(); old.panel.remove(); }, 260);
  previouslyFocused?.focus?.();
};
const openOverlay = (kind, inner, className) => {
  if (activeDialog) closeOverlay();
  previouslyFocused = document.activeElement;
  const backdrop = document.createElement('div'); backdrop.className = 'overlay-backdrop';
  const panel = document.createElement('section'); panel.className = `dialog ${className}`; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', kind); panel.innerHTML = `<button class="close-dialog" type="button" data-close aria-label="Close dialog">×</button>${inner}`;
  overlayRoot.append(backdrop, panel);
  activeDialog = { backdrop, panel };
  document.body.classList.add('overlay-open');
  backdrop.addEventListener('click', closeOverlay);
  panel.querySelector('[data-close]').addEventListener('click', closeOverlay);
  requestAnimationFrame(() => { backdrop.classList.add('is-open'); panel.classList.add('is-open'); panel.querySelector('[data-close]').focus(); });
  return panel;
};
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeOverlay(); document.querySelector('#mobile-menu')?.classList.remove('is-open'); document.querySelector('[data-action=menu]')?.setAttribute('aria-expanded', 'false'); }
  if (event.key === 'Tab' && activeDialog) {
    const focusable = [...activeDialog.panel.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const openQuickView = (id) => {
  const p = products.find((item) => item.id === id);
  if (!p) return;
  const seller = storeFor(p.store);
  const panel = openOverlay(p.name, `<div class="quick-image"><img src="${p.image}" alt="Illustrative visual of ${p.name}"></div><div class="quick-content"><span class="kicker">THE FOUNDLY EDIT / SAMPLE FIND</span><h2>${p.name}</h2><div class="price">${rand(p.price)}</div><p>${p.description}</p><div class="quick-store">A concept find by <b>${seller.name}</b> · ${seller.location}</div><button class="button button-primary button-full" type="button" data-add="${p.id}">Add to demo bag <span>↗</span></button><p class="form-note">This is a product design preview. You cannot purchase this item.</p></div>`, 'quick-dialog');
  panel.querySelector('[data-add]').addEventListener('click', () => { cart.push(p.id); saveSession(); updateBagCount(); closeOverlay(); toast(`${p.name} added to your demo bag. Checkout is not live.`); });
};

const openCart = () => {
  const unique = [...new Set(cart)];
  const itemRows = unique.map((id) => {
    const p = products.find((x) => x.id === id);
    if (!p) return '';
    const qty = cart.filter((x) => x === id).length;
    return `<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>Quantity ${qty} · Concept item</p><button type="button" data-remove="${p.id}">Remove item</button></div><strong>${rand(p.price * qty)}</strong></div>`;
  }).join('');
  const total = cart.reduce((sum, id) => sum + (products.find((p) => p.id === id)?.price || 0), 0);
  const content = `<span class="kicker">FOUNDLY / DEMO ONLY</span><h2>Your bag<span style="color:var(--coral)">.</span></h2><p class="cart-note">A look at the shopping experience. These are sample items and cannot be ordered.</p>${cart.length ? `${itemRows}<div class="cart-summary"><span>Illustrative subtotal</span><span>${rand(total)}</span></div><button class="button checkout-disabled" type="button" disabled>Checkout coming soon ↗</button><p class="form-note">Payments are disabled until the secure marketplace backend and payment integration have been approved.</p>` : `<div class="cart-empty"><div class="empty-icon">✳</div><h3>Room for discovery.</h3><p>Your demo bag is feeling a little empty.</p><a class="button button-primary" href="shop.html">Explore finds ↗</a></div>`}`;
  const panel = openOverlay('Demo shopping bag', content, 'cart-dialog');
  panel.addEventListener('click', (event) => { const remove = event.target.closest('[data-remove]'); if (!remove) return; cart = cart.filter((id) => id !== remove.dataset.remove); saveSession(); updateBagCount(); closeOverlay(); openCart(); });
};

const searchMatches = (term) => products.filter((p) => [p.name, p.description, storeFor(p.store).name].join(' ').toLowerCase().includes(term.toLowerCase())).slice(0, 5);
const openSearch = () => {
  const panel = openOverlay('Search Foundly', `<h2>What are you looking for<em>?</em></h2><label class="sr-only" for="global-search">Search products</label><input type="search" id="global-search" placeholder="Try 'bag', 'vase', 'beauty'..." autocomplete="off"><p>Discover the sample product catalogue.</p><div class="search-results" id="global-results"></div>`, 'search-dialog');
  const input = panel.querySelector('input');
  const results = panel.querySelector('#global-results');
  const update = () => { const term = input.value.trim(); results.innerHTML = term ? searchMatches(term).map((p) => `<button type="button" class="search-result" data-result="${p.id}"><img src="${p.image}" alt=""><span><strong>${p.name}</strong><small>${storeFor(p.store).name}</small></span><span>↗</span></button>`).join('') || '<p>No sample products match yet.</p>' : ''; };
  input.addEventListener('input', update);
  results.addEventListener('click', (e) => { const chosen = e.target.closest('[data-result]'); if (chosen) { closeOverlay(); setTimeout(() => openQuickView(chosen.dataset.result), 290); } });
  setTimeout(() => input.focus(), 40);
};

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action],[data-quick],[data-favorite]');
  if (!button) return;
  if (button.dataset.quick) { openQuickView(button.dataset.quick); return; }
  if (button.dataset.favorite) {
    const id = button.dataset.favorite;
    favorites = favorites.includes(id) ? favorites.filter((p) => p !== id) : [...favorites, id];
    saveSession();
    document.querySelectorAll(`[data-favorite="${id}"]`).forEach((b) => { const saved = favorites.includes(id); b.classList.toggle('is-saved', saved); b.setAttribute('aria-pressed', String(saved)); b.textContent = saved ? '♥' : '♡'; b.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} favourite`); });
    toast(favorites.includes(id) ? 'Saved to your demo favourites.' : 'Removed from demo favourites.');
    return;
  }
  if (button.dataset.action === 'search') openSearch();
  else if (button.dataset.action === 'cart') openCart();
  else if (button.dataset.action === 'menu') { const menu = document.querySelector('#mobile-menu'); const expanded = menu.classList.toggle('is-open'); button.setAttribute('aria-expanded', String(expanded)); button.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu'); }
  else if (button.dataset.action === 'unavailable-email') { event.preventDefault(); toast('Contact details will be activated for the real launch.'); }
});

// Keep the shared header, footer, fonts and JavaScript alive between local
// pages. Full static HTML pages remain available for direct visits and SEO.
const routeNames = ['index.html', 'shop.html', 'sellers.html', 'story.html', 'sell.html', 'faq.html', 'returns.html', 'contact.html', 'terms.html', 'privacy.html'];
const routeCache = new Map();
const pendingRoutes = new Map();
const scrollPositions = new Map();
let currentNavigation = 0;

const routePath = (url) => new URL(url, location.href).pathname;
const routeName = (url) => routePath(url).split('/').pop() || 'index.html';
const canNavigateLocally = (url) => url.origin === location.origin && routeNames.includes(routeName(url));

const parseRoute = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const main = doc.querySelector('main');
  if (!main) throw new Error('Missing main content');
  return {
    markup: main.outerHTML,
    page: doc.body.dataset.page || 'home',
    title: doc.title,
    description: doc.querySelector('meta[name="description"]')?.content || '',
    robots: doc.querySelector('meta[name="robots"]')?.content || '',
    ogTitle: doc.querySelector('meta[property="og:title"]')?.content || doc.title,
  };
};

const rememberCurrentPage = () => {
  routeCache.set(location.pathname, {
    markup: document.querySelector('main').outerHTML,
    page: document.body.dataset.page || 'home',
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    robots: document.querySelector('meta[name="robots"]')?.content || '',
    ogTitle: document.querySelector('meta[property="og:title"]')?.content || document.title,
  });
};

const prefetchRoute = (url) => {
  const target = new URL(url, location.href);
  if (!canNavigateLocally(target)) return Promise.reject(new Error('Not a Foundly page'));
  const key = target.pathname;
  if (routeCache.has(key)) return Promise.resolve(routeCache.get(key));
  if (pendingRoutes.has(key)) return pendingRoutes.get(key);
  const request = fetch(target.pathname, { credentials: 'same-origin' })
    .then((response) => { if (!response.ok) throw new Error(`Page unavailable: ${response.status}`); return response.text(); })
    .then(parseRoute)
    .then((route) => { routeCache.set(key, route); return route; })
    .finally(() => pendingRoutes.delete(key));
  pendingRoutes.set(key, request);
  return request;
};

const progressBar = document.createElement('div');
progressBar.className = 'route-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.append(progressBar);
const setProgress = (visible) => progressBar.classList.toggle('is-active', visible);

const updatePageMetadata = (route) => {
  document.title = route.title;
  document.body.dataset.page = route.page;
  const updateMeta = (selector, attribute, value, name, kind = 'name') => {
    let meta = document.querySelector(selector);
    if (!value) { meta?.remove(); return; }
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute(kind, name); document.head.append(meta); }
    meta.setAttribute(attribute, value);
  };
  updateMeta('meta[name="description"]', 'content', route.description, 'description');
  updateMeta('meta[name="robots"]', 'content', route.robots, 'robots');
  updateMeta('meta[property="og:title"]', 'content', route.ogTitle, 'og:title', 'property');
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (new URL(link.href).pathname === location.pathname) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

const navigate = async (url, { push = true, restoreScroll = false } = {}) => {
  const destination = new URL(url, location.href);
  const sequence = ++currentNavigation;
  const progressDelay = setTimeout(() => { if (sequence === currentNavigation) setProgress(true); }, 120);
  try {
    const route = await prefetchRoute(destination);
    if (sequence !== currentNavigation) return;
    clearTimeout(progressDelay);
    setProgress(false);
    if (push) {
      scrollPositions.set(location.href, window.scrollY);
      history.pushState({ foundly: true }, '', destination.href);
    }
    closeOverlay();
    const replacement = document.createElement('template');
    replacement.innerHTML = route.markup.trim();
    document.querySelector('main').replaceWith(replacement.content.firstElementChild);
    updatePageMetadata(route);
    mountPage();
    const menu = document.querySelector('#mobile-menu');
    menu?.classList.remove('is-open');
    document.querySelector('[data-action="menu"]')?.setAttribute('aria-expanded', 'false');
    const hashTarget = destination.hash && document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    if (hashTarget) hashTarget.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: restoreScroll ? scrollPositions.get(destination.href) || 0 : 0, behavior: 'instant' });
    const main = document.querySelector('main');
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  } catch {
    // Graceful fallback to the real HTML page if prefetch is unavailable.
    clearTimeout(progressDelay);
    setProgress(false);
    if (sequence === currentNavigation) location.assign(destination.href);
  }
};

mountPage();
rememberCurrentPage();

const prefetchLink = (anchor) => {
  if (!anchor) return;
  const url = new URL(anchor.href, location.href);
  if (canNavigateLocally(url)) prefetchRoute(url).catch(() => {});
};

document.addEventListener('pointerover', (event) => prefetchLink(event.target.closest('a[href]')), { passive: true });
document.addEventListener('focusin', (event) => prefetchLink(event.target.closest('a[href]')));
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target.closest('a[href]');
  if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
  const url = new URL(anchor.href, location.href);
  if (!canNavigateLocally(url)) return;
  if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
  event.preventDefault();
  navigate(url);
});

history.scrollRestoration = 'manual';
window.addEventListener('popstate', () => navigate(location.href, { push: false, restoreScroll: true }));

// Each HTML page is only a few kilobytes. Warm the full internal navigation
// cache quietly, with help/policy pages first, so footer links are instant.
const warmRoutes = () => {
  const ordered = ['faq.html', 'terms.html', 'privacy.html', 'returns.html', 'contact.html', 'shop.html', 'sell.html', 'sellers.html', 'story.html', 'index.html'];
  for (const name of ordered) prefetchRoute(new URL(name, location.href)).catch(() => {});
};
if ('requestIdleCallback' in window) requestIdleCallback(warmRoutes, { timeout: 1800 });
else setTimeout(warmRoutes, 450);
