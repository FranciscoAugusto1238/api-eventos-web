<!-- FALTAM AJUSTES!!! -->

<template>
  <v-container fluid>
    <h2>Eventos</h2>

    <v-row>
      <v-col
        v-for="evento in eventos"
        :key="evento.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" outlined>
          <v-img
            :src="evento.bannerUrl"
            height="200px"
            class="white--text align-end"
          >
          </v-img>

          <v-card-text>
            <!-- Nome do evento em fonte maior -->
            <div class="text-h6 mb-2">{{ evento.nome }}</div>

            <!-- Data e horário da primeira sessão -->
            <div v-if="evento.sessoes && evento.sessoes.length">
              <span>{{ formatarData(evento.sessoes[0].data) }}</span>
              <span> - {{ evento.sessoes[0].inicio }}</span>
            </div>
            <div v-else class="grey--text">Sem sessão definida</div>
          </v-card-text>

          <!-- Ações (botão de inscrição) -->
          <v-card-actions>
            <v-btn
              block
              color="green darken-2"
              class="white--text"
              @click="inscrever(evento.id)"
            >
              Inscreva-se já!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar para feedback -->
    <v-snackbar v-model="snackbar" :timeout="3000" top>
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
// import EventoService from '@/services/EventoService'; // Certifique-se de ter este serviço

export default {
  name: 'ListarEventos',
  data() {
    return {
      eventos: [],

      // (Opcional) Filtros, se desejar implementar
      filtro: {
        nome: '',
        data: ''
      },

      snackbar: false,
      snackbarMessage: '',
    };
  },
  methods: {
    // carregarEventos() {
    //   EventoService.listarEventos()
    //     .then((response) => {
    //       this.eventos = response;
    //     })
    //     .catch(() => {
    //       this.snackbarMessage = 'Erro ao carregar eventos.';
    //       this.snackbar = true;
    //     });
    // },

    // 2. Formata uma string de data ISO (ex: "2025-06-13") para "13 de junho de 2025"
    formatarData(isoDate) {
      if (!isoDate) return '';
      const dt = new Date(isoDate);
      return dt.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    },

    // 3. Ação ao clicar em "Inscreva-se já!"
    inscrever(eventoId) {
      // Por exemplo, redirecionar para página de inscrição ou disparar modal
      // Aqui apenas exibimos um snackbar de mock:
      this.snackbarMessage = `Você clicou em Inscrever-se no evento ${eventoId}.`;
      this.snackbar = true;
    }
  },
  created() {
    this.carregarEventos();
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
