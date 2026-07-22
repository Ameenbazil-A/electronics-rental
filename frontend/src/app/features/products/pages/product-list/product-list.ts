import { Component, inject, OnInit } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  private categoryService = inject(CategoryService);

  private route = inject(ActivatedRoute);

  products: Product[] = [];

  categories: Category[] = [];

  searchText = '';

  selectedCategory = '';

  selectedSort = '-created_at';

  selectedAvailability = '';

  currentPage = 1;

  totalProducts = 0;

  nextPage: string | null = null;

  previousPage: string | null = null;

  loadProducts(
    search?: string,
    category?: string,
    ordering?: string,
    available?: string
  ): void {

    this.productService.getProducts(
      search,
      category,
      ordering,
      available
    ).subscribe({

      next: (response) => {

        this.products = response.results;

        this.totalProducts = response.count;

        this.nextPage = response.next;

        this.previousPage = response.previous;

      }

      

    });

  }

  loadCategories(): void {

    this.categoryService.getCategories().subscribe({

      next: (response) => {

        this.categories = response.results;

        console.log(response.results);

      }

    });

  }


  onSearch(): void {

    this.currentPage = 1;

    this.loadProducts(
      this.searchText,
      this.selectedCategory,
      this.selectedSort,
      this.selectedAvailability
    );

  }

  onCategoryChange(): void {

    this.currentPage = 1;

    this.loadProducts(
      this.searchText,
      this.selectedCategory,
      this.selectedSort,
      this.selectedAvailability
    );

  }

  onSortChange(): void {

    this.currentPage = 1;

    this.loadProducts(
      this.searchText,
      this.selectedCategory,
      this.selectedSort,
      this.selectedAvailability
    );

  }

  onAvailabilityChange(): void {

    this.currentPage = 1;

    this.loadProducts(
      this.searchText,
      this.selectedCategory,
      this.selectedSort,
      this.selectedAvailability
    );

  }

  goToPage(url: string): void {

    this.productService.getProductsByUrl(url).subscribe({

      next: (response) => {

        this.products = response.results;

        this.totalProducts = response.count;

        this.nextPage = response.next;

        this.previousPage = response.previous;


      // Update current page number
        const pageParam = new URL(url).searchParams.get('page');

        this.currentPage = pageParam ? Number(pageParam) : 1;

      }

    });

  }


  ngOnInit(): void {

    this.loadCategories();

    this.route.queryParams.subscribe(params => {

      this.selectedCategory = params['category'] || '';

      this.loadProducts(
        this.searchText,
        this.selectedCategory,
        this.selectedSort,
        this.selectedAvailability
      );

    });

  }  
  

}