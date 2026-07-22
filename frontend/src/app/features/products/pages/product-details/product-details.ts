import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [ CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  productId!: number;

  product!: Product;

  ngOnInit(): void {

    this.productId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log(product);
      }
    });


  }

}
