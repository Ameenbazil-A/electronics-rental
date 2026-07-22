

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/models/product.model';
import { ProductCard } from '../../products/components/product-card/product-card';

import { CategoryService } from '../../products/services/category';
import { Category } from '../../products/models/category.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule,
    RouterLink,
    ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home implements OnInit {

  private productService = inject(ProductService);

  private categoryService = inject(CategoryService);

  featuredProducts: Product[] = [];

  categories: Category[] = [];

  ngOnInit(): void {

    this.loadFeaturedProducts();

    this.loadCategories();

  }

  loadCategories(): void {

    this.categoryService.getCategories().subscribe({

      next: (response) => {

        this.categories = response.results.slice(0, 6);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  loadFeaturedProducts(): void {

    this.productService.getProducts().subscribe({

      next: (response) => {

        this.featuredProducts = response.results.slice(0, 4);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
