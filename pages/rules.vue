<template>
  <v-row>
    <v-col>
      <h2>Rules</h2>
      <p>
        <ul>
          <li>Two or more people take turns to play.</li>
          <li>Only nouns are permitted.</li>
          <li>A player who plays a word ending in the mora N (ん) loses the game, as no Japanese word begins with that character.</li>
          <li>Words may not be repeated.</li>
          <li>Phrases connected by no (の) are permitted, but only in those cases where the phrase is sufficiently fossilized to be considered a "word".</li>
        </ul>
      </p>
      <p>Example: sakura (さくら) → rajio (ラジオ) → onigiri (おにぎり) → risu (りす) → sumou (すもう) → udon (うどん)</p>
      <p>The player who used the word udon lost this game.</p>
      <p>There are various optional and advanced rules, which must be agreed on before the game begins.</p>
      <h3>Optional rules</h3>
      <p>
        <ul>
          <li>Dakuten and handakuten may be ignored or added. Thus suupu (スープ) may be followed by furo (ふろ), and sato (さと) may be followed by dochi (どち).</li>
          <li>A long vowel may either be ignored or considered as a vowel. Mikisaa (ミキサー/みきさあ) can be followed by either sakura (さくら) or aki (あき).</li>
          <li>Common pronouns and place names may be permitted. Example: Edo jou (えどじょう) lit. Edo castle is acceptable.</li>
          <li>Two words spelled with the same kana but different kanji may be permitted. For example, Su (す) can either be spelled as "巣" (lit. a birdnest) or "酢" (lit. vinegar).</li>
        </ul>
      </p>
      <h3>Advanced rules</h3>
      <p>
        <ul>
          <li>Words are limited to a certain genre.</li>
          <li>Instead of using only the last kana, the final two kana must be used again. In this case, only the first kana may not be the mora N (ん).</li>
          <li>The length of a word must be three or more syllables.</li>
        </ul>
      </p>
      <v-btn color="primary" nuxt to="/game">Enter a game</v-btn>
    </v-col>
  </v-row>
</template>
