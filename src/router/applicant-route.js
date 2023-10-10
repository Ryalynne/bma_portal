export const applicantRoute = (prop) => [
    {
        path: '/applicant/dashboard',
        name: prop + '.dashboard',
        meta: { auth: true, name: 'Dashboard', user: 'applicant' },
        component: () => import('../views/applicant/ApplicantDashboard.vue')
    },
    {
        path: '/applicant/applicant-information',
        name: prop + '.applicant-information',
        meta: { auth: true, name: 'Applicant Information Form', user: 'applicant' },
        component: () => import('../views/applicant/entrance-examination-overview/ApplicantFormInformation.vue')
    }
]