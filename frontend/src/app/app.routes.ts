import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './features/home/home/home';
import { ProductList } from './features/products/pages/product-list/product-list';
import { ProductDetails } from './features/products/pages/product-details/product-details';

import { Login } from './features/auth/pages/login/login';

import { Register } from './features/auth/pages/register/register';

import { Bookings } from './features/bookings/pages/bookings/bookings';

import { authGuard } from './core/guards/auth-guard';

import { CreateBooking } from './features/bookings/pages/create-booking/create-booking';

import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';

import { ManageBookings } from './features/admin/pages/manage-bookings/manage-bookings';

import { ManageProducts } from './features/admin/pages/manage-products/manage-products';

import { AddProduct } from './features/admin/pages/add-product/add-product';
import { EditProduct } from './features/admin/pages/edit-product/edit-product';

import { ManageCategories } from './features/admin/pages/manage-categories/manage-categories';
import { AddCategory } from './features/admin/pages/add-category/add-category';
import { EditCategory } from './features/admin/pages/edit-category/edit-category';

import { ProfilePage } from './features/profile/pages/profile/profile';

import { EditProfile } from './features/profile/pages/edit-profile/edit-profile';

import { ChangePassword } from './features/profile/pages/change-password/change-password';

import { MyBookings } from './features/bookings/pages/my-bookings/my-bookings';

import { ManageUsers } from './features/admin/pages/manage-users/manage-users';



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
        path: 'products',
        component: ProductList
      },
      {
        path: 'products/:id',
        component: ProductDetails
      },

      {
        path: 'bookings/create/:id',
        component: CreateBooking,
        canActivate: [authGuard]
      },

      {
        path: 'bookings',
        component: Bookings,
        canActivate: [authGuard]
      },

      {
        path: 'admin',
        component: AdminDashboard,
        canActivate: [authGuard]
      },

      {
        path: 'admin/bookings',
        component: ManageBookings,
        canActivate: [authGuard]
      },

      {
        path: 'admin/products',
        component: ManageProducts,
        canActivate: [authGuard]
      },

      {
        path: 'admin/products/add',
        component: AddProduct,
        canActivate: [authGuard]
      },
      {
        path: 'admin/products/edit/:id',
        component: EditProduct,
        canActivate: [authGuard]
      },

      {
        path: 'admin/categories',
        component: ManageCategories,
        canActivate: [authGuard]
      },
      {
        path: 'admin/categories/add',
        component: AddCategory,
        canActivate: [authGuard]
      },
      {
        path: 'admin/categories/edit/:id',
        component: EditCategory,
        canActivate: [authGuard]
      },

      {
        path: 'profile',
        component: ProfilePage,
        canActivate: [authGuard]
      },

      {
        path: 'profile/edit',
        component: EditProfile,
        canActivate: [authGuard]
      },

      {
        path: 'profile/change-password',
        component: ChangePassword,
        canActivate: [authGuard]
      },

      {
        path: 'my-bookings',
        component: MyBookings,
        canActivate: [authGuard]
      },

      {
        path: 'admin/users',
        component: ManageUsers,
        canActivate: [authGuard]
      }

    ]
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  




];