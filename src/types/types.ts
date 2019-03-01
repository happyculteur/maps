type userLevel = "Débutant" | "Confirmé" | "Expert";
type userCategory = "Particulier" | "Apiculteur";
type userInterest =
  | "Transmettre son savoir"
  | "Poser des ruches"
  | "Vendre du miel"
  | "Apprendre"
  | "Proposer un/des espace/s";
type spaceType = "Jardin" | "Terrasse" | "Toit" | "Prairie";
type location = [number, number];

export interface IBeekeeper {
  installation: string;
  hive: number;
  since: number;
}
export interface IInformation {
  uuid: string;
  name: string;
  category: userCategory;
  level: userLevel;
  interest: userInterest;
  location: location;
}
export interface ISpace {
  description: string;
  location: location;
  size: number;
  type: spaceType;
}
export interface ITraining {
  isBilled: boolean;
  location: location;
  target: userLevel;
}

export interface IUser {
  information: IInformation;
}
export interface IUser {
  space?: ISpace;
}
export interface IUser {
  beekeeper?: IBeekeeper;
  training?: ITraining;
}
