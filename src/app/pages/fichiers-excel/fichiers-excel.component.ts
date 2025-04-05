import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExcelFile {
  id: string;
  nom: string;
  type: 'Clients' | 'Prêts' | 'Transactions';
  taille: string;
  dateImport: Date;
  statut: 'Validé' | 'En validation' | 'Erreur';
  lignes: number;
}

@Component({
  selector: 'app-fichiers-excel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fichiers-excel">
      <div class="header">
        <h1>Gestion des Fichiers Excel</h1>
        <button class="btn btn-primary">
          <i class="fas fa-upload"></i>
          Importer un fichier
        </button>
      </div>

      <div class="upload-zone card" (dragover)="$event.preventDefault()" (drop)="$event.preventDefault()">
        <i class="fas fa-file-excel"></i>
        <p>Glissez-déposez vos fichiers Excel ici</p>
        <p class="text-muted">ou</p>
        <button class="btn btn-secondary">
          Parcourir les fichiers
        </button>
        <p class="text-muted">Formats acceptés: .xlsx, .xls</p>
      </div>

      <div class="filters card">
        <div class="form-grid">
          <div class="form-group">
            <label>Rechercher</label>
            <input type="text" class="form-control" placeholder="Nom du fichier">
          </div>

          <div class="form-group">
            <label>Type</label>
            <select class="form-control">
              <option value="">Tous les types</option>
              <option value="clients">Clients</option>
              <option value="prets">Prêts</option>
              <option value="transactions">Transactions</option>
            </select>
          </div>

          <div class="form-group">
            <label>Statut</label>
            <select class="form-control">
              <option value="">Tous les statuts</option>
              <option value="valide">Validé</option>
              <option value="en-validation">En validation</option>
              <option value="erreur">Erreur</option>
            </select>
          </div>

          <div class="form-group">
            <label>Période</label>
            <select class="form-control">
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nom du fichier</th>
                <th>Type</th>
                <th>Taille</th>
                <th>Lignes</th>
                <th>Date d'import</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let fichier of fichiers">
                <td>
                  <div class="file-info">
                    <i class="fas fa-file-excel"></i>
                    <span>{{ fichier.nom }}</span>
                  </div>
                </td>
                <td>{{ fichier.type }}</td>
                <td>{{ fichier.taille }}</td>
                <td>{{ fichier.lignes }}</td>
                <td>{{ fichier.dateImport | date:'dd/MM/yyyy HH:mm' }}</td>
                <td>
                  <span class="status-badge" [class]="fichier.statut.toLowerCase().replace(' ', '-')">
                    {{ fichier.statut }}
                  </span>
                </td>
                <td>
                  <div class="actions">
                    <button class="btn-icon" title="Télécharger">
                      <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-icon" title="Valider" *ngIf="fichier.statut === 'En validation'">
                      <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon" title="Voir les erreurs" *ngIf="fichier.statut === 'Erreur'">
                      <i class="fas fa-exclamation-circle"></i>
                    </button>
                    <button class="btn-icon" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
    .fichiers-excel {
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .upload-zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      margin-bottom: 1rem;
      border: 2px dashed var(--border-color);
      border-radius: 8px;
      background-color: var(--background-color);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--primary-color);
        background-color: var(--primary-color-light);
      }

      i {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
      }

      p {
        margin: 0.5rem 0;
        
        &.text-muted {
          color: var(--text-color-light);
          font-size: 0.875rem;
        }
      }
    }

    .filters {
      margin-bottom: 1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .table-responsive {
      overflow-x: auto;
      margin: 0 -1rem;
      padding: 0 1rem;
      scrollbar-width: thin;
      
      &::-webkit-scrollbar {
        height: 8px;
      }
      
      &::-webkit-scrollbar-track {
        background: var(--background-color);
        border-radius: 4px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
        
        &:hover {
          background: #bdbdbd;
        }
      }

      table {
        min-width: 800px;
      }
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      i {
        color: var(--primary-color);
      }
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.validé {
        background-color: #e8f5e9;
        color: var(--success-color);
      }

      &.erreur {
        background-color: #ffebee;
        color: var(--error-color);
      }

      &.en-validation {
        background-color: #fff3e0;
        color: #f57c00;
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
export class FichiersExcelComponent {
  fichiers: ExcelFile[] = [
    {
      id: '1',
      nom: 'clients_mars_2024.xlsx',
      type: 'Clients',
      taille: '2.4 MB',
      lignes: 1250,
      dateImport: new Date('2024-03-20T14:30:00'),
      statut: 'Validé'
    },
    {
      id: '2',
      nom: 'prets_mars_2024.xlsx',
      type: 'Prêts',
      taille: '1.8 MB',
      lignes: 850,
      dateImport: new Date('2024-03-20T10:15:00'),
      statut: 'En validation'
    },
    {
      id: '3',
      nom: 'transactions_q1_2024.xlsx',
      type: 'Transactions',
      taille: '3.1 MB',
      lignes: 2500,
      dateImport: new Date('2024-03-20T09:45:00'),
      statut: 'Erreur'
    }
  ];
} 