import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';

import { Countries } from './pages/countries/countries';
import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { Services } from './pages/services/services';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

import { AdminLogin } from './pages/admin/admin-login/admin-login';
import { Enquiries } from './pages/admin/enquiries/enquiries';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [

  // ==========================================
  // PUBLIC WEBSITE
  // ==========================================

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


  // ==========================================
  // ADMIN
  // ==========================================

  {
    path: 'admin',

    children: [

      {
        path: 'login',
        component: AdminLogin
      },

      {
        path: 'enquiries',
        component: Enquiries,
        canActivate: [authGuard]
      }

    ]

  },


  // ==========================================
  // INVALID URL
  // ==========================================

  {
    path: '**',
    redirectTo: ''
  }

];