<template>
  <v-row>
    <v-col>
      <v-card width="100%">
        <v-card-title class="headline"> Welcome to the Game </v-card-title>
        <v-card-subtitle>Shiritori</v-card-subtitle>
        <v-card-text>
          <p><a href="https://en.wikipedia.org/wiki/Shiritori">Shiritori @ Wikipedia</a></p>
          <p>
            Shiritori (しりとり) is a Japanese word game in which the players are required to say a word which begins
            with the final kana of the previous word. No distinction is made between hiragana, katakana or kanji.
            "Shiritori" literally means "taking the end" or "taking the rear".
          </p>
          <p>English shiritori</p>
          <p>
            A Shiritori game using only English words was invented to help people learn English. Most rules are the
            same, yet there are several original and optional rules that are used.
          </p>
          <p>
            For students of English, any words including nouns, verbs, and adjectives can be used. Players cannot use
            different tenses of previously used verbs unless they have nonstandard conjugation. For example, a player
            may use "be," "was," and "is," but not both "kick" and "kicked." When a word ends in a silent vowel, like
            "life," one may either use the vowel in another word or use the preceding consonant instead.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/rules">Rules</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
