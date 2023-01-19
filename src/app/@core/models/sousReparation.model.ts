import {Reparation} from "./reparation.model";

export interface SousReparation {
  _id: string;
  reparation: Reparation;
  montant: number;
  status: string;
}
