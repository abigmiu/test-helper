import { createRouter, createWebHistory } from 'vue-router';
import AppVue from '@/App.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     name: 'Index',
        //     component: AppVue,
        //     children: [],
        // },
        {
            path: '/config',
            name: 'Config',
            component: () => import('@/views/CreateConfig.vue'),
        },
        {
            path: '/select',
            name: 'Select',
            component: () => import('@/views/CopySelect.vue'),
        },
    ],
});

export default router;
