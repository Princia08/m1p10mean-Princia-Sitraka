import {Personne} from "./personne.model";

export interface Voiture {
  _id: string;
  idClient : Personne;
  matricule: string;
  marque: string;
  model: string;
  dans_garage: string;
}

export const MODEL_PROPERTIES_MAP = {
  idClient: {type: Number, label: 'client', required: false, display: true},
  matricule: {type: String, label: 'Matricule ', required: true, display: true},
  marque: {type: String, label: 'Marque', required: true, display: true},
  model: {type: String, label: 'Modele ', required: true, display: true},
};
