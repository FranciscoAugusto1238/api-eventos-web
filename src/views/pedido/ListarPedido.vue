<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="carregarPedidos">Carregar Pedidos</v-btn>
      </v-col>
    </v-row>

    <v-data-table v-if="pedidos.length" :headers="headers" :items="pedidos" item-key="id">
  <template v-slot:item="{ item }">
    <tr :key="item.id" @dblclick="atualizarStatusPedido(item.id)">
      <td>{{ item.id }}</td>
      <td>{{ item.nomeCliente }}</td>
      <td>{{ item.dataInicio ? formatData(item.dataInicio) : '' }}</td>
    </tr>
  </template>
</v-data-table>
    <v-snackbar v-model="snackbar" :timeout="3000" top>
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import PedidoService from '@/services/PedidoService';

export default {
  data() {
    return {
      pedidos: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome Cliente', value: 'nomeCliente' },
        { text: 'Data Pedido', value: 'dataInicio' },
      ],
      snackbar: false,
      snackbarMessage: ''
    };
  },
  methods: {
    carregarPedidos() {
      PedidoService.listarPedidos()
        .then(response => {
          this.pedidos = response.map(item => {
            if (item.dataInicio && !isNaN(item.dataInicio)) {
              item.dataInicio = this.formatData(item.dataInicio);
            }
            return item;
          });
        })
        .catch(() => {
          this.snackbarMessage = 'Erro ao carregar pedidos.';
          this.snackbar = true;
        });
    },
    formatData(date) {
      if (typeof date === 'number' || !isNaN(date)) {
        date = new Date(date);
      } else if (typeof date === 'string') {
        date = new Date(date);
      }
      
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('pt-BR', options);
    },
    atualizarStatusPedido(id) {
      this.$router.push(`/atualizar-status-pedido/${id}`);
    },
    deletarPedido(id) {
      PedidoService.deletarPedido(id)
        .then(() => {
          this.snackbarMessage = 'Pedido deletado com sucesso!';
          this.snackbar = true;
          this.carregarPedidos(); 
        })
        .catch(() => {
          this.snackbarMessage = 'Erro ao deletar pedido.';
          this.snackbar = true;
        });
    }
  },
  created() {
    this.carregarPedidos();
  }
};
</script>

<style scoped>
</style>
