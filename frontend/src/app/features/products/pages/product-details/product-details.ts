import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-details',
  imports: [ CommonModule, RouterLink, ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  productId!: number;

  product!: Product;

  relatedProducts: Product[] = [];




  loadRelatedProducts(): void {

    this.productService.getProducts(
      '',
      String(this.product.category)
    ).subscribe({

      next: (response) => {

        this.relatedProducts = response.results
          .filter(item => item.id !== this.product.id)
          .slice(0, 4);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }
  
  loadProduct(id: number): void {

    this.productService.getProduct(id).subscribe({

      next: (product) => {

        this.product = product;

        this.loadRelatedProducts();

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      },

      error: (error) => {

        console.error(error);

      }

    });

  }  

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      this.productId = id;

      this.loadProduct(id);

    });

  }  

}
