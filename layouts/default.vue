<template>
  <v-app id="inspire">
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-title >Your Dashboard</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
   <v-footer :fixed="true" app color="accent">
       <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2018 — <strong><a class="white--text" target ="_blank" href="https://bharathvajganesan.me">bharathvajganesan</a></strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: null
	}),
	props: {
		source: String
	}
};
</script>
