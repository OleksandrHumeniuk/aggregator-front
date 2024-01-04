import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/tracking',
    name: 'Home',
    component: () => import('@/views/TrackingView/TrackingView.vue'),
  },
  {
    path: '/calculate',
    name: 'Calculator',
    component: () => import('@/views/CalculatorView/CalculatorView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView/AboutView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView/ProfileView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async to => {
  if (!to.matched.length) return { name: 'Home' };
});

export default router;
