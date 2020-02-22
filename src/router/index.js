import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ListStudents from '@/components/ListStudents'
import ListEntreprises from '@/components/ListEntreprises'
import ViewStudent from '@/components/ViewStudent'
import ViewEntreprise from "../components/ViewEntreprise";
import ViewMetier from "../components/ViewMetier";
import ListMetiers from "../components/ListMetiers";



Vue.use(Router)


 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/etudiants',
      name: 'ListStudents',
      component: ListStudents
    },

    {
      path: '/entreprises',
      name: 'ListEntreprises',
      component: ListEntreprises
    },
    {
      path: '/etudiant/:id',
      name: 'ViewStudent',
      component: ViewStudent
    },
    {
      path: '/entreprise/:id',
      name: 'ViewEntreprise',
      component: ViewEntreprise
    }, {
      path: '/metiers',
      name: 'ListMetiers',
      component: ListMetiers
    },
    {
      path: '/metier/:id',
      name: 'ViewMetier',
      component: ViewMetier
    }
  ]
})
export default router;