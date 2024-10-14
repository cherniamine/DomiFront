export interface DetailPDepotEntity {
    // detailPDepotEntityPK: DetailPDepotEntityPK;
    codeNgp: number;
    montantDvsNgp: number;
    codePaysOrigNgp: number;
    codeUnite: number;
    qteNgp: number;
    testReserve: string;
    // idTce: number;
}
export interface DetailPDepotEntityPK {
    codeProduitService: number;
    codeOperation: number;
    dateOperation: Date;
    refOperation: number;
    numRbq: number;
}
