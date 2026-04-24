(function () {
  function toStanzas(text) {
    return String(text || '')
      .replace(/\r\n/g, '\n')
      .trim()
      .split(/\n\s*\n+/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function renderPoemRaw(card) {
    var raw = card.querySelector('.poem-raw');
    if (!raw) return;

    var source = raw.textContent;
    var stanzas = toStanzas(source);

    if (!stanzas.length) return;

    raw.innerHTML = '';
    stanzas.forEach(function (stanza) {
      var p = document.createElement('p');
      p.className = 'poem-stanza';
      p.textContent = stanza;
      raw.appendChild(p);
    });
  }

  function applyOptionalNote(card) {
    var note = card.querySelector('.poem-note');
    var noteText = card.querySelector('.poem-note-text');

    if (!note || !noteText) {
      card.classList.remove('has-note');
      return;
    }

    if (noteText.textContent.trim()) {
      card.classList.add('has-note');
    } else {
      card.classList.remove('has-note');
      note.style.display = 'none';
    }
  }

  var cards = Array.prototype.slice.call(document.querySelectorAll('.poem-card'));
  cards.forEach(function (card) {
    renderPoemRaw(card);
    applyOptionalNote(card);
  });
})();
