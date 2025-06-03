<template>
  <div class="pagamento-container">
    <h2>Pagamento via Pix</h2>

    <div class="form-field">
      <label for="valor">Valor total das despesas:</label>
      <input type="text" id="valor" value="R$ 2350,00" disabled />
    </div>
    <div class="form-field">
          <label>Pagamento Fixo:</label>
          <input type="text" id="pgfixo" value="R$ 25,00" disabled />
    </div>
    <div class="pix-box">
      <div class="pix-row">
        <label for="banco">Banco:</label>
        <input type="text" id="banco" value="Bradesco" disabled/>
      </div>
      <div class="pix-row">
        <label for="titular">Titular:</label>
        <input type="text" id="titular" value="Igorzao" disabled/>
      </div>
      <div class="pix-row">
        <label for="chave">Chave:</label>
        <input type="text" id="chave" value="igor-petryy@hotmail.com" disabled/>
      </div>
    </div>
    <div class="form-field">
     <label>Anexe o comprovante Pix</label>
          <input type="file" />
        </div>
        <v-btn color="primary" @click="carregarProdutos">Pagar</v-btn>

  </div>
</template>

<script>
export default {
  name: "PagamentoPix",
};
</script>

<style scoped>
.pagamento-container {
  max-width: 550px;
  margin: 60px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

.pix-box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.pix-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.pix-row label {
  width: 80px;
  font-weight: 500;
}

.pix-row input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

.form-field input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
