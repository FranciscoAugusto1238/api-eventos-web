<template>
  <v-app-bar app color="#004d25" dark>
    <v-btn icon @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

    <v-toolbar-title class="ml-3">
      <img :src="require('@/assets/1.png')" alt="Logo" height="30">
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppTopbar'
};
</script>

<style scoped>
.v-toolbar-title {
  display: flex;
  align-items: right;
}
</style>
