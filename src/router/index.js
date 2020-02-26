import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ListStudents from '@/components/ListStudents'
import ListEntreprises from '@/components/ListEntreprises'
import ViewStudent from '@/components/ViewStudent'
import ViewEntreprise from "../components/ViewEntreprise";


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
      path: '/etudiant/:id',
      name: 'ViewStudent',
      component: ViewStudent
    },
    {
      path: '/entreprises',
      name: 'ListEntreprises',
      component: ListEntreprises
    },
    {
      path: '/entreprise/:id',
      name: 'ViewEntreprise',
      component: ViewEntreprise
    }
  ]
})
export default router;