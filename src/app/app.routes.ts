import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TableauDeBordComponent } from './pages/tableau-de-bord/tableau-de-bord.component';
import { PretsComponent } from './pages/prets/prets.component';
import { PretFormComponent } from './pages/prets/pret-form/pret-form.component';
import { PretDetailsComponent } from './pages/prets/pret-details/pret-details.component';
import { FichiersExcelComponent } from './pages/fichiers-excel/fichiers-excel.component';
import { FichiersXMLComponent } from './pages/fichiers-xml/fichiers-xml.component';
import { JournauxAuditComponent } from './pages/journaux-audit/journaux-audit.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' },
      { path: 'tableau-de-bord', component: TableauDeBordComponent },
      { 
        path: 'prets',
        children: [
          { path: '', component: PretsComponent },
          { path: 'nouveau', component: PretFormComponent },
          { path: 'modifier/:id', component: PretFormComponent },
          { path: ':id', component: PretDetailsComponent }
        ]
      },
      { path: 'fichiers-excel', component: FichiersExcelComponent },
      { path: 'fichiers-xml', component: FichiersXMLComponent },
      { path: 'journaux-audit', component: JournauxAuditComponent },
      { path: 'utilisateurs', component: UtilisateursComponent }
    ]
  },
  { path: '**', redirectTo: 'tableau-de-bord' }
];
