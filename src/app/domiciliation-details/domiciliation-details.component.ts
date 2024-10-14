import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {DepotDomiciliationTitre, EtatVerif} from "../models/depotDomiciliationTitre";
import {DepotDomiciliationTitreService} from "../services/depot-domiciliation-titre.service";

@Component({
  selector: 'app-domiciliation-details',
  templateUrl: './domiciliation-details.component.html',
  styleUrls: ['./domiciliation-details.component.css']
})
export class DomiciliationDetailsComponent {
    p: number = 1;

    loading = true;
    error = '';
    depotDomiciliationTitres:DepotDomiciliationTitre[]  = [];
    EtatVerif = EtatVerif;




    @ViewChild(MatPaginator) paginator!: MatPaginator
    ;
  constructor(private depotDomiTitre: DepotDomiciliationTitreService) {}
    ngOnInit(): void {
        this.depotDomiTitre.getDepotDomiciliationTitre().subscribe({
            next: (data) => {
                this.depotDomiciliationTitres = data;
                this.loading = false;

                // Associer le paginator à la dataSource après avoir chargé les données
                if (this.paginator) {
                    this.paginator.firstPage(); // Assurez-vous que le paginator commence à la première page
                }
            },
            error: (err) => {
                this.error = 'Failed to load data';
                this.loading = false;
            }
        });

    }
    handlePage(event: any): void {
        this.p = event.pageIndex + 1; // Met à jour la variable p avec la nouvelle page
        // Vous pouvez également faire d'autres traitements ici, par exemple charger de nouvelles données depuis le backend
    }
  EtatVerification(d: DepotDomiciliationTitre): void {
    if (d.idTce !== undefined) {
      const idd = d.idTce;

        this.depotDomiTitre.getEtatVerif(idd).subscribe(
          () => {

            window.location.reload();
          },
          (error) => {
            console.log("Erreur lors du changement d'etat");
          }
        );
      }


    }

  EtatModif(d: DepotDomiciliationTitre): void {
    if (d.idTce !== undefined) {
      const idd = d.idTce;

      this.depotDomiTitre.getModifEtat(idd).subscribe(
        () => {

          window.location.reload();
        },
        (error) => {
          console.log("Erreur lors du changement d'etat");
        }
      );
    }


  }
  AddObservation(d: DepotDomiciliationTitre,msg: string): void {
    if (d.idTce !== undefined) {
      const idd = d.idTce;

      this.depotDomiTitre.AddObservation(idd,msg).subscribe(
        () => {

          window.location.reload();
        },
        (error) => {
          console.log("Erreur lors d'ajout d'une observation'");
        }
      );
    }


  }
    getBackgroundColor(depot: DepotDomiciliationTitre): string {
        if (depot.etatVerif === EtatVerif.Verifier) {
            return 'darkgreen'; // Couleur verte si l'état de vérification est "Vérifier"
        } else if (depot.etatVerif === EtatVerif.A_Modifier) {
            return 'tomato'; // Couleur rouge si l'état de vérification est "A_Modifier"
        } else {
            return ''; // Par défaut, pas de couleur spécifique
        }
    }
    DeleteDomi(d: DepotDomiciliationTitre): void {
        if (d.idTce !== undefined) {
            const idd = d.idTce;

            this.depotDomiTitre.DeleteDomi(idd).subscribe(
                () => {

                    window.location.reload();
                },
                (error) => {
                    console.log("Erreur lors de la suppression");
                }
            );
        }


    }



}
