interface IUserBase {
  name: string;
  surname: string;
  address: string;
}

export interface IUserInfo extends IUserBase {
  uuid: string;
}

export interface IUserCategorie {
  uuid: string;
  name: string;
  data: IUserInfo[];
}

export interface IUserDetails extends IUserBase {
  Horodateur: string;
  mail: string;
  Score: string;
  category: string;
  "beekeeper-level": string;
  "beekeeper-time": string;
  "beekeeper-nest-number": string;
  "beekeeper-interest-in-happyculteur": string;
  "beekeeper-installation-type-wished": string;
  "beekeeper-is-formation-billed": string;
  "beekeeper-formation-audience": string;
  "beekeeper-formation-place": string;
  "individual-insterest-in-happyculteur": string;
  "individual-level": string;
  "individual-has-space": string;
  "individual-space-type": string;
  "individual-space-size": string;
  "individual-space-description": string;
  "individual-space-location": string;
  phone: string;
}
