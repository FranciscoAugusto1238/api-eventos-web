<template>
  <v-container fluid class="pa-0 site-centralizado">
    <app-topbar @toggle-drawer="toggleDrawer" />

    <v-navigation-drawer v-model="drawer" app clipped>
      <AppSidebar :drawer="drawer" @update:drawer="drawer = $event" />
    </v-navigation-drawer>

    <v-main>
      <v-container class="conteudo-centralizado">
        <v-card class="pa-5 custom-card" elevation="2">
          <h2 class="titulo">Seus Eventos</h2>

          <v-row align="center" justify="center" class="mb-4 filtros">
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="filtroNome"
                label="Filtrar por Nome"
                dense
                outlined
                class="campo-filtro"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="filtroData"
                type="date"
                dense
                outlined
                class="campo-filtro"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="2">
              <v-btn
                color="#005324"
                dark
                block
                class="botao-buscar"
                @click="filtrarEventos"
              >
                Buscar
              </v-btn>
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="eventosFiltrados"
            class="custom-table"
            dense
            hide-default-footer
          >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.acao="{ item }">
              <v-btn
                color="#005324"
                dark
                small
                class="botao-cancelar"
                @click="abrirConfirmacao(item)"
              >
                Cancelar Participação
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <v-dialog v-model="showConfirm" max-width="400">
          <v-card>
            <v-card-title class="text-h6">Confirmar Cancelamento</v-card-title>
            <v-card-text>
              Deseja realmente cancelar a participação no evento
              <strong>{{ eventoSelecionado?.nome }}</strong>?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="fecharConfirmacao">Não</v-btn>
              <v-btn color="red darken-1" text @click="confirmarCancelamento">Sim</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

export default {
  name: 'CancelarParticipacao',
  components: { AppSidebar, AppTopbar },
  data() {
    return {
      drawer: true,
      filtroNome: '',
      filtroData: '',
      showConfirm: false,
      eventoSelecionado: null,
      eventos: [
        { nome: 'Evento 1', data: '2025-06-01' },
        { nome: 'Evento 2', data: '2025-06-05' },
        { nome: 'Evento 3', data: '2025-06-10' },
        { nome: 'Evento 4', data: '2025-06-15' }
      ],
      headers: [
        { text: 'Nome do Evento', value: 'nome' },
        { text: 'Data do Evento', value: 'data' },
        { text: 'Opções', value: 'acao', sortable: false }
      ]
    };
  },
  computed: {
    eventosFiltrados() {
      return this.eventos.filter(evento => {
        const nomeMatch = evento.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
        const dataMatch = this.filtroData ? evento.data === this.filtroData : true;
        return nomeMatch && dataMatch;
      });
    }
  },
  methods: {
    abrirConfirmacao(evento) {
      this.eventoSelecionado = evento;
      this.showConfirm = true;
    },
    confirmarCancelamento() {
      this.eventos = this.eventos.filter(e => e !== this.eventoSelecionado);
      this.fecharConfirmacao();
      alert('Participação cancelada com sucesso!');
    },
    fecharConfirmacao() {
      this.eventoSelecionado = null;
      this.showConfirm = false;
    },
    filtrarEventos() {
      // Computed já faz a filtragem
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Poppins:wght@500;700&display=swap');

.custom-card {
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  max-width: 1200px; /* ou ajuste conforme a largura desejada */
  margin: 0 auto;
  padding: 40px; /* mais espaçamento interno */
}

.titulo {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem; /* levemente maior */
  margin-bottom: 2rem; /* mais espaço abaixo do título */
  text-align: center;
}

.filtros {
  margin-bottom: 2rem; /* mais espaço abaixo dos filtros */
}

.custom-table {
  background-color: #E8EDEE;
  font-family: 'Nunito', sans-serif;
  border-radius: 8px;
  margin: 0 auto;
  border: 1px solid #ccc;
  text-align: center;
  padding: 20px; /* mais espaçamento interno */
  width: 100%; /* preencher mais o card */
}

.v-data-table-header th {
  font-family: 'Poppins', sans-serif !important;
  padding: 25px !important; 
}

.v-data-table .v-data-table__td {
  padding: 16px !important;
}

.botao-buscar {
  font-family: 'Poppins', sans-serif;
}

.botao-cancelar {
  font-family: 'Poppins', sans-serif;
  text-transform: none;
  margin: 12px;
}

.custom-card {
  border-radius: 8px;
  background-color: #fff;
  max-width: 900px;
  margin: 0 auto;
}

.site-centralizado {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.conteudo-centralizado {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
