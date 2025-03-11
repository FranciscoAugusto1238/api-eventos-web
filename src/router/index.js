import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/HomeTela.vue';
import CadastroProduto from '../views/produto/CadastrarProduto.vue';
import ListaProdutos from '../views/produto/ListarProduto.vue';
import CadastroPedido from '../views/pedido/CadastroPedido.vue';
import ListarPedido from '../views/pedido/ListarPedido.vue';
import StatusPedido from '../views/pedido/StatusPedido.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', name: 'Home', component: Home },
      { path: '/cadastro-produto', name: 'CadastroProduto', component: CadastroProduto },
      { path: '/listar-produtos', name: 'ListaProdutos', component: ListaProdutos },
      { path: '/cadastro-pedido', name: 'CadastroPedido', component: CadastroPedido },
      { path: '/listar-pedido', name: 'ListaPedido', component: ListarPedido },
      { path: '/atualizar-status-pedido/:id', name: 'StatusPedido', component: StatusPedido }
    ],
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
