---
layout: page
title: Bookshelf
permalink: /bookshelf/
author_profile: true
---

> Books and essays I read outside research. Mostly literature, history, memoir, and other things that help me think slowly.

**Sort by:** <button id="sort-time" class="btn btn--light-outline">Time</button> | <button id="sort-topic" class="btn btn--light-outline">Topic</button>

<!-- Available Themes: 
- Literature
- History
- Philosophy
- Memoir
- Society
- Random Reads
-->

<link rel="stylesheet" href="{{ '/assets/css/bookshelf.css' | relative_url }}">

<div class="bookshelf-grid">
  <!--
    Book card template (copy and fill):
    - title
    - author
    - theme (e.g. Literature / History / Memoir)
    - read period (e.g. 2026.03-2026.04)
    - one-line note
  -->
  <div class="book-card" data-theme="历史" data-read="2026.04-2026.04">
    <img class="book-cover" src="https://via.placeholder.com/100x150" alt="Book Cover">
    <div>
      <h3 class="book-title">中国历代政治得失</h3>
      <p class="book-author">钱穆</p>
      <div class="book-meta">
        <span class="book-tag">Theme: 历史小说</span>
        <span class="book-tag">Read: 2025.04-2025.05</span>
      </div>
      <p class="book-note">A sentence of personal thoughts or short review. Not a deep analysis, just a genuine reflection.</p>
    </div>
  </div>

  <div class="book-card" data-theme="历史" data-read="2026.03-2026.04">
    <img class="book-cover" src="https://via.placeholder.com/100x150" alt="Book Cover">
    <div>
      <h3 class="book-title">明朝那些事儿（全集）</h3>
      <p class="book-author">当年明月</p>
      <div class="book-meta">
        <span class="book-tag">Theme: 历史小说</span>
        <span class="book-tag">Read: 2025.03-2025.04</span>
      </div>
      <p class="book-note">A sentence of personal thoughts or short review. Not a deep analysis, just a genuine reflection.</p>
    </div>
  </div>

  <div class="book-card" data-theme="历史" data-read="2025.12-2026.01">
    <img class="book-cover" src="https://via.placeholder.com/100x150" alt="Book Cover">
    <div>
      <h3 class="book-title">生死疲劳</h3>
      <p class="book-author">莫言</p>
      <div class="book-meta">
        <span class="book-tag">Theme: 历史小说</span>
        <span class="book-tag">Read: 2025.12-2026.01</span>
      </div>
      <p class="book-note">A sentence of personal thoughts or short review. Not a deep analysis, just a genuine reflection.</p>
    </div>
  </div>

  <div class="book-card" data-theme="当代小说" data-read="2026.02-2026.03">
    <img class="book-cover" src="https://via.placeholder.com/100x150" alt="Book Cover">
    <div>
      <h3 class="book-title">白鹿原</h3>
      <p class="book-author">陈忠实</p>
      <div class="book-meta">
        <span class="book-tag">Theme: 当代小说</span>
        <span class="book-tag">Read: 2026.01-2026.02</span>
      </div>
      <p class="book-note">A short, crisp reflection marking why this read was valuable.</p>
    </div>
  </div>
</div>

<script src="{{ '/assets/js/bookshelf.js' | relative_url }}"></script>
