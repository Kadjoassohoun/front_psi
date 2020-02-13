import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ListStudents from '@/components/ListStudents'
import ViewStudent from '@/components/ViewStudent'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
