document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var full = item.getAttribute('data-full');
        var img = item.querySelector('img');
        lightboxImg.src = full;
        lightboxImg.alt = img ? img.alt : '';
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  initOrderBuilder();
  initScrollSpy();
});

function initScrollSpy() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  var linkFor = {};
  navLinks.forEach(function (link) {
    linkFor[link.getAttribute('href').slice(1)] = link;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = linkFor[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}

function initOrderBuilder() {
  var itemsContainer = document.getElementById('order-items');
  if (!itemsContainer) return;

  var MENU = [
    {
      category: 'Breakfast & Bakery',
      items: [
        { id: 'adb', name: 'All Day Breakfast', price: 8.00 },
        { id: 'vadb', name: 'Veg All Day Breakfast', price: 6.25 },
        { id: 'pom', name: 'Plain Omelette', price: 4.99 },
        { id: 'nom', name: 'Nepali Omelette', price: 5.99 }
      ],
      addons: [
        { id: 'ad-bacon', name: 'Add Bacon', price: 1.00 },
        { id: 'ad-egg', name: 'Add Egg', price: 1.00 },
        { id: 'ad-sausage', name: 'Add Sausage', price: 1.20 },
        { id: 'ad-hashbrown', name: 'Add Hash Brown', price: 1.20 },
        { id: 'ad-bread', name: 'Add Slice of Bread', price: 1.00 },
        { id: 'ad-ham', name: 'Add Ham', price: 1.75 },
        { id: 'ad-cheese', name: 'Add Cheese', price: 1.75 }
      ]
    },
    {
      category: 'Baps & Toasties',
      items: [
        { id: 'bap-bacon', name: 'Bacon Bap', price: 4.99 },
        { id: 'bap-bacon-egg', name: 'Bacon Bap with Fried Egg', price: 5.65 },
        { id: 'bap-sausage', name: 'Sausage Bap', price: 4.99 },
        { id: 'bap-sausage-egg', name: 'Sausage Bap with Fried Egg', price: 5.65 },
        { id: 'bap-both', name: 'Bacon & Sausage Bap', price: 4.99 },
        { id: 'bap-both-egg', name: 'Bacon & Sausage Bap with Fried Egg', price: 5.65 },
        { id: 'toastie-hc', name: 'Ham & Cheese Toastie', price: 4.75 },
        { id: 'toastie-c', name: 'Cheese Toastie', price: 3.99 }
      ],
      addons: [
        { id: 'ad-toastie-egg', name: 'Add Egg', price: 1.00 },
        { id: 'ad-toastie-tomato', name: 'Add Tomato', price: 1.00 }
      ]
    },
    {
      category: 'Nepali Favourites',
      items: [
        { id: 'aloo', name: 'Aloo Chop (2 pieces)', price: 2.50 },
        { id: 'samosa', name: 'Vegetable Samosa', price: 2.00 },
        { id: 'panipuri', name: 'Pani Puri', price: 4.99 },
        { id: 'chatpate', name: 'Chatpate', price: 4.99 },
        { id: 'puritarkari', name: 'Puri Tarkari', price: 6.99 },
        { id: 'momo-chicken', name: 'Steam Momo – Chicken (10 pieces)', price: 7.99 },
        { id: 'momo-pork', name: 'Steam Momo – Pork (10 pieces)', price: 7.99 },
        { id: 'chow-veg', name: 'Chowmein – Veg', price: 7.00 },
        { id: 'chow-egg', name: 'Chowmein – Egg', price: 7.99 },
        { id: 'chow-chicken', name: 'Chowmein – Chicken', price: 7.99 },
        { id: 'chow-pork', name: 'Chowmein – Pork', price: 7.99 },
        { id: 'chow-mix', name: 'Chowmein – Mix', price: 9.50 },
        { id: 'thukpa-veg', name: 'Thukpa – Veg', price: 7.00 },
        { id: 'thukpa-chicken', name: 'Thukpa – Chicken', price: 7.99 },
        { id: 'thukpa-pork', name: 'Thukpa – Pork', price: 7.99 },
        { id: 'thukpa-mix', name: 'Thukpa – Mix', price: 9.50 },
        { id: 'combo', name: 'Combo: 5 Momo & Vegetable Chowmein', price: 7.99 }
      ]
    },
    {
      category: 'Hot Drinks',
      items: [
        { id: 'espresso', name: 'Espresso', price: 2.50 },
        { id: 'espresso-double', name: 'Espresso Double', price: 3.10 },
        { id: 'americano', name: 'Americano', price: 3.20 },
        { id: 'cappuccino', name: 'Cappuccino', price: 3.75 },
        { id: 'flatwhite', name: 'Flat White', price: 3.50 },
        { id: 'latte', name: 'Latte', price: 3.95 },
        { id: 'macchiato', name: 'Macchiato', price: 3.10 },
        { id: 'mocha', name: 'Mocha', price: 3.95 },
        { id: 'hotchoc', name: 'Hot Chocolate', price: 3.75 },
        { id: 'breakfasttea', name: 'Breakfast Tea', price: 2.00 },
        { id: 'chiya', name: 'Chiya (Nepali Tea)', price: 2.50 },
        { id: 'greentea', name: 'Green Tea', price: 2.10 }
      ],
      addons: [
        { id: 'ad-extrashot', name: 'Extra Shot', price: 1.00 }
      ]
    },
    {
      category: 'Cold Drinks',
      items: [
        { id: 'water', name: 'Water', price: 2.00 },
        { id: 'coke', name: 'Coke (Can)', price: 1.75 },
        { id: 'dietcoke', name: 'Diet Coke', price: 1.65 },
        { id: 'oj', name: 'Orange Juice', price: 2.45 },
        { id: 'gingerbeer', name: 'Ginger Beer (Can)', price: 2.00 }
      ]
    }
  ];

  var itemLookup = {};
  MENU.forEach(function (group) {
    group.items.concat(group.addons || []).forEach(function (item) {
      itemLookup[item.id] = item;
    });
  });

  var cart = {};

  function fmt(n) {
    return '£' + n.toFixed(2);
  }

  function buildRow(item) {
    var row = document.createElement('div');
    row.className = 'order-row';
    row.innerHTML =
      '<div>' +
        '<div class="order-row-name">' + item.name + '</div>' +
        '<div class="order-row-price">' + fmt(item.price) + '</div>' +
      '</div>' +
      '<div class="order-row-right">' +
        '<div class="qty-stepper">' +
          '<button type="button" class="qty-btn qty-minus" aria-label="Remove one ' + item.name + '" disabled>&minus;</button>' +
          '<span class="qty-value">0</span>' +
          '<button type="button" class="qty-btn qty-plus" aria-label="Add one ' + item.name + '">&plus;</button>' +
        '</div>' +
      '</div>';

    var minusBtn = row.querySelector('.qty-minus');
    var plusBtn = row.querySelector('.qty-plus');
    var qtyValue = row.querySelector('.qty-value');

    function setQty(n) {
      cart[item.id] = n;
      qtyValue.textContent = n;
      minusBtn.disabled = n <= 0;
      renderSummary();
    }

    plusBtn.addEventListener('click', function () {
      setQty((cart[item.id] || 0) + 1);
    });
    minusBtn.addEventListener('click', function () {
      setQty(Math.max(0, (cart[item.id] || 0) - 1));
    });

    row._setQty = setQty;
    return row;
  }

  var rowResetters = [];
  var categoryMeta = [];

  var hint = document.createElement('p');
  hint.className = 'order-hint-top';
  hint.textContent = 'Tap a category below to see its items and add them to your order.';
  itemsContainer.appendChild(hint);

  MENU.forEach(function (group, groupIndex) {
    var panelId = 'order-panel-' + groupIndex;
    var ids = group.items.concat(group.addons || []).map(function (i) { return i.id; });

    var section = document.createElement('div');
    section.className = 'order-category';

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'order-cat-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', panelId);
    toggle.innerHTML =
      '<span class="order-cat-name">' + group.category + '</span>' +
      '<span class="order-cat-badge" hidden></span>' +
      '<span class="order-cat-chevron" aria-hidden="true">&#9662;</span>';

    var panel = document.createElement('div');
    panel.className = 'order-cat-panel';
    panel.id = panelId;

    var panelInner = document.createElement('div');
    panelInner.className = 'order-cat-panel-inner';

    group.items.forEach(function (item) {
      var row = buildRow(item);
      rowResetters.push(row._setQty);
      panelInner.appendChild(row);
    });

    if (group.addons && group.addons.length) {
      var addonLabel = document.createElement('p');
      addonLabel.className = 'order-category-sub';
      addonLabel.textContent = 'Add-ons';
      panelInner.appendChild(addonLabel);

      group.addons.forEach(function (item) {
        var row = buildRow(item);
        rowResetters.push(row._setQty);
        panelInner.appendChild(row);
      });
    }

    panel.appendChild(panelInner);
    section.appendChild(toggle);
    section.appendChild(panel);
    itemsContainer.appendChild(section);

    toggle.addEventListener('click', function () {
      var isOpen = section.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    categoryMeta.push({ ids: ids, badgeEl: toggle.querySelector('.order-cat-badge') });
  });

  function updateCategoryBadges() {
    categoryMeta.forEach(function (meta) {
      var count = 0, subtotal = 0;
      meta.ids.forEach(function (id) {
        var qty = cart[id] || 0;
        count += qty;
        subtotal += qty * itemLookup[id].price;
      });
      if (count > 0) {
        meta.badgeEl.textContent = count + (count === 1 ? ' item · ' : ' items · ') + fmt(subtotal);
        meta.badgeEl.hidden = false;
      } else {
        meta.badgeEl.hidden = true;
      }
    });
  }

  var summaryList = document.getElementById('order-summary-list');
  var totalEl = document.getElementById('order-total');
  var copyBtn = document.getElementById('order-copy-btn');
  var clearBtn = document.getElementById('order-clear-btn');
  var noteEl = document.getElementById('order-note');

  function renderSummary() {
    updateCategoryBadges();
    var ids = Object.keys(cart).filter(function (id) { return cart[id] > 0; });

    if (ids.length === 0) {
      summaryList.innerHTML = '<p class="order-empty">No items added yet — use the + buttons to build your order.</p>';
      totalEl.textContent = fmt(0);
      copyBtn.disabled = true;
      return;
    }

    var total = 0;
    var html = '';
    ids.forEach(function (id) {
      var item = itemLookup[id];
      var qty = cart[id];
      var lineTotal = item.price * qty;
      total += lineTotal;
      html += '<div class="order-summary-row"><span>' + qty + ' × ' + item.name + '</span><span>' + fmt(lineTotal) + '</span></div>';
    });

    summaryList.innerHTML = html;
    totalEl.textContent = fmt(total);
    copyBtn.disabled = false;
  }

  function buildSummaryText() {
    var ids = Object.keys(cart).filter(function (id) { return cart[id] > 0; });
    var lines = ['The Gurkha Cafe — Collection Order', ''];
    var total = 0;

    ids.forEach(function (id) {
      var item = itemLookup[id];
      var qty = cart[id];
      var lineTotal = item.price * qty;
      total += lineTotal;
      lines.push(qty + ' x ' + item.name + ' — ' + fmt(lineTotal));
    });

    lines.push('');
    lines.push('Total: ' + fmt(total));

    var note = noteEl.value.trim();
    if (note) {
      lines.push('');
      lines.push('Note: ' + note);
    }

    lines.push('');
    lines.push('Collection only — call 01962 588857 to confirm your time.');
    return lines.join('\n');
  }

  copyBtn.addEventListener('click', function () {
    var text = buildSummaryText();
    var restoreLabel = 'Copy Order Summary';

    function showCopied() {
      copyBtn.textContent = 'Copied!';
      setTimeout(function () { copyBtn.textContent = restoreLabel; }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied, function () {
        fallbackCopy(text, showCopied);
      });
    } else {
      fallbackCopy(text, showCopied);
    }
  });

  function fallbackCopy(text, done) {
    var temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(temp);
    done();
  }

  clearBtn.addEventListener('click', function () {
    rowResetters.forEach(function (setQty) { setQty(0); });
    noteEl.value = '';
  });

  renderSummary();
}
