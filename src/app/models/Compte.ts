export interface Compte {
    compteEntityPK: ComptePK;
    codeAgenceBna: number;
    compteGeneral: number;
    sousCompte: number;
    cleCompte: string;
    codeDevise: number;
    compteProfessON: string;
    cptDom: string;
    dateCreation: Date;
    dateCloture: Date;
    etatCompte: string;
    sl: number;
    sousCompteCplt: number;

}
export interface ComptePK {
    typePieceClient: number;
    noPieceClient: string;
    codeAgenceBct: number;
    racineCompte: string;
    cleRib: number;
}

