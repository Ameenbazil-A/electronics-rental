import { Component } from '@angular/core';
import { ProductForm } from '../../components/product-form/product-form';

@Component({
  selector: 'app-add-product',
  imports: [ProductForm],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {

}
