import { lazy } from "react"
const Dashboard = lazy(() => import('./components/pages/Dashboard'))
const TablerIcons = lazy(() => import('./components/pages/TablerIcons'))
// const SamplePage = lazy(() => import('./components/pages/SamplePage'))
// const Forms = lazy(() => import('./components/pages/Forms'))
// const Buttons = lazy(() => import('./components/pages/Buttons'))
// const Typography = lazy(() => import('./components/pages/Typography'))
// const Alerts = lazy(() => import('./components/pages/Alerts'))
// const Card = lazy(() => import('./components/pages/Card'))
const Candidats = lazy(() => import('./components/pages/Candidats'))
const Profile = lazy(() => import('./components/pages/Profile'))
const Consultant = lazy(() => import('./components/pages/Consultants'))
const Evaluateur = lazy(() => import('./components/pages/Evaluateurs'))
const Formulaire = lazy(() => import('./components/pages/Formulaire'))
const Question = lazy(() => import('./components/pages/Question'))

export const routes = [
    {
        path: '/',
        element: Dashboard,
        name: 'Dashboard',
        exact: true,
        icon: 'layout-dashboard'
    },
    {
        path: '/profile',
        element: Profile,
        name: 'Profile',
        exact: true,
        icon: 'file-description'
    },
    {
        path: '/candidats',
        element: Candidats,
        name: 'Candidats',
        exact: true,
        icon: 'users'
    },
    // {
    //     path: '/forms',
    //     element: Forms,
    //     name: 'Forms',
    //     exact: true,
    //     icon: 'file-description'
    // },
    // {
    //     path: '/alerts',
    //     element: Alerts,
    //     name: 'Alerts',
    //     exact: true,
    //     icon: 'alert-circle'
    // },
    // {
    //     path: '/typography',
    //     element: Typography,
    //     name: 'Typography',
    //     exact: true,
    //     icon: 'typography'
    // },
    // {
    //     path: '/buttons',
    //     element: Buttons,
    //     name: 'Buttons',
    //     exact: true,
    //     icon: 'article'
    // },
    // {
    //     path: '/card',
    //     element: Card,
    //     name: 'Card',
    //     exact: true,
    //     icon: 'cards'
    // },
    {
        path: '/tabler-icons',
        element: TablerIcons,
        name: 'Tabler Icons',
        exact: true,
        icon: 'mood-happy'
    },
    // {
    //     path: '/sample-page',
    //     element: SamplePage,
    //     name: 'Sample Page',
    //     exact: true,
    //     icon: 'aperture'
    // },

    {
        path: '/consultant',
        element: Consultant,
        name: 'Consultant RH',
        exact: true,
        icon: 'building-community'
    },
    {
        path: '/evaluateur',
        element: Evaluateur,
        name: 'Evaluateur',
        exact: true,
        icon: 'list-search'
    },
    {
        path: '/form',
        element: Formulaire,
        name: 'Formulaires',
        exact: true,
        icon: 'files'
    },
    {
        path: '/question',
        element: Question,
        name: 'Questions',
        exact: true,
        icon: 'question-mark'
    },
    {
        path: '/evaluateur',
        element: Evaluateur,
        name: 'Evaluateur',
        exact: true,
        icon: 'list-search'
    },

]