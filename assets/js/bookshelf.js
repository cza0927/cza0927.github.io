(function () {
  var grid = document.querySelector('.bookshelf-grid');
  var btnTime = document.getElementById('sort-time');
  var btnTopic = document.getElementById('sort-topic');

  if (!grid || !btnTime || !btnTopic) return;

  btnTime.classList.add('sort-btn', 'is-active');
  btnTopic.classList.add('sort-btn');

  function getCards() {
    return Array.prototype.slice.call(grid.querySelectorAll('.book-card'));
  }

  function normalizeRead(v) {
    return String(v || '').trim();
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

  function getStartReadKey(readRange) {
    var text = normalizeRead(readRange);
    if (!text) return -1;

    var start = text.split('-')[0];
    return parseYearMonth(start);
  }

  function normalizeTheme(v) {
    return String(v || '').trim().toLowerCase();
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
    var cards = getCards().sort(function (a, b) {
      var ra = getStartReadKey(a.getAttribute('data-read'));
      var rb = getStartReadKey(b.getAttribute('data-read'));
      return rb - ra;
    });
    render(cards);
    setActive('time');
  }

  function sortByTopic() {
    var cards = getCards().sort(function (a, b) {
      var ta = normalizeTheme(a.getAttribute('data-theme'));
      var tb = normalizeTheme(b.getAttribute('data-theme'));

      if (ta === tb) {
        var ra = getStartReadKey(a.getAttribute('data-read'));
        var rb = getStartReadKey(b.getAttribute('data-read'));
        return rb - ra;
      }

      return ta.localeCompare(tb);
    });
    render(cards);
    setActive('topic');
  }

  btnTime.addEventListener('click', sortByTime);
  btnTopic.addEventListener('click', sortByTopic);

  sortByTime();
})();
