(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function initBookshelfSort() {
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
      var fromData = String(card.getAttribute('data-theme') || '').trim();
      if (fromData) return fromData;

      var tags = Array.prototype.slice.call(card.querySelectorAll('.book-tag'));
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i].textContent || '';
        if (/^\s*theme\s*:/i.test(t)) {
          return t.replace(/^\s*theme\s*:/i, '').trim();
        }
      }

      return '';
    }

    function getCardTitle(card) {
      var title = card.querySelector('.book-title');
      return title ? String(title.textContent || '').trim() : '';
    }

    function compareByTime(a, b) {
      var ra = getCardReadInfo(a);
      var rb = getCardReadInfo(b);

      if (rb.end !== ra.end) return rb.end - ra.end;
      if (rb.start !== ra.start) return rb.start - ra.start;

      var themeCmp = collator.compare(getCardTheme(a), getCardTheme(b));
      if (themeCmp !== 0) return themeCmp;

      return collator.compare(getCardTitle(a), getCardTitle(b));
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
  }

  function trimParagraph(paragraph) {
    while (paragraph.firstChild && !String(paragraph.firstChild.textContent || '').trim()) {
      paragraph.removeChild(paragraph.firstChild);
    }

    while (paragraph.lastChild && !String(paragraph.lastChild.textContent || '').trim()) {
      paragraph.removeChild(paragraph.lastChild);
    }

    if (paragraph.firstChild && paragraph.firstChild.nodeType === Node.TEXT_NODE) {
      paragraph.firstChild.nodeValue = paragraph.firstChild.nodeValue.replace(/^\s+/, '');
    }

    if (paragraph.lastChild && paragraph.lastChild.nodeType === Node.TEXT_NODE) {
      paragraph.lastChild.nodeValue = paragraph.lastChild.nodeValue.replace(/\s+$/, '');
    }
  }

  function buildNoteContent(note) {
    var content = document.createElement('span');
    content.className = 'book-note-content';

    var paragraph = document.createElement('span');
    paragraph.className = 'book-note-paragraph';

    function pushParagraph() {
      trimParagraph(paragraph);
      if (String(paragraph.textContent || '').trim()) {
        content.appendChild(paragraph);
      }

      paragraph = document.createElement('span');
      paragraph.className = 'book-note-paragraph';
    }

    function appendText(text) {
      String(text || '')
        .replace(/\r\n/g, '\n')
        .split(/\n+/)
        .forEach(function (part, index) {
          if (index > 0) pushParagraph();
          if (part) paragraph.appendChild(document.createTextNode(part));
        });
    }

    Array.prototype.slice.call(note.childNodes).forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        appendText(node.nodeValue);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        paragraph.appendChild(node.cloneNode(true));
      }
    });

    pushParagraph();
    return content;
  }

  function refreshNoteOverflow(note) {
    var content = note.querySelector('.book-note-content');
    if (!content) return;

    note.classList.remove('is-overflowing');

    if (content.scrollHeight > content.clientHeight + 1) {
      note.classList.add('is-overflowing');
    }
  }

  function initBookNotes() {
    var notes = Array.prototype.slice.call(document.querySelectorAll('.book-note'));

    notes.forEach(function (note) {
      if (note.dataset.noteReady === 'true') return;

      var content = buildNoteContent(note);
      var toggle = document.createElement('button');

      toggle.type = 'button';
      toggle.className = 'book-note-toggle';
      toggle.setAttribute('aria-label', '展开书评');
      toggle.setAttribute('aria-expanded', 'false');

      note.innerHTML = '';
      note.appendChild(content);
      note.appendChild(toggle);
      note.dataset.noteReady = 'true';

      toggle.addEventListener('click', function () {
        var expanded = note.classList.toggle('is-expanded');
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        toggle.setAttribute('aria-label', expanded ? '收起书评' : '展开书评');
      });

      refreshNoteOverflow(note);
    });

    window.addEventListener('resize', function () {
      notes.forEach(refreshNoteOverflow);
    });
  }

  ready(initBookshelfSort);
  ready(initBookNotes);
})();
