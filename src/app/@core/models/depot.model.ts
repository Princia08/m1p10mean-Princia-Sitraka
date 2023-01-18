import {Voiture} from "./voiture.model";

export interface Depot {
  _id: string;
  voiture : Voiture;
  description: string;
  valide: string;
}

export const MODEL_PROPERTIES_MAP = {
  idclient: {type: Number, label: 'client', required: false, display: true},
  description: {type: String, label: 'Modele ', required: true, display: true},
};
