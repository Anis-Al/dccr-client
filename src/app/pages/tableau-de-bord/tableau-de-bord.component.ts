import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  trend?: number;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: Date;
  user: string;
}

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tableau-de-bord">
      <div class="header">
        <h1>Tableau de Bord</h1>
      </div>

      <div class="stats-grid">
        <div class="stat-card card" *ngFor="let stat of stats">
          <div class="stat-icon">
            <i [class]="'fas ' + stat.icon"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-trend" *ngIf="stat.trend !== undefined" [class.positive]="stat.trend > 0" [class.negative]="stat.trend < 0">
              <i [class]="stat.trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stat.trend) }}%
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Activité Récente</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Utilisateur</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let activity of activities">
              <td>{{ activity.type }}</td>
              <td>{{ activity.description }}</td>
              <td>{{ activity.user }}</td>
              <td>{{ activity.date | date:'dd/MM/yyyy HH:mm' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .tableau-de-bord {
      padding: 1rem;
    }

    .header {
      margin-bottom: 1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .stat-card {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      gap: 1rem;
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background-color: var(--primary-color-light);
      color: var(--primary-color);

      i {
        font-size: 1.5rem;
      }
    }

    .stat-content {
      flex: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-color-light);
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .stat-trend {
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      &.positive {
        color: var(--success-color);
      }

      &.negative {
        color: var(--error-color);
      }

      i {
        font-size: 0.75rem;
      }
    }

    h2 {
      margin-bottom: 1rem;
    }
  `]
})
export class TableauDeBordComponent {
  Math = Math;

  stats: StatCard[] = [
    {
      label: 'Prêts Actifs',
      value: 156,
      icon: 'fa-money-check-alt',
      trend: 12
    },
    {
      label: 'Fichiers Excel',
      value: 24,
      icon: 'fa-file-excel',
      trend: 5
    },
    {
      label: 'Documents XML',
      value: 47,
      icon: 'fa-file-code',
      trend: -3
    },
    {
      label: 'Utilisateurs Actifs',
      value: 18,
      icon: 'fa-users',
      trend: 0
    }
  ];

  activities: Activity[] = [
    {
      id: '1',
      type: 'Prêt',
      description: 'Nouveau prêt créé pour Jean Martin',
      date: new Date('2024-03-20T16:30:00'),
      user: 'Marie Dubois'
    },
    {
      id: '2',
      type: 'Export',
      description: 'Export SEPA généré avec succès',
      date: new Date('2024-03-20T15:45:00'),
      user: 'Pierre Martin'
    },
    {
      id: '3',
      type: 'Utilisateur',
      description: 'Nouvel utilisateur ajouté: Sophie Bernard',
      date: new Date('2024-03-20T14:20:00'),
      user: 'Thomas Laurent'
    },
    {
      id: '4',
      type: 'Import',
      description: 'Import Excel des données clients',
      date: new Date('2024-03-20T13:10:00'),
      user: 'Marie Dubois'
    }
  ];
} 