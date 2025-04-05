import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Tableau de Bord</h1>
      <!-- Dashboard content will be added later -->
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 1rem;
    }
  `]
})
export class DashboardComponent {} 