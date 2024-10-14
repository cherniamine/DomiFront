export interface FileEntity {

  fileName: string;
  fileType: string;
  data: Uint8Array;  // Utilisation de Uint8Array pour représenter des données binaires
}
