"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pets = exports.searchProductByName = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
const createUser = (id, name, email, password) => {
    exports.users.push({
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
    }) && console.log("\x1b[47m%s\x1b[0m", `User successful created.`);
};
exports.createUser = createUser;
const getAllUsers = () => {
    console.log(exports.users);
};
exports.getAllUsers = getAllUsers;
exports.products = [
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
const createProduct = (id, name, price, description, imageUrl) => {
    exports.products.push({
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,
    }) && console.log("\x1b[47m%s\x1b[0m", `Product successful registered.`);
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    console.log(exports.products);
};
exports.getAllProducts = getAllProducts;
const searchProductByName = (name) => {
    const productFound = exports.products.filter((product) => {
        return product.name.toLowerCase() === name.toLowerCase();
    });
    console.table(productFound);
};
exports.searchProductByName = searchProductByName;
exports.pets = [
    {
        id: "p001",
        name: "Thor",
        age: 5,
        size: types_1.PET_SIZE.MEDIUM,
    },
    {
        id: "p002",
        name: "Lili",
        age: 10,
        size: types_1.PET_SIZE.SMALL,
    },
    {
        id: "p003",
        name: "Pingo",
        age: 3,
        size: types_1.PET_SIZE.LARGE,
    },
    {
        id: "p004",
        name: "Luna",
        age: 7,
        size: types_1.PET_SIZE.MEDIUM,
    },
];
//# sourceMappingURL=database.js.map