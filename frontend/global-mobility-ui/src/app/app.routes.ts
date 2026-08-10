import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Countries } from './pages/countries/countries';

import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { Services } from './pages/services/services';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'jobs',
        component: Jobs
      },
      {
        path: 'countries',
        component: Countries
      },
      {
        path: 'services',
        component: Services
      },
      {
        path: 'about',
        component: About
      },
      {
        path: 'contact',
        component: Contact
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];