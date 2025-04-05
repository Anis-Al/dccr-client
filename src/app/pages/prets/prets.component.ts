import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PretDetailsComponent } from './pret-details/pret-details.component';

export interface Intervenant {
  cle: string;
  typeCle: string;
  niveauResponsabilite: string;
  nif: string;
  rib: string;
  cli: string;
  soldeRestant: number;
}

export interface Garantie {
  type: string;
  valeur: number;
  description: string;
}

export interface Pret {
  // 1. Informations Générales
  numContrat: string;
  typeCredit: string;
  plafondAccorde: boolean;
  numeroPlafond: string;
  codeActivite: number;
  situation: number;
  motif: string;

  // 2. Intervenants
  intervenants: Intervenant[];

  // 3. Localisation
  codeAgence: string;
  codeWilaya: string;
  codePays: string;

  // 4. Conditions Financières
  creditsAccorde: number;
  dev: string;
  tauxInterets: number;
  coutCredits: number;

  // 5. Remboursement
  mensualite: number;
  dureeInit: number;
  dureeRestante: number;

  // 6. Retard
  classeRetard: number;
  nombreEcheancesImpayes: number;
  dateConstatationEcheancesImpayes: string;
  montantCapitalRetard: number;
  montantInteretsRetard: number;
  lautre: string;

  // 7. Dates
  dateOctroi: string;
  dateExpiration: string;
  dateDeclaration: string;
  dateRejet: string;

  // 8. Garanties
  garanties: Garantie[];

  // Source tracking
  source: {
    type: 'excel';
    fileId: string;
    fileName: string;
    importDate: Date;
    createdBy: string;
  } | {
    type: 'manual';
    createdBy: string;
    fileId?: string;
    fileName?: string;
    importDate?: Date;
  };
}

@Component({
  selector: 'app-prets',
  standalone: true,
  imports: [CommonModule, FormsModule, PretDetailsComponent],
  template: `
    <div class="prets-container" [class.details-open]="selectedPret">
      <div class="prets-list">
        <div class="header">
          <h1>Gestion des Prêts</h1>
          <div class="actions">
            <button class="btn btn-primary" (click)="onNewLoan()">
              <i class="fas fa-plus"></i>
              Nouveau Prêt
            </button>
          </div>
        </div>

        <div class="filters">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Rechercher un prêt..." [(ngModel)]="searchTerm">
          </div>
          <div class="filter-buttons">
            <button class="btn" [class.active]="currentFilter === 'all'" (click)="filterLoans('all')">
              Tous
            </button>
            <button class="btn" [class.active]="currentFilter === 'active'" (click)="filterLoans('active')">
              En Cours
            </button>
            <button class="btn" [class.active]="currentFilter === 'late'" (click)="filterLoans('late')">
              En Retard
            </button>
            <button class="btn" [class.active]="currentFilter === 'completed'" (click)="filterLoans('completed')">
              Terminés
            </button>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="sticky-column">N° Contrat</th>
                <th>Emprunteur</th>
                <th>Montant</th>
                <th>Durée</th>
                <th>Agence</th>
                <th>Statut</th>
                <th>Date Création</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let pret of prets" 
                  (click)="onSelectPret(pret)"
                  [class.selected]="selectedPret?.numContrat === pret.numContrat">
                <td class="sticky-column">{{pret.numContrat}}</td>
                <td>{{getEmprunteurPrincipal(pret)}}</td>
                <td>{{pret.creditsAccorde | currency:pret.dev}}</td>
                <td>{{pret.dureeInit}} mois</td>
                <td>{{pret.codeAgence}}</td>
                <td>
                  <span class="status-badge" [class]="getStatusClass(pret)">
                    {{getStatusLabel(pret)}}
                  </span>
                </td>
                <td>{{pret.dateDeclaration | date:'dd/MM/yyyy'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="details-panel" *ngIf="selectedPret">
        <app-pret-details [pret]="selectedPret"></app-pret-details>
      </div>
    </div>
  `,
  styles: [`
    .prets-container {
      display: flex;
      height: 100%;
      transition: all 0.3s ease;

      &.details-open {
        .prets-list {
          width: 40%;
          min-width: 600px;
        }

        .details-panel {
          width: 60%;
        }
      }
    }

    .prets-list {
      width: 100%;
      transition: width 0.3s ease;
      overflow: auto;
      padding: 1rem;
    }

    .details-panel {
      width: 0;
      overflow: auto;
      background-color: var(--background-color);
      border-left: 1px solid var(--border-color);
      transition: width 0.3s ease;
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

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.situation-1 {
        background-color: #e3f2fd;
        color: #1976d2;
      }

      &.situation-2 {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.situation-3 {
        background-color: #ffebee;
        color: #c62828;
      }

      &.situation-4 {
        background-color: #fff3e0;
        color: #f57c00;
      }

      &.retard-0 {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.retard-1 {
        background-color: #fff3e0;
        color: #f57c00;
      }

      &.retard-2 {
        background-color: #ffebee;
        color: #c62828;
      }

      &.retard-3 {
        background-color: #1a1a1a;
        color: #ffffff;
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

    .table-container {
      overflow-x: auto;
      margin: 0 -1rem;
      padding: 0 1rem;
      scrollbar-width: thin;
      position: relative;
      background-color: var(--background-color);
      
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
        width: 100%;
        min-width: 800px;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;

        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--background-color);
        }

        th {
          font-weight: 600;
          background-color: var(--background-color);
          border-bottom: 2px solid var(--border-color);
        }

        .sticky-column {
          position: sticky;
          left: 0;
          z-index: 1;
          background-color: var(--background-color);
          border-right: 2px solid var(--border-color);
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        }

        thead th.sticky-column {
          z-index: 2;
        }

        tbody tr {
          &:hover {
            td {
              background-color: var(--hover-color);
            }
          }

          &.selected td {
            background-color: var(--primary-color-light);
          }
        }
      }
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;

      &.status-active {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.status-late {
        background-color: #ffebee;
        color: #c62828;
      }

      &.status-completed {
        background-color: #e3f2fd;
        color: #1976d2;
      }
    }

    .filters {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;

      .search-box {
        position: relative;
        flex: 1;
        min-width: 200px;

        i {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-color-light);
        }

        input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.25rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 0.875rem;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }
      }

      .filter-buttons {
        display: flex;
        gap: 0.5rem;

        .btn {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          background: none;
          border-radius: 4px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: var(--hover-color);
          }

          &.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
          }
        }
      }
    }
  `]
})
export class PretsComponent {
  searchTerm: string = '';
  currentFilter: string = 'all';
  selectedPret: any = null;

  constructor(private router: Router) {}

  onNewLoan() {
    this.router.navigate(['/prets/nouveau']);
  }

  filterLoans(filter: string) {
    this.currentFilter = filter;
    // Implement filtering logic
  }

  onSelectPret(pret: any) {
    this.selectedPret = this.selectedPret?.numContrat === pret.numContrat ? null : pret;
  }

  getEmprunteurPrincipal(pret: Pret): string {
    const emprunteur = pret.intervenants.find(i => i.niveauResponsabilite === 'Emprunteur');
    return emprunteur ? `${emprunteur.cli}` : 'N/A';
  }

  getStatusClass(pret: Pret): string {
    if (pret.classeRetard > 0) return 'status-late';
    if (pret.dureeRestante === 0) return 'status-completed';
    return 'status-active';
  }

  getStatusLabel(pret: Pret): string {
    if (pret.classeRetard > 0) return 'En Retard';
    if (pret.dureeRestante === 0) return 'Terminé';
    return 'En Cours';
  }

  prets: Pret[] = [
    {
      numContrat: 'CR2024001',
      typeCredit: '1',
      plafondAccorde: true,
      numeroPlafond: 'PL2024001',
      codeActivite: 1,
      situation: 1,
      motif: '',
      intervenants: [
        {
          cle: 'CLI001',
          typeCle: 'Personne Physique',
          niveauResponsabilite: 'Emprunteur Principal',
          nif: 'NIF001',
          rib: 'RIB001',
          cli: 'CLI001',
          soldeRestant: 150000
        }
      ],
      codeAgence: 'AG001',
      codeWilaya: '16',
      codePays: 'DZ',
      creditsAccorde: 200000,
      dev: 'DZD',
      tauxInterets: 5.5,
      coutCredits: 220000,
      mensualite: 2000,
      dureeInit: 240,
      dureeRestante: 240,
      classeRetard: 0,
      nombreEcheancesImpayes: 0,
      dateConstatationEcheancesImpayes: '2024-01-15',
      montantCapitalRetard: 0,
      montantInteretsRetard: 0,
      lautre: '',
      dateOctroi: '2024-01-01',
      dateExpiration: '2044-01-01',
      dateDeclaration: '2024-01-15',
      dateRejet: '',
      garanties: [
        {
          type: 'Hypothèque',
          valeur: 250000,
          description: 'Appartement résidentiel'
        }
      ],
      source: {
        type: 'excel',
        fileId: 'EX2024001',
        fileName: 'import_credits_janvier.xlsx',
        importDate: new Date('2024-01-15'),
        createdBy: 'admin'
      }
    },
    {
      numContrat: 'CR2024002',
      typeCredit: '2',
      plafondAccorde: false,
      numeroPlafond: '',
      codeActivite: 2,
      situation: 1,
      motif: '',
      intervenants: [
        {
          cle: 'CLI002',
          typeCle: 'Personne Physique',
          niveauResponsabilite: 'Emprunteur Principal',
          nif: 'NIF002',
          rib: 'RIB002',
          cli: 'CLI002',
          soldeRestant: 5000
        }
      ],
      codeAgence: 'AG002',
      codeWilaya: '16',
      codePays: 'DZ',
      creditsAccorde: 10000,
      dev: 'DZD',
      tauxInterets: 7.5,
      coutCredits: 10750,
      mensualite: 500,
      dureeInit: 60,
      dureeRestante: 60,
      classeRetard: 0,
      nombreEcheancesImpayes: 0,
      dateConstatationEcheancesImpayes: '2024-01-15',
      montantCapitalRetard: 0,
      montantInteretsRetard: 0,
      lautre: '',
      dateOctroi: '2024-01-01',
      dateExpiration: '2029-01-01',
      dateDeclaration: '2024-01-15',
      dateRejet: '',
      garanties: [
        {
          type: 'Caution',
          valeur: 10000,
          description: 'Caution solidaire'
        }
      ],
      source: {
        type: 'manual',
        createdBy: 'admin'
      }
    },
    {
      numContrat: 'CR2024003',
      typeCredit: '3',
      plafondAccorde: true,
      numeroPlafond: 'PL2024003',
      codeActivite: 1,
      situation: 1,
      motif: '',
      intervenants: [
        {
          cle: 'CLI003',
          typeCle: 'Personne Physique',
          niveauResponsabilite: 'Emprunteur Principal',
          nif: 'NIF003',
          rib: 'RIB003',
          cli: 'CLI003',
          soldeRestant: 75000
        }
      ],
      codeAgence: 'AG003',
      codeWilaya: '16',
      codePays: 'DZ',
      creditsAccorde: 100000,
      dev: 'DZD',
      tauxInterets: 6.5,
      coutCredits: 106500,
      mensualite: 1000,
      dureeInit: 240,
      dureeRestante: 240,
      classeRetard: 2,
      nombreEcheancesImpayes: 3,
      dateConstatationEcheancesImpayes: '2024-03-01',
      montantCapitalRetard: 3000,
      montantInteretsRetard: 150,
      lautre: 'Retard de paiement signalé',
      dateOctroi: '2024-01-01',
      dateExpiration: '2044-01-01',
      dateDeclaration: '2024-01-15',
      dateRejet: '',
      garanties: [
        {
          type: 'Hypothèque',
          valeur: 120000,
          description: 'Local commercial'
        }
      ],
      source: {
        type: 'excel',
        fileId: 'EX2024003',
        fileName: 'import_credits_mars.xlsx',
        importDate: new Date('2024-03-01'),
        createdBy: 'admin'
      }
    },
    {
      numContrat: 'CR2024004',
      typeCredit: '4',
      plafondAccorde: false,
      numeroPlafond: '',
      codeActivite: 4,
      situation: 2,
      motif: '',
      intervenants: [
        {
          cle: 'CLI004',
          typeCle: 'Personne Physique',
          niveauResponsabilite: 'Emprunteur Principal',
          nif: 'NIF004',
          rib: 'RIB004',
          cli: 'CLI004',
          soldeRestant: 2000
        }
      ],
      codeAgence: 'AG004',
      codeWilaya: '16',
      codePays: 'DZ',
      creditsAccorde: 5000,
      dev: 'DZD',
      tauxInterets: 4.5,
      coutCredits: 5225,
      mensualite: 100,
      dureeInit: 120,
      dureeRestante: 12,
      classeRetard: 0,
      nombreEcheancesImpayes: 0,
      dateConstatationEcheancesImpayes: '2024-02-15',
      montantCapitalRetard: 0,
      montantInteretsRetard: 0,
      lautre: '',
      dateOctroi: '2024-01-01',
      dateExpiration: '2034-01-01',
      dateDeclaration: '2024-02-15',
      dateRejet: '',
      garanties: [
        {
          type: 'Caution',
          valeur: 5000,
          description: 'Caution parentale'
        }
      ],
      source: {
        type: 'manual',
        createdBy: 'admin'
      }
    }
  ];
}