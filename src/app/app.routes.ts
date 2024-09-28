import { Routes } from '@angular/router';
import { productResolver } from './product/services/product.resolver';

export const routes: Routes = [
  {
    path: 'product',
    loadComponent: () => import('./product/components/product/product.component').then(mod => mod.ProductComponent),
    resolve: { data: productResolver },
  },
];
