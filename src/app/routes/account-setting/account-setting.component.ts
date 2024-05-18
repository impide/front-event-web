import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, RouterModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css',
})
export class AccountSettingComponent {
  showMenu: boolean = false;
  toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }
  closeSidebar(): void {
    if (window.innerWidth < 1024) {
      this.showMenu = false;
    }
  }
}
