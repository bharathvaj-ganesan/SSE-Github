<template>
  <v-layout justify-space-between row >
    <v-flex xs12 md8>
      <GithubActivity />
    </v-flex>
    <v-flex xs12 md3>
      <v-card class="grey lighten-3">
        <v-card-title class="headline">Server Side Events + Nuxt.js</v-card-title>
        <v-card-text>
          <p>This is an app accompanying the Medium <a href="">blog.</a></p>
          <p>Find a bug? Report it on the github <a href="https://github.com/bharathvaj1995/SSE-Github/issues" target="_blank" title="contribute">issue board</a>.</p>
          <div class="text-xs-right">
            <em><small>&mdash; Bharath</small></em>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import GithubActivity from '~/components/GithubActivity.vue';
export default {
	components: {
		GithubActivity
	}
};
</script>
