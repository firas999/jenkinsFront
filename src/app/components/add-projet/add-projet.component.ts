import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css']
})
export class AddProjetComponent implements OnInit {
projet: Projet={
  titre:'',
  description:'',
  Chef:''
};
submitted=false;
  constructor(private ProjetService:ProjetService) { }

  ngOnInit(): void {
  }
  saveProjet(): void {
    const data = {
      Chef:this.projet.Chef,
      titre: this.projet.titre,
      description: this.projet.description,
      
    };
    
    
    this.ProjetService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      
  }


  newProjet(): void {
    this.submitted = false;
    this.projet = {
      titre:'',
      description: '',
      Chef:''
    };
  }
}
