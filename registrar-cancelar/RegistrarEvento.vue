<template>
  <v-container fluid class="pa-0">
    <app-topbar @toggle-drawer="toggleDrawer" />

    <v-navigation-drawer v-model="drawer" app clipped>
      <AppSidebar :drawer="drawer" @update:drawer="drawer = $event" />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="pa-5" elevation="2">
              <v-card-title class="text-h6 justify-center" style="font-family: 'Poppins', sans-serif;">
                Registrar-se no Evento 1
              </v-card-title>

              <v-card-text>
                <v-form>
                  <v-row class="mb-3" align="center">
                    <v-col cols="4" class="text-right">
                      <label for="nome">Nome completo:</label>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field id="nome" v-model="nome" dense outlined hide-details></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mb-3" align="center">
                    <v-col cols="4" class="text-right">
                      <label for="email">E-mail:</label>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field id="email" v-model="email" dense outlined hide-details></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mb-3" align="center">
                    <v-col cols="4" class="text-right">
                      <label for="telefone">Telefone:</label>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field id="telefone" v-model="telefone" dense outlined hide-details></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row align="center" class="mb-4">
                    <v-col cols="12">
                      <v-checkbox
                        v-model="confirmado"
                        label="Confirmo minha participação no evento"
                        color="#005324"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-btn
                    style="background-color: #005324; font-family: 'Poppins', sans-serif;"
                    dark
                    block
                    @click="registrar"
                  >
                    Registrar-se
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
.v-card {
  border-radius: 16px;
  width: 100%;
}

.v-btn {
  text-transform: none;
}

.v-card-title {
  font-weight: 600;
}
</style>
