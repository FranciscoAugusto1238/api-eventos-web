<template>
  <v-navigation-drawer
    :value="drawer"
    @input="emitToggle"
    app
    clipped
  >
    <v-list dense>
      <v-list-item
  v-for="(item, index) in menuItems"
  :key="index"
  :to="item.route"
  link
  router
  :class="{ 'active-item': isActiveRoute(item.route) }"
>
  <v-list-item-title>
    {{ item.title }}
  </v-list-item-title>
</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        { title: 'Home', route: '/home' },
        { title: 'Produto', route: '/produto' },
        { title: 'Cadastrar Eventos', route: '/cadastro-produto' },
        { title: 'Gerenciar Eventos', route: '/listar-produtos' },
        { title: 'Cancelar Participação', route: '/cancelar-participacao' },
        { title: 'Registrar-se', route: '/registrar-evento' }
      ]
    };
  },
  methods: {
  emitToggle(val) {
    this.$emit('update:drawer', val);
  },
  isActiveRoute(route) {
    return this.$route.path === route;
  }
}
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #E8EDEE;
}

.v-list-item {
  transition: background-color 0.3s, color 0.3s;
}

.v-list-item:hover {
  background-color: #007f46;
  color: white;
}

.active-item {
  background-color: #b9fbc0 !important;
  font-weight: bold !important;
  color: #005324 !important;
}

.v-list-item:hover {
  background-color: #007f46 !important;
  color: white !important;
}
</style>
