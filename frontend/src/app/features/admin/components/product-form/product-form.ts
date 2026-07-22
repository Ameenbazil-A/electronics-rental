import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnInit } from '@angular/core';

import { CategoryService } from '../../../products/services/category';

import { Category } from '../../../products/models/category.model';

import { Router } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../products/models/product.model';

import { ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {

  private categoryService = inject(CategoryService);

  private productService = inject(ProductService);

  private router = inject(Router);

  private toastr = inject(ToastrService);

  private route = inject(ActivatedRoute);

  categories: Category[] = [];

  selectedImage: File | null = null;

  previewUrl: string | null = null;

  productId: number | null = null;

  isEditMode = false;

  private fb = inject(FormBuilder);

  productForm = this.fb.group({

    name: ['', Validators.required],

    brand: ['', Validators.required],

    model_name: ['', Validators.required],

    category: [0, Validators.required],

    daily_rent: [0, Validators.required],

    weekly_rent: [0, Validators.required],

    monthly_rent: [0, Validators.required],

    security_deposit: [0, Validators.required],

    stock: [1, Validators.required],

    description: [''],

    available: [true]

  });

  ngOnInit(): void {

    

    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.productId = Number(id);

      this.isEditMode = true;

      this.loadProduct();

    }

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

  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedImage = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.previewUrl = reader.result as string;

    };

    reader.readAsDataURL(this.selectedImage);

  }

  saveProduct(): void {

    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;

    }

    const formData = new FormData();

    Object.entries(this.productForm.value).forEach(([key, value]) => {

      if (value !== null && value !== undefined) {

        formData.append(key, String(value));

      }

    });

    if (this.selectedImage) {

      formData.append('image', this.selectedImage);

    }

    if (this.isEditMode && this.productId) {

      this.productService.updateProduct(this.productId, formData).subscribe({

        next: () => {

          this.toastr.success(
            'Product updated successfully!',
            'Success'
          );

          setTimeout(() => {

            this.router.navigate(['/admin/products']);

            }, 1000);

        },

        error: (error) => {

          console.error(error);

          this.toastr.error(
            'Failed to update product.',
            'Error'
          );

        }

      });

    } else {

      this.productService.createProduct(formData).subscribe({

        next: () => {

          this.toastr.success(
            'Product created successfully!',
            'Success'
          );

          setTimeout(() => {

            this.router.navigate(['/admin/products']);

          }, 1000);

        },

        error: (error) => {

          console.error(error);

          this.toastr.error(
            'Failed to create product.',
            'Error'
          );

        }

      });

    }

  }

  loadProduct(): void {

    if (!this.productId) return;

    this.productService.getProduct(this.productId).subscribe({

      next: (product: Product) => {

        this.productForm.patchValue({
          name: product.name,
          brand: product.brand,
          model_name: product.model_name,

          category: product.category,

          daily_rent: Number(product.daily_rent),
          weekly_rent: Number(product.weekly_rent),
          monthly_rent: Number(product.monthly_rent),
          security_deposit: Number(product.security_deposit),

          stock: product.stock,
          description: product.description,
          available: product.available
        });

        this.previewUrl = product.image;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}