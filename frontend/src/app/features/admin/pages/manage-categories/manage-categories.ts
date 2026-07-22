import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Category } from '../../../products/models/category.model';
import { CategoryService } from '../../../products/services/category';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.scss',
})
export class ManageCategories implements OnInit {

  private categoryService = inject(CategoryService);

  categories: Category[] = [];

  ngOnInit(): void {

    this.loadCategories();

  }

  loadCategories(): void {

    this.categoryService.getCategories().subscribe({

      next: (response) => {

        this.categories = response.results;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  deleteCategory(id: number): void {

    if (!confirm('Delete this category?')) {

      return;

    }

    this.categoryService.deleteCategory(id).subscribe({

      next: () => {

        alert('Category deleted successfully.');

        this.loadCategories();

      },

      error: (error) => {

        console.error(error);

        alert('Failed to delete category.');

      }

    });

  }

}