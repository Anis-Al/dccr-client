import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface XMLFile {
  id: string;
  nom: string;
  type: string;
  taille: string;
  dateGeneration: Date;
  statut: 'Généré' | 'En cours' | 'Erreur';
}

@Component({
  selector: 'app-fichiers-xml',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fichiers-xml">
      <div class="header">
        <h1>Génération de Fichiers XML</h1>
      </div>

      <div class="generation-form card">
        <h2>Nouveau Fichier XML</h2>
        <div class="form-grid">
          <div class="form-group">
            <label>Fichier Excel Source</label>
            <select class="form-control">
              <option value="">Sélectionner un fichier Excel</option>
              <option value="1">clients_mars_2024.xlsx</option>
              <option value="2">prets_mars_2024.xlsx</option>
            </select>
          </div>

          <div class="form-group">
            <label>Type de Format XML</label>
            <select class="form-control">
              <option value="">Sélectionner un format</option>
              <option value="sepa">SEPA</option>
              <option value="reporting">Reporting Mensuel</option>
              <option value="audit">Audit</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn btn-primary">
            <i class="fas fa-code"></i>
            Générer XML
          </button>
        </div>
      </div>

      <div class="card">
        <h2>Historique des Fichiers</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Nom du fichier</th>
              <th>Type</th>
              <th>Taille</th>
              <th>Date de génération</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let fichier of fichiers">
              <td>{{ fichier.nom }}</td>
              <td>{{ fichier.type }}</td>
              <td>{{ fichier.taille }}</td>
              <td>{{ fichier.dateGeneration | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <span class="status-badge" [class]="fichier.statut.toLowerCase()">
                  {{ fichier.statut }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="btn-icon" title="Télécharger" *ngIf="fichier.statut === 'Généré'">
                    <i class="fas fa-download"></i>
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
    </div>
  `,
  styles: [`
    .fichiers-xml {
      padding: 1rem;
    }

    .header {
      margin-bottom: 1rem;
    }

    .generation-form {
      margin-bottom: 1rem;

      h2 {
        margin-bottom: 1rem;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.généré {
        background-color: #e8f5e9;
        color: var(--success-color);
      }

      &.erreur {
        background-color: #ffebee;
        color: var(--error-color);
      }

      &.en-cours {
        background-color: #e3f2fd;
        color: #1976d2;
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
  `]
})
export class FichiersXMLComponent {
  fichiers: XMLFile[] = [
    {
      id: '1',
      nom: 'export_clients_mars2024.xml',
      type: 'SEPA',
      taille: '2.4 MB',
      dateGeneration: new Date('2024-03-20T14:30:00'),
      statut: 'Généré'
    },
    {
      id: '2',
      nom: 'reporting_mensuel_mars2024.xml',
      type: 'Reporting',
      taille: '1.8 MB',
      dateGeneration: new Date('2024-03-20T10:15:00'),
      statut: 'Généré'
    },
    {
      id: '3',
      nom: 'audit_q1_2024.xml',
      type: 'Audit',
      taille: '3.1 MB',
      dateGeneration: new Date('2024-03-20T09:45:00'),
      statut: 'En cours'
    }
  ];
} 