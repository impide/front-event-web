import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule],
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
