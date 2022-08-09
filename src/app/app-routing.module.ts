import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './components/add-projet/add-projet.component';
import { ProjetDetailsComponent } from './components/projet-details/projet-details.component';
import { ProjetsListComponent } from './components/projets-list/projets-list.component';

const routes: Routes = [

  { path: '', redirectTo: 'projet', pathMatch: 'full' },
  { path: 'projet', component: ProjetsListComponent },
  { path: 'projet/:id', component: ProjetDetailsComponent },
  { path: 'add', component: AddProjetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
