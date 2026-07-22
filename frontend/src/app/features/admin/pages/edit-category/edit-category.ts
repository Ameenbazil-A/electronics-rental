import { Component } from '@angular/core';
import { CategoryForm } from '../../components/category-form/category-form';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CategoryForm],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.scss',
})
export class EditCategory {}