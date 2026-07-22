import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/models/product.model';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.scss',
})
export class ManageProducts implements OnInit {

  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (response) => {

        this.products = response.results;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  deleteProduct(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({

      next: () => {

        alert('Product deleted successfully.');

        this.loadProducts();

      },

      error: (error) => {

        console.error(error);

        alert('Unable to delete product.');

      }

    });

  }

}