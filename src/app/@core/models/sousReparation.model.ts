import {Reparation} from "./reparation.model";

export interface SousReparation {
  _id: string;
  motif : string;
  reparation: Reparation;
  montant: number;
  status: string;
}
