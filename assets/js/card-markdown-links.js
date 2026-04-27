(function () {
  var selector = [
    '.life-card p',
    '.book-note',
    '.poem-note-text'
  ].join(',');

  var markdownLinkPattern = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;

  function isAllowedHref(href) {
    return /^(https?:\/\/|mailto:|\/|#|\.\.?\/)/i.test(href);
  }

  function linkifyTextNode(textNode) {
    var text = textNode.nodeValue;
    var match;
    var lastIndex = 0;
    var fragment = document.createDocumentFragment();
    var changed = false;

    markdownLinkPattern.lastIndex = 0;

    while ((match = markdownLinkPattern.exec(text)) !== null) {
      var label = match[1];
      var href = match[2];

      if (!isAllowedHref(href)) continue;

      fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));

      var link = document.createElement('a');
      link.href = href;
      link.textContent = label;

      if (/^https?:\/\//i.test(href)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      fragment.appendChild(link);
      lastIndex = markdownLinkPattern.lastIndex;
      changed = true;
    }

    if (!changed) return;

    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    textNode.parentNode.replaceChild(fragment, textNode);
  }

  function linkifyElement(element) {
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    var textNodes = [];
    var node;

    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach(linkifyTextNode);
  }

  Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(linkifyElement);
})();
