export interface IBeekeeper {
  installation: string;
  // TODO: AKE - Should be a number only IMO
  nest: string;
  // TODO: AKE - Should be a number only IMO
  since: string;
}
export interface IInformation {
  uuid: string;
  name: string;
  category: "Particulier" | "Apiculteur";
  // TODO: AKE - Should be a fixed enum + values?
  level: string;
  // TODO: AKE - Should be a fixed enum + values?
  interrest: string;
  location: [number, number];
}
export interface ISpace {
  description: string;
  location: [number, number];
  // TODO: AKE - Should be number only IMO. we can deduce the m2
  size: string;
  // TODO: AKE - Should be a fixed enum + values?
  type: "Jardin" | "Terrasse";
}
export interface ITraining {
  isBilled: boolean;
  location: [number, number];
  // TODO: AKE - Should be a fixed enum + values?
  target: string;
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
