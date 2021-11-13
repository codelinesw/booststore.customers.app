import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/Utils/auth.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'view-products',
    loadChildren: () =>
      import('./pages/view-products/view-products.module').then(
        (m) => m.ViewProductsPageModule
      ),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'sales',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/sales/sales.module').then((m) => m.SalesPageModule),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'view-store',
    loadChildren: () =>
      import('./pages/view-store/view-store.module').then(
        (m) => m.ViewStorePageModule
      ),
  },
  {
    path: 'home-delivery',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home-delivery/home-delivery.module').then(
        (m) => m.HomeDeliveryPageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'restore-password',
    loadChildren: () =>
      import('./pages/restore-password/restore-password.module').then(
        (m) => m.RestorePasswordPageModule
      ),
  },
  {
    path: 'signup-shop',
    loadChildren: () =>
      import('./pages/signup-shop/signup-shop.module').then(
        (m) => m.SignupShopPageModule
      ),
  },
  {
    path: 'view-messages',
    loadChildren: () =>
      import('./pages/view-messages/view-messages.module').then(
        (m) => m.ViewMessagesPageModule
      ),
  },
  {
    path: 'my-store',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/my-store/my-store.module').then(
        (m) => m.MyStorePageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/message/message.module').then((m) => m.MessagePageModule),
  },
  {
    path: 'finalize-order',
    loadChildren: () =>
      import('./pages/finalize-order/finalize-order.module').then((m) => m.FinalizeOrderPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
