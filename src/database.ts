import { Tusers, Tproducts, PET_SIZE, TPet } from "./types";

export const users: Tusers[] = [
  {
    id: "u001",
    name: "Fulano",
    email: "fulano@gmail.com",
    password: "fulano123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@gmail.com",
    password: "beltrana00",
    createdAt: new Date().toISOString(),
  },
];

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  users.push({
    id: id,
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
  }) && console.log("\x1b[47m%s\x1b[0m", `User successful created.`);
};

export const getAllUsers = () => {
  console.log(users);
};

//*
//*  Products
//*
export const products: Tproducts[] = [
  {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

export const createProduct = (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
) => {
  products.push({
    id: id,
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl,
  }) && console.log("\x1b[47m%s\x1b[0m", `Product successful registered.`);
};

export const getAllProducts = () => {
  console.log(products);
};

export const searchProductByName = (name: string) => {
  const productFound = products.filter((product) => {
    return product.name.toLowerCase() === name.toLowerCase();
  });
  console.table(productFound);
};

//* Pets

export const pets: TPet[] = [
  {
    id: "p001",
    name: "Thor",
    age: 5,
    size: PET_SIZE.MEDIUM,
  },
  {
    id: "p002",
    name: "Lili",
    age: 10,
    size: PET_SIZE.SMALL,
  },
  {
    id: "p003",
    name: "Pingo",
    age: 3,
    size: PET_SIZE.LARGE,
  },
  {
    id: "p004",
    name: "Luna",
    age: 7,
    size: PET_SIZE.MEDIUM,
  },
];
