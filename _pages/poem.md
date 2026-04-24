---
layout: page
title: Poem
permalink: /poem/
author_profile: true
---

> A small shelf of poems and ci I return to, sometimes quietly, sometimes repeatedly.

<link rel="stylesheet" href="{{ '/assets/css/poem.css' | relative_url }}">

<div class="poem-list">
  <!--
    Card template:
    1) Keep class as "poem-card" when no note.
    2) Change to "poem-card has-note" only when adding right-side note.
    3) Date format: Date :yyyy.mm.dd
  -->
  <article class="poem-card has-note">
    <header class="poem-head">
      <h3 class="poem-title">水调歌头</h3>
      <div class="poem-sub">苏轼</div>
      <div class="poem-date">Date :1076.09.15</div>
    </header>

    <div class="poem-body">
      <div class="poem-main">
        <p class="poem-stanza">明月几时有？把酒问青天。
不知天上宫阙，今夕是何年。</p>
        <p class="poem-stanza">我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
起舞弄清影，何似在人间。</p>
      </div>

      <aside class="poem-note">
        <h4 class="poem-note-title">Note</h4>
        <p class="poem-note-text">每次读到“何似在人间”都会慢下来。不是答案，而是一种被月光照到的停顿。</p>
      </aside>
    </div>
  </article>

  <article class="poem-card">
    <header class="poem-head">
      <h3 class="poem-title">定风波</h3>
      <div class="poem-sub">苏轼</div>
      <div class="poem-date">Date :1082.03.07</div>
    </header>

    <div class="poem-body">
      <div class="poem-main">
        <p class="poem-stanza">莫听穿林打叶声，何妨吟啸且徐行。
竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。</p>
        <p class="poem-stanza">料峭春风吹酒醒，微冷，山头斜照却相迎。
回首向来萧瑟处，归去，也无风雨也无晴。</p>
      </div>
    </div>
  </article>
</div>
