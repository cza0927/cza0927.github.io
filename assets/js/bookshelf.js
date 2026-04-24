(function () {
  var grid = document.querySelector('.bookshelf-grid');
  var btnTime = document.getElementById('sort-time');
  var btnTopic = document.getElementById('sort-topic');

  if (!grid || !btnTime || !btnTopic) return;

  btnTime.classList.add('sort-btn', 'is-active');
  btnTopic.classList.add('sort-btn');

  var collator = new Intl.Collator('zh-Hans', { numeric: true, sensitivity: 'base' });

  function getCards() {
    return Array.prototype.slice.call(grid.querySelectorAll('.book-card'));
  }

  function normalizeRead(v) {
    return String(v || '')
      .trim()
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, '');
  }

  function parseYearMonth(input) {
    var m = String(input || '').trim().match(/^(\d{2,4})[.\/-](\d{1,2})$/);
    if (!m) return -1;

    var year = parseInt(m[1], 10);
    var month = parseInt(m[2], 10);

    if (year < 100) year += 2000;
    if (month < 1 || month > 12) return -1;

    return year * 100 + month;
  }

  function parseRange(rangeText) {
    var text = normalizeRead(rangeText);
    if (!text) return { start: -1, end: -1 };

    var m = text.match(/(\d{2,4}[.\/-]\d{1,2})(?:-(\d{2,4}[.\/-]\d{1,2}))?/);
    if (!m) return { start: -1, end: -1 };

    var start = parseYearMonth(m[1]);
    var end = m[2] ? parseYearMonth(m[2]) : start;
    return { start: start, end: end };
  }

  function getReadTextFromCard(card) {
    var tags = Array.prototype.slice.call(card.querySelectorAll('.book-tag'));
    for (var i = 0; i < tags.length; i++) {
      var t = tags[i].textContent || '';
      if (/^\s*read\s*:/i.test(t)) {
        return t.replace(/^\s*read\s*:/i, '').trim();
      }
    }
    return '';
  }

  function getCardReadInfo(card) {
    var fromText = parseRange(getReadTextFromCard(card));
    if (fromText.start > 0) return fromText;

    var fromData = parseRange(card.getAttribute('data-read'));
    if (fromData.start > 0) return fromData;

    return { start: -1, end: -1 };
  }

  function getCardTheme(card) {
    return String(card.getAttribute('data-theme') || '').trim();
  }

  function compareByTime(a, b) {
    var ra = getCardReadInfo(a);
    var rb = getCardReadInfo(b);

    if (rb.start !== ra.start) return rb.start - ra.start;
    if (rb.end !== ra.end) return rb.end - ra.end;
    return collator.compare(getCardTheme(a), getCardTheme(b));
  }

  function render(sortedCards) {
    sortedCards.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function setActive(mode) {
    btnTime.classList.toggle('is-active', mode === 'time');
    btnTopic.classList.toggle('is-active', mode === 'topic');
  }

  function sortByTime() {
    var cards = getCards().sort(compareByTime);
    render(cards);
    setActive('time');
  }

  function sortByTopic() {
    var cards = getCards().sort(function (a, b) {
      var ta = getCardTheme(a);
      var tb = getCardTheme(b);
      var themeCmp = collator.compare(ta, tb);
      if (themeCmp !== 0) return themeCmp;

      return compareByTime(a, b);
    });
    render(cards);
    setActive('topic');
  }

  btnTime.addEventListener('click', sortByTime);
  btnTopic.addEventListener('click', sortByTopic);

  sortByTime();
})();
