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
export enum spaceType {
  "Jardin",
  "Terrasse",
  "Toit",
  "Prairie"
}
type location = number[];

interface IBasicInformation {
  uuid: string;
  category: userCategory;
  primary: string;
}
interface ISpaceOwner {
  name: string;
  uuid: string;
  location: location;
}
export interface IInformation extends IBasicInformation {
  interests?: userInterest[];
  location: location;
}
export interface ITraining {
  isBilled: boolean;
  isPartner: boolean;
  targets: userLevel[];
}

export interface ISpaceRAW {
  uuid: string;
  type: spaceType;
  size: number;
  description: string;
  location: location;
}
export interface ISpace extends IBasicInformation {
  description: string;
  size: number;
  location: location;
  type: spaceType;
  owner: ISpaceOwner;
}

export interface IIndividualRAW {
  uuid: string;
  firstname: string;
  location: location;
  interests: userInterest[];
  level: userLevel;
  spaces: ISpaceRAW[];
}
export interface IIndividual extends IInformation {
  level: userLevel;
  hasSpace: boolean;
  spaces: location[];
}

export interface IBeekeeperRAW {
  uuid: string;
  firstname: string;
  location: location;
  seniority: number;
  interests: userInterest[];
  training: {
    isBilled: boolean;
    targets: userLevel[];
    isPartner: boolean;
  };
}
export interface IBeekeeper extends IInformation {
  seniority: number;
  training: ITraining;
}

export type userType = IBeekeeper | IIndividual | ISpace;
