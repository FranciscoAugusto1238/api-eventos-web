<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nome do Evento</th>
          <th>Data do Evento</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="evento in eventos"
          :key="evento.nome"
        >
          <td>{{ evento.nome }}</td>
          <td>{{ evento.data }}</td>
          <td>
            <button
              class="btn-cancelar"
              @click="$emit('cancelar', evento)"
            >
              Cancelar Participação
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TabelaEventos',
  props: {
    eventos: Array
  }
};
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: 0 auto;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #E8EDEE;
}

thead {
  background-color: #E8EDEE;
}

th,
td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ccc;
}

.btn-cancelar {
  background-color: #005324;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  border-radius: 2px;
  font-size: 12px;
}
</style>
