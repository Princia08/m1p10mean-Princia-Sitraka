import {Voiture} from "./voiture.model";

export interface Reparation {
  _id: string;
  date_entree: Date;
  date_sortie: Date;
  avancement: string;
  voiture: Voiture;
}
