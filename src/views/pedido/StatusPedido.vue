<template>
    <v-container>
      <v-card>
        <v-card-title>Atualizar Status do Pedido</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="pedidoId" label="ID do Pedido" readonly :disabled="true"></v-text-field>
  
            <v-select
              v-model="status"
              :items="statusOptions"
              label="Selecione o novo status"
              required
            ></v-select>
  
            <v-btn color="primary" @click="atualizarStatus">Atualizar</v-btn>
            <v-btn color="grey" class="ml-2" @click="$router.go(-1)">Cancelar</v-btn>
        </v-form>
        </v-card-text>
      </v-card>
  
      <v-snackbar v-model="snackbar" :timeout="3000">
        {{ snackbarMessage }}
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  import StatusPedidoService from '@/services/StatusPedidoService';
  
  export default {
    data() {
      return {
        pedidoId: null,
        status: '',
        statusOptions: ["Em Análise", "Aprovado", "Saiu para Entrega", "A Caminho", "Entregue"],
        snackbar: false,
        snackbarMessage: ''
      };
    },
    created() {
        this.pedidoId = this.$route.params.id;
        this.carregarStatusPedido();
    },

    methods: {
        async carregarStatusPedido() {
            try {
            const response = await StatusPedidoService.obterStatusPedido(this.pedidoId);
            this.status = response.status;
            } catch (error) {
            this.snackbarMessage = "Erro ao carregar o status do pedido.";
            this.snackbar = true;
            }
        },

        async atualizarStatus() {
            if (!this.status) {
                this.snackbarMessage = "Por favor, selecione um status!";
                this.snackbar = true;
                return;
            }

            try {
                await StatusPedidoService.editarStatusPedido(this.pedidoId, this.status);
                this.snackbarMessage = "Status atualizado com sucesso!";
                this.snackbar = true;
                
                setTimeout(() => {
                    this.$router.go(-1);
                }, 1000);
            } catch (error) {
                this.snackbarMessage = "Erro ao atualizar o status.";
                this.snackbar = true;
            }
        },
    },
  };
  </script>
  
  <style scoped>
  </style>
  