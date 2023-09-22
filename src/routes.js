import { lazy } from "react"
const Dashboard = lazy(() => import('./components/pages/Dashboard'))
const TablerIcons = lazy(() => import('./components/pages/TablerIcons'))
const SamplePage = lazy(() => import('./components/pages/SamplePage'))
const Forms = lazy(() => import('./components/pages/Forms'))
const Buttons = lazy(() => import('./components/pages/Buttons'))
const Typography = lazy(() => import('./components/pages/Typography'))
const Alerts = lazy(() => import('./components/pages/Alerts'))
const Card = lazy(() => import('./components/pages/Card'))
const routes = [
    {
        path: '/',
        element: Dashboard,
        name: 'Dashboard',
        exact: true
    },
    {
        path: '/tabler-icons',
        element: TablerIcons,
        name: 'TablerIcons',
        exact: true
    },

    {
        path: '/sample-page',
        element: SamplePage,
        name: 'SamplePage',
        exact: true
    },

    {
        path: '/forms',
        element: Forms,
        name: 'Forms',
        exact: true
    },
    {
        path: '/alerts',
        element: Alerts,
        name: 'Alerts',
        exact: true
    },
    {
        path: '/typography',
        element: Typography,
        name: 'Typography',
        exact: true
    },
    {
        path: '/buttons',
        element: Buttons,
        name: 'Buttons',
        exact: true
    },
    {
        path: '/card',
        element: Card,
        name: 'Card',
        exact: true
    },

]

export default routes