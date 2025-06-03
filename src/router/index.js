import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/HomeTela.vue';
import ListaPresenca from '../views/pagamento/ListaPresenca.vue';
import PagamentoPix from '../views/pagamento/PagamentoPix.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', name: 'Home', component: Home },
      { path: '/lista-presenca', name: 'ListaPresenca', component: ListaPresenca },
      { path: '/pagamento-pix', name: 'PagamentoPix', component: PagamentoPix },
    ],
  }
  
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
