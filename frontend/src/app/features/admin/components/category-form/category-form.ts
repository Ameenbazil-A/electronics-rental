import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../products/services/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit {

  private fb = inject(FormBuilder);

  private categoryService = inject(CategoryService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  categoryId: number | null = null;

  isEditMode = false;

  categoryForm = this.fb.group({

    name: ['', Validators.required]

  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.categoryId = Number(id);

      this.isEditMode = true;

      this.loadCategory();

    }

  }

  loadCategory(): void {

    if (!this.categoryId) return;

    this.categoryService.getCategory(this.categoryId).subscribe({

      next: (category) => {

        this.categoryForm.patchValue({

          name: category.name

        });

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  saveCategory(): void {

    if (this.categoryForm.invalid) {

      this.categoryForm.markAllAsTouched();

      return;

    }

    const data = this.categoryForm.value;

    if (this.isEditMode && this.categoryId) {

      this.categoryService.updateCategory(this.categoryId, data).subscribe({

        next: () => {

          alert('Category updated successfully.');

          this.router.navigate(['/admin/categories']);

        },

        error: (error) => {

          console.error(error);

          alert('Failed to update category.');

        }

      });

    } else {

      this.categoryService.createCategory(data).subscribe({

        next: () => {

          alert('Category created successfully.');

          this.router.navigate(['/admin/categories']);

        },

        error: (error) => {

          console.error(error);

          alert('Failed to create category.');

        }

      });

    }

  }

}