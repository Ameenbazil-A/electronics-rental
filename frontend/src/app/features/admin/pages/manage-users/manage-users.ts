import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss',
})
export class ManageUsers implements OnInit {

  private userService = inject(UserService);

  users: User[] = [];

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void {

    this.userService.getUsers().subscribe({

      next: (response) => {

          this.users = response.results;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}