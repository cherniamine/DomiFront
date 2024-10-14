import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as jQuery from 'jquery';
import {DepotDomiciliationTitreService} from "../../services/depot-domiciliation-titre.service";
import {
    ActivitePrincipaleSecondaire,
    CodeTitre,
    DepotDomiciliationTitre,
    EtatVerif,
    NatureDemande,
    RegimeSecteurActivite
} from "../../models/depotDomiciliationTitre";
import {RefService} from "../../services/ref/ref.service";
import {TypeAccordBct} from "../../models/AccordBct";
import {DetailPDepotEntity} from "../../models/DetailPDepot";
import {MatDialog} from '@angular/material/dialog';
import {PersonDetailsComponent} from "../../DetailPersonne/person-details/person-details.component";
import {forkJoin, Observable} from 'rxjs';
import {FileEntity} from "../../models/FileEntity";

@Component({
  selector: 'app-depotdomiciliation',
  templateUrl: './depotdomiciliation.component.html',
  styleUrls: ['./depotdomiciliation.component.css']
})
export class DepotdomiciliationComponent implements OnInit{
  depotDomiTitre:DepotDomiciliationTitre={natureDemande:NatureDemande.dd,codeAgence:NaN,typePieceClient:NaN,noPieceClient:'',numCompte:'',regimeSecteurActivite:RegimeSecteurActivite.OUI,
   activitePrincipaleSecondaire:ActivitePrincipaleSecondaire.PRINCIPALE,codeSecteurActivite:'',codeSecteurActiviteSec:'',codeTitre:CodeTitre.aa,numDom:NaN,dateDom:null,
   numDepot:NaN,dateDepot:null,numeroDossier:'',numeroDemande:'',numContratCom:'',dateContratCom:null,codeDevise:NaN,mntDvsPtfnFact:NaN,mntDvsFobFact:NaN,mntTndFob:NaN,mntTndPtfn:NaN,
 acompte:NaN,nomFournisseur:'',adrFournisseur:'',nomClient:'',adrClient:'',codPayAch:NaN,codPayProv:NaN,codPayOrig:NaN,codePaysDestDef:NaN,codeModLiv:NaN,codeModReg:NaN,codeDelReg:NaN,regimeStat:NaN,
 nbrColis:NaN,typeAccordBct:'',numAccordBct:'',dateAccordBct:null,numCotunas:NaN,dateCotunas:null,dateValidite:null,dateApurement:null,observation:'',matEmp:'',status:'',dateValidation:null,codeEnvoiSpecial:'',
      detailPDepotEntitys:[ {

          codeNgp: NaN,
          montantDvsNgp: NaN,
          codePaysOrigNgp: NaN,
          codeUnite: NaN,
          testReserve:"",
          qteNgp: NaN,

      }],
    fileEntity:[{
    fileName:"",
      fileType:"",
      data:new Uint8Array(0)
    }],etatVerif:EtatVerif.En_Attente_De_Verification
  };
  natureDemandeOptions = Object.values(NatureDemande);
  typeAccordBctOptions=Object.values(TypeAccordBct);
  public codePaysList: number[] = [];
  public codeDeviseList: number[] = [];
  public allNoPieceClientList: number[] = [];
  public allCodeUniteList: number[] = [];
  public allCodeNgpList: number[] = [];
  public allCodeModLivList: number[] = [];
  public allCodeModRegList: number[] = [];
  public allCodeDelRegList: number[] = [];
  public allCodeRegimeStat: number[] = [];
  public allNumAccordBctList: number[] = [];
  public allDateAccordBctList: Date[] = [];
    nomPrenom: string | undefined;
  errorMessage: string | undefined;
  ribs: string[] = [];
    fileInputs: File[] = [];
  showMore = false;
  showMore1 = false;
  showMore2 = false;




  constructor(
      private router: Router,
      private depotdomititreservice: DepotDomiciliationTitreService,
      private refservice: RefService,
      public dialog: MatDialog
  )
  {}

   ngOnInit():void {
     this.fetchAllCodePays();
     this.fetchAllCodeDevise();
     this.fetchAllNoPieceCleint();
     this.fetchAllCodeUnite();
     this.fetchAllNgp();
     this.fetchAllCodeModLiv();
     this.fetchAllCodModReg();
     this.fetchAllCodDelReg();
     this.fetchAllCodeRegimeStat();
     this.fetchAllNumAccordBct();
     this.fetchAllDateAccordBct();

   }

  goToNextStep() {
    const parentFieldset = jQuery('.form-wizard').find('.wizard-fieldset.show');
    const currentActiveStep = jQuery('.form-wizard-steps .active');
    let nextWizardStep = true;

    parentFieldset.find('.wizard-required').each((index: number, element: any) => {
      const thisValue = jQuery(element).val();

      if (thisValue === "") {
        jQuery(element).siblings(".wizard-form-error").slideDown();
        nextWizardStep = false;
      } else {
        jQuery(element).siblings(".wizard-form-error").slideUp();
      }
    });

    if (nextWizardStep) {
      parentFieldset.removeClass("show");
      currentActiveStep.removeClass('active').addClass('activated').next().addClass('active');
      parentFieldset.next('.wizard-fieldset').addClass("show");

      jQuery('.wizard-fieldset').each((index: number, element: any) => {
        if (jQuery(element).hasClass('show')) {
          const formAttr = jQuery(element).attr('data-tab-content');
          jQuery('.form-wizard-steps .form-wizard-step-item').each((index2: number, element2: any) => {
            if (jQuery(element2).attr('data-attr') === formAttr) {
              jQuery(element2).addClass('active');
              const innerWidth = jQuery(element2).innerWidth();
              const position = jQuery(element2).position();
              jQuery('.form-wizard-step-move').css({ left: position.left + 'px', width: innerWidth + 'px' });
            } else {
              jQuery(element2).removeClass('active');
            }
          });
        }
      });
    }
  }
    goToNextStep2() {
        const parentFieldset = jQuery('.form-wizard').find('.wizard-fieldset.show');
        const currentActiveStep = jQuery('.form-wizard-steps .active');
        let nextWizardStep = true;

        parentFieldset.find('.wizard-required').each((index: number, element: any) => {
            const thisValue = jQuery(element).val();

            if (thisValue === "") {
                jQuery(element).siblings(".wizard-form-error").slideDown();
                nextWizardStep = false;
            } else {
                jQuery(element).siblings(".wizard-form-error").slideUp();
            }
        });

        // Check if date_facture is less than 3 months from today
        const dateFacture = this.depotDomiTitre.dateContratCom// get the value of date_facture from your form;
        const today = new Date();
        const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());

        if (dateFacture && new Date(dateFacture) < threeMonthsAgo) {
            // Date_facture is less than 3 months ago, skip to page 4
            nextWizardStep = true; // Ensure nextWizardStep is true
            parentFieldset.removeClass("show");
            currentActiveStep.removeClass('active').addClass('activated').next().next().addClass('active'); // Skip to next next page
            parentFieldset.next().next('.wizard-fieldset').addClass("show");

            jQuery('.wizard-fieldset').each((index: number, element: any) => {
                if (jQuery(element).hasClass('show')) {
                    const formAttr = jQuery(element).attr('data-tab-content');
                    jQuery('.form-wizard-steps .form-wizard-step-item').each((index2: number, element2: any) => {
                        if (jQuery(element2).attr('data-attr') === formAttr) {
                            jQuery(element2).addClass('active');
                            const innerWidth = jQuery(element2).innerWidth();
                            const position = jQuery(element2).position();
                            jQuery('.form-wizard-step-move').css({ left: position.left + 'px', width: innerWidth + 'px' });
                        } else {
                            jQuery(element2).removeClass('active');
                        }
                    });
                }
            });
        } else {
            // Date_facture is not less than 3 months ago, proceed as usual
            if (nextWizardStep) {
                parentFieldset.removeClass("show");
                currentActiveStep.removeClass('active').addClass('activated').next().addClass('active');
                parentFieldset.next('.wizard-fieldset').addClass("show");

                jQuery('.wizard-fieldset').each((index: number, element: any) => {
                    if (jQuery(element).hasClass('show')) {
                        const formAttr = jQuery(element).attr('data-tab-content');
                        jQuery('.form-wizard-steps .form-wizard-step-item').each((index2: number, element2: any) => {
                            if (jQuery(element2).attr('data-attr') === formAttr) {
                                jQuery(element2).addClass('active');
                                const innerWidth = jQuery(element2).innerWidth();
                                const position = jQuery(element2).position();
                                jQuery('.form-wizard-step-move').css({ left: position.left + 'px', width: innerWidth + 'px' });
                            } else {
                                jQuery(element2).removeClass('active');
                            }
                        });
                    }
                });
            }
        }
    }

    goToPreviousStep() {
    const currentActiveStep = jQuery('.form-wizard-steps .active');

    jQuery('.form-wizard').find('.wizard-fieldset.show').removeClass("show").prev('.wizard-fieldset').addClass("show");
    currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active');

    jQuery('.wizard-fieldset').each((index: number, element: any) => {
      if (jQuery(element).hasClass('show')) {
        const formAttr = jQuery(element).attr('data-tab-content');
        jQuery('.form-wizard-steps .form-wizard-step-item').each((index2: number, element2: any) => {
          if (jQuery(element2).attr('data-attr') === formAttr) {
            jQuery(element2).addClass('active');
            const innerWidth = jQuery(element2).innerWidth();
            const position = jQuery(element2).position();
            jQuery('.form-wizard-step-move').css({ left: position.left + 'px', width: innerWidth + 'px' });
          } else {
            jQuery(element2).removeClass('active');
          }
        });
      }
    });
  }
    createDepotDomiciliationTitre(){
    this.depotdomititreservice.createDepotDomiciliationTitre(
        this.depotDomiTitre).subscribe(response=>{
          console.log('DepotDomiciliationTitre created' , response);
        },error=>{
          console.error('Error creating DepotDomiciliationTitre:',error);
        });

  }
  getCodeTitreOptions(): string[] {
    if (this.depotDomiTitre.natureDemande === NatureDemande.DEPOT) {
      return [
          CodeTitre.aa,
        CodeTitre.AUTORISATION_IMPORTATION,
        CodeTitre.AUTORISATION_EXPORTATION
      ];
    } else if (
        this.depotDomiTitre.natureDemande === NatureDemande.DEROGATION ||
        this.depotDomiTitre.natureDemande === NatureDemande.DOMICILIATION
    ) {
      return [
          CodeTitre.aa,
        CodeTitre.FACTURE_DEFINITIVE,
        CodeTitre.FACTURE_COMMERCIALE,
        CodeTitre.ADMISSION_TEMPORAIRE
      ];
    } else {
      return [CodeTitre.aa];
    }
  }
  fetchAllCodePays(): void {
    this.refservice.getAllCodePays().subscribe(
        (data: number[]) => {
          this.codePaysList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllCodeDevise(): void {
    this.refservice.getAllCodeDevises().subscribe(
        (data: number[]) => {
          this.codeDeviseList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllNoPieceCleint(): void {
    this.refservice.getAllNoPieceClient().subscribe(
        (data: number[]) => {
          this.allNoPieceClientList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllCodeUnite(): void {
    this.refservice.getAllCodeUnite().subscribe(
        (data: number[]) => {
          this.allCodeUniteList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllNgp(): void {
    this.refservice.getAllCodeNgp().subscribe(
        (data: number[]) => {
          this.allCodeNgpList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllCodeModLiv(): void {
    this.refservice.getAllCodeModLiv().subscribe(
        (data: number[]) => {
          this.allCodeModLivList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllCodModReg(): void {
    this.refservice.getAllCodeModReg().subscribe(
        (data: number[]) => {
          this.allCodeModRegList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllCodDelReg(): void {
    this.refservice.getAllCodeDelReg().subscribe(
        (data: number[]) => {
          this.allCodeDelRegList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllCodeRegimeStat(): void {
    this.refservice.getAllCodeRegimeStat().subscribe(
        (data: number[]) => {
          this.allCodeRegimeStat = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllNumAccordBct(): void {
    this.refservice.getAllNumAccordBct().subscribe(
        (data: number[]) => {
          this.allNumAccordBctList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  fetchAllDateAccordBct(): void {
    this.refservice.getAllDateAccordBct().subscribe(
        (data: Date[]) => {
          this.allDateAccordBctList = data;
        },
        (error) => {
          console.error('Error fetching codePays', error);
        }
    );
  }
  updateCodPaysValues(): void {
    const codeTitre = this.depotDomiTitre.codeTitre;

    if (codeTitre === CodeTitre.AUTORISATION_EXPORTATION || codeTitre === CodeTitre.FACTURE_DEFINITIVE) {
      this.depotDomiTitre.codPayOrig = 788;
      this.depotDomiTitre.codPayAch = 788;
    } else {
      this.depotDomiTitre.codPayOrig = NaN;
      this.depotDomiTitre.codPayAch = NaN;
    }
    if (codeTitre === CodeTitre.AUTORISATION_IMPORTATION || codeTitre === CodeTitre.FACTURE_COMMERCIALE || codeTitre === CodeTitre.ADMISSION_TEMPORAIRE) {
      this.depotDomiTitre.codPayProv = 788;
      this.depotDomiTitre.codePaysDestDef = 788;
    } else {
      this.depotDomiTitre.codPayProv = NaN;
      this.depotDomiTitre.codePaysDestDef = NaN;
    }

  }


    protected readonly ActivitePrincipaleSecondaire = ActivitePrincipaleSecondaire;
    addDetailPDepotEntity() {
        const newDetailPDepot: DetailPDepotEntity = {
            codeNgp: NaN,
            montantDvsNgp: NaN,
            codePaysOrigNgp: NaN,
            codeUnite: NaN,
            testReserve: "",
            qteNgp: NaN
        };

        this.depotDomiTitre.detailPDepotEntitys.push(newDetailPDepot);
    }

    removeDetailPDepotEntity(index: number) {
        if (index >= 0 && index < this.depotDomiTitre.detailPDepotEntitys.length) {

            if (this.depotDomiTitre.detailPDepotEntitys.length > 1) {
                this.depotDomiTitre.detailPDepotEntitys.splice(index, 1);
            } else {

                console.log("Au moins une ligne doit rester.");
            }
        }
    }
  onNoPieceClientChange(): void {
    if (this.depotDomiTitre.noPieceClient) {
      this.nomPrenom = undefined; // Réinitialise nomPrenom
      this.errorMessage = undefined; // Réinitialise errorMessage

      // Récupère le nom et prénom
      this.refservice.getNomEtPrenom(this.depotDomiTitre.noPieceClient).subscribe(
        data => {
          if (data) {
            this.nomPrenom = data;
            this.errorMessage = undefined; // Clear any previous error message

            // Une fois le nom et prénom récupérés, récupère les RIBs
            this.refservice.getCompteRib(this.depotDomiTitre.noPieceClient).subscribe(
              ribsData => {
                this.ribs = ribsData; // Stocke les RIBs récupérés dans la variable
                if (this.ribs.length > 0) {
                  this.depotDomiTitre.numCompte = this.ribs[0]; // Sélectionne le premier RIB par défaut
                }
              },
              error => {
                console.error('Error fetching compte rib:', error);
                this.ribs = [];
              }
            );

          } else {
            this.nomPrenom = undefined;
            this.errorMessage = 'RNE inexistant';
            this.ribs = []; // Réinitialise les RIBs si le nom et prénom ne sont pas trouvés
          }
        },
        error => {
          console.error('Erreur lors de la récupération du nom et prénom', error);
          this.nomPrenom = undefined;
          this.errorMessage = 'Erreur lors de la récupération du nom et prénom';
          this.ribs = []; // Réinitialise les RIBs en cas d'erreur
        }
      );
    } else {
      this.nomPrenom = undefined;
      this.errorMessage = undefined;
      this.ribs = []; // Réinitialise les RIBs si noPieceClient est vide
    }
  }
    showDetails(): void {
        const dialogRef = this.dialog.open(PersonDetailsComponent, {
            width: '400px', // Vous pouvez ajuster la largeur si nécessaire
            data: { nomPrenom: this.nomPrenom },
            panelClass: 'custom-dialog-container',
            hasBackdrop: true,
            backdropClass: 'custom-backdrop'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Le modal a été fermé');
        });
    }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const files: File[] = Array.from(inputElement.files);
      this.uploadFilesAndCreateDepot(files);
    }
  }

  uploadFilesAndCreateDepot(files: File[]) {
    const uploadObservables: Observable<any>[] = [];

    // Pour chaque fichier sélectionné, appelez le service d'envoi de fichiers
    files.forEach(file => {
      uploadObservables.push(this.refservice.uploadFile(file));
    });

    // Combinez les observables pour attendre que tous les fichiers soient téléchargés
    forkJoin(uploadObservables).subscribe(
      (fileUploadResponses: any[]) => {
        console.log('Files uploaded successfully:', fileUploadResponses);

        // Créez un tableau de FileEntity avec les réponses de téléchargement de fichiers
        const fileEntities: FileEntity[] = fileUploadResponses.map(response => ({
          fileName: response.fileName,
          fileType: response.fileType,
          data: response.data // Assurez-vous que le backend renvoie correctement les données binaires
        }));

        // Mettez à jour le DepotDomiciliationTitre avec les fichiers associés
        this.depotDomiTitre.fileEntity = fileEntities;

      },
      (error) => {
        console.error('Error uploading files:', error);
        // Gérez les erreurs d'envoi de fichiers ici
      }
    );
  }
  isDateFactureRecent(): boolean {
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Vérifie que dateContratCom est définie et n'est pas null
    if (this.depotDomiTitre.dateContratCom && this.depotDomiTitre.dateContratCom instanceof Date) {
      // Comparaison pour vérifier si dateContratCom est dans les 3 derniers mois
      if (this.depotDomiTitre.dateContratCom > threeMonthsAgo) {
        console.log("La date de contrat est récente.");
        return true;
      } else {
        console.log("La date de contrat n'est pas récente.");
        return false;
      }
    } else {
      console.log("Date de contrat non valide ou non définie.");
      return false;
    }
  }



}
