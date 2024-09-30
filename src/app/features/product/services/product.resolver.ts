import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';

export const productResolver: ResolveFn<Product> = (route, state) => {
  return {
    id: 'string',
    image: 'string',
    title: 'string',
    price: 'string',
    description: 'string',
    category: 'string',
  };
};
