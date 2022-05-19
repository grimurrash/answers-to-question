import { createRouter, createWebHistory } from 'vue-router'
import CreateFormPage from '@/views/CreateFormPage'
import AnswerPage from '@/views/AnswerPage'
import ChartPage from '@/views/ChartPage'

const routes = [
  {
    path: '/',
    redirect: '/2'
  },
  {
    path: '/admin/create',
    name: 'QuestionsCreate',
    component: CreateFormPage
  },
  {
    path: '/:id',
    name: 'QuestionAnswer',
    component: AnswerPage,
    props: true
  },
  {
    path: '/chart/:id',
    name: 'QuestionChart',
    component: ChartPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
