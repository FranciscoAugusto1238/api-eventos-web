import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/HomeTela.vue';
import CadastroProduto from '../views/produto/CadastrarProduto.vue';
import ListaProdutos from '../views/produto/ListarProduto.vue';
import FinalizarEvento from '../views/cobrancafinalizacao/FinalizarEvento.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', name: 'Home', component: Home },
      { path: 'cadastro-produto', name: 'CadastroProduto', component: CadastroProduto },
      { path: 'listar-produtos', name: 'ListaProdutos', component: ListaProdutos },
      { path: 'cobranca-finalizacao', name: 'FinalizarEvento', component: FinalizarEvento },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
