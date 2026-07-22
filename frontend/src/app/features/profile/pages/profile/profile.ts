import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfilePage implements OnInit {

  private profileService = inject(ProfileService);

  profile?: Profile;

  ngOnInit(): void {

    this.profileService.getProfile().subscribe({

      next: (response) => {

        this.profile = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}