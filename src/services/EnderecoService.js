import axios from 'axios';

const API_URL = 'http://localhost:8082/enderecos';

export default {
  criarEndereco(endereco) {
    return axios.post(API_URL, endereco)
      .then(response => response.data);
  },

  listarEnderecos() {
    return axios.get(API_URL)
      .then(response => response.data);
  },

  deletarEndereco(id) {
    return axios.delete(`${API_URL}/${id}`)
      .then(response => response.data);
  },

  listarEnderecosPorFiltro(cidade, estado) {
    return axios.get(`${API_URL}/filtro`, { 
      params: { cidade, estado }
    }).then(response => response.data);
  },

  consultarEnderecoPorCEP(cep) {
    return axios.get(`http://localhost:8082/enderecos/consultar-cep`, {
      params: { cep }
    }).then(response => response.data)
    .catch(error => {
      console.error("Erro ao consultar o CEP:", error);
      throw error;
    });
  }

};
