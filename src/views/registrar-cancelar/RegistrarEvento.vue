<template>
  <v-container fluid class="pa-0">
    <app-topbar @toggle-drawer="toggleDrawer" />

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <AppSidebar :drawer="drawer" @update:drawer="drawer = $event" />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="d-flex justify-center align-center" style="min-height: calc(100vh - 64px);">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-form @submit.prevent="registrar" class="register-form">
            <h2 class="form-title">Registrar-se no Evento 1</h2>

            <v-text-field
              label="Nome completo"
              v-model="nome"
              variant="underlined"
              density="comfortable"
              required
            />

            <v-text-field
              label="E-mail"
              v-model="email"
              variant="underlined"
              density="comfortable"
              required
            />

            <v-text-field
              label="Telefone"
              v-model="telefone"
              variant="underlined"
              density="comfortable"
              required
            />

            <v-checkbox
              v-model="confirmado"
              label="Confirmo minha participação no evento"
              density="comfortable"
            />

            <v-btn
  type="submit"
  class="register-btn"
  style="background-color: #005324; color: white;"
>
  Registrar-se
</v-btn>

          </v-form>
        </v-col>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

export default {
  name: 'RegistrarEvento',
  components: {
    AppSidebar,
    AppTopbar
  },
  data() {
    return {
      nome: '',
      email: '',
      telefone: '',
      confirmado: false,
      drawer: true
    };
  },
  methods: {
    registrar() {
      if (this.confirmado) {
        alert('Registrado com sucesso!');
      } else {
        alert('Por favor, confirme sua participação.');
      }
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.form-title {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.register-btn {
  background-color: #005324 !important;
  color: white !important;
  text-transform: none;
  width: 150px;
  align-self: center;
}

.register-btn:hover {
  background-color: #00401f !important; /* Tom mais escuro no hover */
}
</style>
