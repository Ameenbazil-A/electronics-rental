import { Component } from '@angular/core';
import { CategoryForm } from '../../components/category-form/category-form';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CategoryForm],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory {}