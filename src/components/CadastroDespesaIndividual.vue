<template>
  <div class="layout">
    <aside>
      <ul>
        <li>Home</li>
        <li>Cadastrar Eventos</li>
        <li>Gerenciar Eventos</li>
        <li>Cadastro Despesas Totais</li>
        <li>Gerenciar Despesas Totais</li>
        <li class="active">Despesas Individuais</li>
      </ul>
    </aside>

    <div class="main-content">
      <header>
        <img src="/EventIF.png" alt="Logo do Evento" />
        <span>EventIF</span>
      </header>

      <div class="container">
        <h2>Cadastrar Despesa Individual (Organizadores do Evento)</h2>
        <form @submit.prevent="registrarDespesa">
          <label for="titulo">Título da Despesa</label>
          <input type="text" id="titulo" v-model="titulo" placeholder="Ex: Compra de pão" />

          <label for="valor">Valor Total da Despesa</label>
          <input type="number" id="valor" v-model="valor" step="0.01" />

          <label for="valorConfirm">Confirmar Valor</label>
          <input type="number" id="valorConfirm" v-model="valorConfirm" step="0.01" />

          <label>Imagem do Cupom</label>
          <div class="image-upload" @click="$refs.uploadInput.click()">
            <img src="/LogoImg.png" alt="Upload" />
            <span>Enviar Imagem</span>
            <input ref="uploadInput" type="file" accept="image/*" style="display: none" @change="handleFileUpload" />
          </div>
          <img v-if="imagePreview" :src="imagePreview" class="image-upload-preview" />

          <label for="chave">Chave de Acesso</label>
          <input type="text" id="chave" v-model="chave" />

          <button type="submit">Registrar Despesa</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CadastroDespesaIndividual',
  data() {
    return {
      titulo: '',
      valor: '',
      valorConfirm: '',
      chave: '',
      imagePreview: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    registrarDespesa() {
      if (!this.titulo || !this.valor || !this.valorConfirm || !this.chave) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      if (this.valor !== this.valorConfirm) {
        alert('Os valores não coincidem.');
        return;
      }
      alert('Despesa registrada com sucesso!');
      // Aqui você pode enviar os dados para um backend ou limpar o formulário
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background-color: #f2f4f6;
}

aside {
  width: 200px;
  background-color: #e9eff1;
  padding: 20px 0;
}

aside ul {
  list-style: none;
  padding: 0;
}

aside ul li {
  padding: 10px 20px;
  cursor: pointer;
  color: #000;
}

aside ul li.active {
  background-color: #b1d3be;
  font-weight: bold;
}

header {
  background-color: #017937;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

header img {
  height: 24px;
  margin-right: 10px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.container {
  padding: 40px;
  flex: 1;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  background-color: #fff;
  border: 2px dashed #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  flex-direction: column;
}

.image-upload img {
  width: 48px;
  margin-bottom: 10px;
}

.image-upload-preview {
  margin-top: 10px;
  max-width: 200px;
  max-height: 200px;
}

button {
  background-color: #017937;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: auto;
  display: block;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  aside {
    width: 100%;
    display: flex;
    overflow-x: auto;
  }
  aside ul {
    display: flex;
    width: 100%;
  }
  aside ul li {
    flex: 1;
    text-align: center;
  }
  .container {
    padding: 20px;
  }
}
</style>
