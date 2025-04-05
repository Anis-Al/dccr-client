import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout" [class.sidebar-collapsed]="sidebarCollapsed">
      <aside class="sidebar">
        <div class="sidebar-header">
          <img src="/assets/sga-logo.png" alt="Logo" class="logo">
          <button class="collapse-btn" (click)="toggleSidebar()">
            <i [class]="sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
          </button>
        </div>

        <nav class="nav-menu">
          <a *ngFor="let item of navItems"
             [routerLink]="item.route"
             routerLinkActive="active"
             class="nav-item">
            <i [class]="'fas ' + item.icon"></i>
            <span class="nav-label">{{ item.label }}</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="footer-actions">
            <button class="btn btn-icon" (click)="onLogout()" *ngIf="!sidebarCollapsed">
              <i class="fas fa-sign-out-alt"></i>
              <span>Déconnexion</span>
            </button>
            <button class="btn btn-icon" (click)="onLogout()" *ngIf="sidebarCollapsed" title="Déconnexion">
              <i class="fas fa-sign-out-alt"></i>
            </button>
            <button class="btn btn-icon" (click)="toggleGuide()" *ngIf="!sidebarCollapsed">
              <i class="fas fa-question-circle"></i>
              <span>Guide d'utilisation</span>
            </button>
            <button class="btn btn-icon" (click)="toggleGuide()" *ngIf="sidebarCollapsed" title="Guide d'utilisation">
              <i class="fas fa-question-circle"></i>
            </button>
          </div>

          <div class="user-info">
            <img src="/assets/default-avatar.svg" alt="Avatar" class="avatar">
            <div class="user-details" *ngIf="!sidebarCollapsed">
              <span class="user-name">Alim Anis</span>
              <span class="user-role">Validateur</span>
            </div>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
    }

    .sidebar {
      width: 250px;
      background-color: white;
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;

      .layout.sidebar-collapsed & {
        width: 64px;
      }
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);

      .logo {
        height: 30px;
        max-width: 150px;
        object-fit: contain;

        .layout.sidebar-collapsed & {
          display: none;
        }
      }
    }

    .collapse-btn {
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      padding: 0.5rem;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }

    .nav-menu {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: var(--text-color);
      text-decoration: none;
      gap: 0.75rem;
      opacity: 0.7;
      transition: all 0.2s ease;

      &:hover {
        opacity: 1;
        background-color: var(--hover-color);
      }

      &.active {
        opacity: 1;
        background-color: var(--primary-color-light);
        color: var(--primary-color);
        font-weight: 500;
      }

      i {
        font-size: 1.25rem;
        width: 24px;
        text-align: center;
      }

      .nav-label {
        .layout.sidebar-collapsed & {
          display: none;
        }
      }
    }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .footer-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .btn-icon {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        color: var(--text-color);
        opacity: 0.7;
        transition: all 0.2s ease;
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
          opacity: 1;
          background-color: var(--hover-color);
        }

        i {
          font-size: 1.25rem;
          width: 24px;
          text-align: center;
        }

        span {
          .layout.sidebar-collapsed & {
            display: none;
          }
        }
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      .user-details {
        .layout.sidebar-collapsed & {
          display: none;
        }
      }

      .user-name {
        display: block;
        font-weight: 500;
        font-size: 0.875rem;
      }

      .user-role {
        display: block;
        font-size: 0.75rem;
        color: var(--text-color-light);
      }
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background-color: var(--background-color);
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        height: 100vh;
        z-index: 1000;
        transform: translateX(0);
        transition: transform 0.3s ease;

        .layout.sidebar-collapsed & {
          transform: translateX(-100%);
        }
      }

      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class LayoutComponent {
  sidebarCollapsed = false;
  
  navItems: NavItem[] = [
    { label: 'Tableau de Bord', route: '/tableau-de-bord', icon: 'fa-chart-line' },
    { label: 'Fichiers Excel', route: '/fichiers-excel', icon: 'fa-file-excel' },
    { label: 'Crédits', route: '/prets', icon: 'fa-money-bill' },
    { label: 'Fichiers XML', route: '/fichiers-xml', icon: 'fa-file-code' },
    { label: "Journaux d'Audit", route: '/journaux-audit', icon: 'fa-history' },
    { label: 'Utilisateurs', route: '/utilisateurs', icon: 'fa-users' }
  ];

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onLogout() {
    // Implement the logout logic here
  }

  toggleGuide() {
    // Implement the guide toggle logic here
  }
} 