export interface Personne {
  personneEntityPK: PersonnePK;
  dateDelPiece: Date;
  lieuDelPiece: string;
  nom: string;
  prenom: string;
  adrRes1: string;
  adrRes2: string;
  adrRes3: string;
  adrRes4: string;
  nationalite: string;
  telephone: string;
  email: string;
  dateCreation: Date;
  typRefCltInt: string;
  numRefCltInt: string;
}
export interface PersonnePK {
  noPiecePersonne: string;
  typePiecePersonne: number;
}

