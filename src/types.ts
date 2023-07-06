export type Tusers = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export type Tproducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

//enumeration
export enum PET_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

//type alias
export type TPet = {
  id: string;
  name: string;
  age: number;
  size: PET_SIZE;
};

//class
class UserClass {
  name;
  password;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}

const Cride = new UserClass("Cride", "Fride");

class UserPremium extends UserClass {
  premium;
  constructor(name: string, password: string, premium: boolean) {
    super(name, password);
    this.premium = premium;
  }
}

const CrideRico = new UserPremium("Cride", "fride", true);
