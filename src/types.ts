export type Tusers = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
};

export type Tproducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export type Tpurchase = {
  id: string,
  buyer: string,
  products: string
}
