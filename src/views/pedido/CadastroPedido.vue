<template>
  <v-container>
    <v-form ref="form" @submit.prevent="cadastrarPedido">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="pedido.nomeCliente" label="Nome do Cliente" required :rules="[v => !!v || 'Campo Obrigatorio']" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="cep" label="CEP" required @blur="consultarEnderecoPorCep" :rules="[v => !!v || 'Campo Obrigatorio']"/>
        </v-col> 
        <v-col cols="12" md="4">
          <v-text-field v-model="endereco.logradouro" label="Logradouro" :readonly="true" :rules="[v => !!v || 'Campo Obrigatorio']" />
        </v-col> 
        <v-col cols="12" md="4">
          <v-text-field v-model="endereco.bairro" label="Bairro" :readonly="true" :rules="[v => !!v || 'Campo Obrigatorio']" />
        </v-col> 
        <v-col cols="12" md="4">
          <v-text-field v-model="endereco.localidade" label="Cidade" :readonly="true" :rules="[v => !!v || 'Campo Obrigatorio']" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="endereco.estado" label="Estado" :readonly="true" :rules="[v => !!v || 'Campo Obrigatorio']" />
        </v-col>   
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="produtoSelecionado"
            :items="produtosDisponiveis"
            item-value="id"
            item-text="nome"
            label="Selecionar Produto"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="quantidade" :rules="[v => !!v || 'Campo Obrigatorio']" label="Quantidade" type="number" min="1"/>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn color="primary" @click="adicionarProduto">Adicionar</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="pedido.produtos.length">
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="pedido.produtos"
            item-key="id"
          >
            <template v-slot:items="props">
              <tr :key="props.item.id">
                <td>{{ props.item.nome }}</td>
                <td>{{ props.item.quantidade }}</td>
                <td>
                  <v-btn color="red" @click="removerProduto(props.item.id)">Remover</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">Cadastrar Pedido</v-btn>
    </v-form>
    <v-snackbar v-model="snackbarSucesso" color="green" top right>
      <v-icon left>mdi-check-circle</v-icon>
      {{ mensagemSucesso }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarSucesso = false">Fechar</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarErro" color="red" top right>
      <v-icon left>mdi-alert-circle</v-icon>
      {{ mensagemErro }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarErro = false">Fechar</v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>
<script>
import PedidoService from '@/services/PedidoService';
import EnderecoService from '@/services/EnderecoService';
import ProdutoService from '@/services/ProdutoService';

export default {
  data() {
    return {
      pedido: {
        nomeCliente: '',
        quantidade: null,
        produtos: [],
        endereco: {}
      },
      cep: '',
      endereco: {
        logradouro: '',
        bairro: '',
        localidade: '',
        estado: ''
      },
      produtosDisponiveis: [],
      produtoSelecionado: null,
      quantidade: 1,
      headers: [
        { text: 'Produto', value: 'nome' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      snackbarSucesso: false,
      snackbarErro: false,
      mensagemSucesso: '',
      mensagemErro: ''
    };
  },
  methods: {
    consultarEnderecoPorCep() {
      if (this.cep.length === 8) {
        EnderecoService.consultarEnderecoPorCEP(this.cep)
          .then(response => {
            if (response) {
              this.endereco = response;
              this.pedido.endereco = this.endereco;
            } else {
              this.mensagemErro = 'Endereço não encontrado.';
              this.snackbarErro = true;
            }
          })
          .catch(() => {
            this.mensagemErro = 'Erro ao consultar o CEP.';
            this.snackbarErro = true;
          });
      }
    },
    carregarProdutos() {
      ProdutoService.listarProdutos()
        .then(response => {
          this.produtosDisponiveis = response;
        })
        .catch(() => {
          this.mensagemErro = 'Erro ao carregar produtos.';
          this.snackbarErro = true;
        });
    },
    adicionarProduto() {
  if (!this.produtoSelecionado) {
    this.mensagemErro = 'Selecione um produto.';
    this.snackbarErro = true;
    return;
  }

  if (this.quantidade < 1) {
    this.mensagemErro = 'A quantidade deve ser maior que zero.';
    this.snackbarErro = true;
    return;
  }

  const produto = this.produtosDisponiveis.find(p => p.id === this.produtoSelecionado);

  if (produto) {
    // Verifica se o produto já existe no array
    const produtoExistente = this.pedido.produtos.find(p => p.id === produto.id);

    if (produtoExistente) {
      // Se o produto já está na lista, apenas soma a quantidade
      produtoExistente.quantidade += this.quantidade;
    } else {
      // Caso contrário, adiciona um novo item ao array
      this.pedido.produtos.push({ ...produto, quantidade: this.quantidade });
    }

    console.log("Lista atualizada de produtos:", this.pedido.produtos);

    this.produtoSelecionado = null;
    this.quantidade = 1;
  }
},
    removerProduto(id) {
      this.pedido.produtos = this.pedido.produtos.filter(produto => produto.id !== id);
    },
    cadastrarPedido() {
      if (!this.$refs.form.validate()) {
        this.mensagemErro = 'Preencha todos os campos obrigatórios.';
        this.snackbarErro = true;
        return;
      }

      PedidoService.criarPedido(this.pedido)
        .then(() => {
          this.mensagemSucesso = 'Pedido criado com sucesso!';
          this.snackbarSucesso = true;
          this.limparFormulario();
        })
        .catch(() => {
          this.mensagemErro = 'Erro ao criar pedido.';
          this.snackbarErro = true;
        });
    },
    limparFormulario() {
      this.pedido = {
        nomeCliente: '',
        quantidade: null,
        produtos: [],
        endereco: {}
      };
      this.cep = '';
      this.endereco = {
        logradouro: '',
        bairro: '',
        localidade: '',
        estado: ''
      };
    }
  },
  created() {
    this.carregarProdutos();
  }
};
</script>
