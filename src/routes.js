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
        exact: true,
        icon: 'layout-dashboard'
    },


    {
        path: '/forms',
        element: Forms,
        name: 'Forms',
        exact: true,
        icon: 'file-description'
    },
    {
        path: '/alerts',
        element: Alerts,
        name: 'Alerts',
        exact: true,
        icon: 'alert-circle'
    },
    {
        path: '/typography',
        element: Typography,
        name: 'Typography',
        exact: true,
        icon: 'typography'
    },
    {
        path: '/buttons',
        element: Buttons,
        name: 'Buttons',
        exact: true,
        icon: 'article'
    },
    {
        path: '/card',
        element: Card,
        name: 'Card',
        exact: true,
        icon: 'cards'
    },
    {
        path: '/tabler-icons',
        element: TablerIcons,
        name: 'Tabler Icons',
        exact: true,
        icon: 'mood-happy'
    },
    {
        path: '/sample-page',
        element: SamplePage,
        name: 'Sample Page',
        exact: true,
        icon: 'aperture'
    },

]

export default routes