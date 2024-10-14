import {DetailPDepotEntity} from "./DetailPDepot";
import {FileEntity} from "./FileEntity";

export interface DepotDomiciliationTitre {
    // depotDomiciliationTitreEntityPK: DepotDomiciliationTitrePK;
    natureDemande: NatureDemande;
    codeAgence: number;
    typePieceClient: number;
    noPieceClient: string;
    numCompte: string;
    regimeSecteurActivite: RegimeSecteurActivite;
    activitePrincipaleSecondaire: ActivitePrincipaleSecondaire;
    codeSecteurActivite: string;
    codeSecteurActiviteSec: string;
    codeTitre: CodeTitre;
    numDom: number;
    dateDom: Date |null;
    numDepot: number;
    dateDepot: Date|null;
    numeroDossier: string;
    numeroDemande: string;
    numContratCom: string;
    dateContratCom: Date|null;
    codeDevise: number;
    mntDvsPtfnFact: number;
    mntDvsFobFact: number;
    mntTndFob: number;
    mntTndPtfn: number;
    acompte: number;
    nomFournisseur: string;
    adrFournisseur: string;
    nomClient: string;
    adrClient: string;
    codPayAch: number;
    codPayProv: number;
    codPayOrig: number;
    codePaysDestDef: number;
    codeModLiv: number;
    codeModReg: number;
    codeDelReg: number;
    regimeStat: number;
    nbrColis: number;
    typeAccordBct: string;
    numAccordBct: string;
    dateAccordBct: Date|null;
    numCotunas: number;
    dateCotunas: Date|null;
    dateValidite: Date|null;
    dateApurement: Date|null;
    observation: string;
    matEmp: string;
    status: string;
    dateValidation: Date|null;
    codeEnvoiSpecial: string;
    idTce?: number;
    detailPDepotEntitys: DetailPDepotEntity[];
    fileEntity:FileEntity[];
    etatVerif: EtatVerif; // Add this line

}

export interface DepotDomiciliationTitrePK {
    codeProduitService: number;
    codeOperation: number;
    dateOperation: Date;
    refOperation: number;
}

export enum NatureDemande {
    dd="Selectionnez le type de demande",
    DEPOT = 'DEPOT',
    DEROGATION = 'DEROGATION',
    DOMICILIATION = 'DOMICILIATION'
}

export enum RegimeSecteurActivite {
    OUI = 'OUI',
    NON = 'NON'
}

export enum ActivitePrincipaleSecondaire {
    PRINCIPALE = 'principale',
    SECONDAIRE = 'secondaire'
}

export enum CodeTitre {
  aa="Selectionnez le code titre",
    AUTORISATION_EXPORTATION = 'AUTORISATION_EXPORTATION',
    FACTURE_DEFINITIVE = 'FACTURE_DEFINITIVE',
    AUTORISATION_IMPORTATION = 'AUTORISATION_IMPORTATION',
    FACTURE_COMMERCIALE = 'FACTURE_COMMERCIALE',
    ADMISSION_TEMPORAIRE = 'ADMISSION_TEMPORAIRE'
}
export enum EtatVerif {
    Verifier = "Vérifier",
    A_Modifier = "A_Modifier",
    En_Attente_De_Verification = "En_Attente_De_Vérification"
}
