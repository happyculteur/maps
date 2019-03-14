export enum userLevel {
  "Débutant",
  "Confirmé",
  "Expert"
}
export enum userCategory {
  individual = "Particulier",
  beekeeper = "Apiculteur",
  space = "Espace"
}
export enum userInterest {
  "Transmettre son savoir",
  "Poser des ruches",
  "Vendre du miel",
  "Apprendre",
  "Proposer un/des espace/s"
}
enum spaceType {
  "Jardin",
  "Terrasse",
  "Toit",
  "Prairie"
}
type location = number[];

export interface IInformation {
  uuid: string;
  category: userCategory;
  interests: userInterest[];
  location: location;
  firstname: string;
}
export interface ISpace {
  uuid: string;
  category: userCategory.space;
  description: string;
  size: number;
  location: location;
  type: spaceType;
}
export interface ITraining {
  isBilled: boolean;
  isPartner: boolean;
  targets: userLevel[];
}

export interface IIndividual extends IInformation {
  level: userLevel;
  spaces: ISpace[];
}
export interface IBeekeeper extends IInformation {
  seniority: number;
  training: ITraining;
}

export type userType = IBeekeeper | IIndividual | ISpace;
