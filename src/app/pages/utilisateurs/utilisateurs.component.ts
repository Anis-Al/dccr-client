import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: string;
  nom: string;
  email: string;
  role: 'Admin' | 'Gestionnaire' | 'Analyste';
  statut: 'Actif' | 'Inactif';
  derniereConnexion: Date | null;
}

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="utilisateurs">
      <div class="header">
        <h1>Gestion des Utilisateurs</h1>
        <button class="btn btn-primary">
          <i class="fas fa-plus"></i>
          Nouvel Utilisateur
        </button>
      </div>

      <div class="filters card">
        <div class="form-grid">
          <div class="form-group">
            <label>Rechercher</label>
            <input type="text" class="form-control" placeholder="Nom ou email">
          </div>

          <div class="form-group">
            <label>Rôle</label>
            <select class="form-control">
              <option value="">Tous les rôles</option>
              <option value="admin">Admin</option>
              <option value="gestionnaire">Gestionnaire</option>
              <option value="analyste">Analyste</option>
            </select>
          </div>

          <div class="form-group">
            <label>Statut</label>
            <select class="form-control">
              <option value="">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Dernière Connexion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of utilisateurs">
              <td>
                <div class="user-info">
                  <img [src]="'/assets/default-avatar.svg'" alt="Avatar" class="avatar">
                  <span>{{ user.nom }}</span>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>
                <span class="role-badge" [class]="user.role.toLowerCase()">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span class="status-badge" [class]="user.statut.toLowerCase()">
                  {{ user.statut }}
                </span>
              </td>
              <td>
                {{ user.derniereConnexion ? (user.derniereConnexion | date:'dd/MM/yyyy HH:mm') : 'Jamais' }}
              </td>
              <td>
                <div class="actions">
                  <button class="btn-icon" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-icon" [title]="user.statut === 'Actif' ? 'Désactiver' : 'Activer'">
                    <i [class]="user.statut === 'Actif' ? 'fas fa-ban' : 'fas fa-check'"></i>
                  </button>
                  <button class="btn-icon" title="Réinitialiser le mot de passe">
                    <i class="fas fa-key"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button class="btn btn-secondary" disabled>
            <i class="fas fa-chevron-left"></i>
            Précédent
          </button>
          <span>Page 1 sur 3</span>
          <button class="btn btn-secondary">
            Suivant
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .utilisateurs {
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .filters {
      margin-bottom: 1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }

    .role-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.admin {
        background-color: #e8eaf6;
        color: #3f51b5;
      }

      &.gestionnaire {
        background-color: #e0f2f1;
        color: #009688;
      }

      &.analyste {
        background-color: #f3e5f5;
        color: #9c27b0;
      }
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.actif {
        background-color: #e8f5e9;
        color: var(--success-color);
      }

      &.inactif {
        background-color: #fafafa;
        color: #9e9e9e;
      }
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      color: var(--text-color);
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);

      .btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  `]
})
export class UtilisateursComponent {
  utilisateurs: User[] = [
    {
      id: '1',
      nom: 'Thomas Laurent',
      email: 'thomas.laurent@banque.fr',
      role: 'Admin',
      statut: 'Actif',
      derniereConnexion: new Date('2024-03-20T16:45:00')
    },
    {
      id: '2',
      nom: 'Marie Dubois',
      email: 'marie.dubois@banque.fr',
      role: 'Gestionnaire',
      statut: 'Actif',
      derniereConnexion: new Date('2024-03-20T15:30:00')
    },
    {
      id: '3',
      nom: 'Pierre Martin',
      email: 'pierre.martin@banque.fr',
      role: 'Analyste',
      statut: 'Actif',
      derniereConnexion: new Date('2024-03-20T14:15:00')
    },
    {
      id: '4',
      nom: 'Sophie Bernard',
      email: 'sophie.bernard@banque.fr',
      role: 'Gestionnaire',
      statut: 'Inactif',
      derniereConnexion: new Date('2024-03-19T11:20:00')
    }
  ];
} 