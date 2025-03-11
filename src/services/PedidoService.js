import axios from 'axios';

const API_URL = 'http://localhost:8082/pedidos';

export default {
  criarPedido(pedido) {
    return axios.post(API_URL, pedido)
      .then(response => response.data);
  },

  listarPedidos() {
    return axios.get(API_URL)
      .then(response => response.data);
  },

  deletarPedido(id) {
    return axios.delete(`${API_URL}/${id}`)
      .then(response => response.data);
  },

  listarPedidosPorFiltro(nome, status) {
    return axios.get(`${API_URL}/filtro`, { 
      params: { nome, status }
    }).then(response => response.data);
  },

  atualizarStatusPedido(id, status) {
    return axios.patch(`${API_URL}/${id}/status`, null, { 
      params: { status }
    }).then(response => response.data);
  }
};
