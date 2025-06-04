import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/HomeTela.vue';
import CadastroDespesaIndividual from '../views/cadastro/CadastroDespesaIndividual.vue';



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', name: 'Home', component: Home },
      { path: '/cadastro-despesa-individual', name: 'CadastroDespesaIndividual', component: CadastroDespesaIndividual },
    ],
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
