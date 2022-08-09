import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-projets-list',
  templateUrl: './projets-list.component.html',
  styleUrls: ['./projets-list.component.css']
})
export class ProjetsListComponent implements OnInit {
  projet?: Projet[];
  currentProjet: Projet = {};
  currentIndex = -1;
  titre = '';
  constructor(private ProjetService:ProjetService) { }

  ngOnInit(): void {
    this.retrieveProjets();
  }
  retrieveProjets(): void {
    this.ProjetService.getAll()
      .subscribe({
        next: (data) => {
          this.projet = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  
  searchTitle(): void {
    this.currentProjet = {};
    this.currentIndex = -1;
    this.ProjetService.findByTitle(this.titre)
      .subscribe({
        next: (data) => {
          this.projet = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
