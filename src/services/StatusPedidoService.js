import axios from 'axios';

const API_URL = 'http://localhost:8082/pedidos-status';

export default {
  async editarStatusPedido(id, status) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar status do pedido (ID: ${id}):`, error);
      throw error;
    }
  },

  async obterStatusPedido(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter status do pedido (ID: ${id}):`, error);
      throw error;
    }
  },  

  async criarPedidoStatus(pedidoStatus) {
    try {
      const response = await axios.post(API_URL, pedidoStatus);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar status do pedido:', error);
      throw error;
    }
  }
};
