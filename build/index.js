"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => console.log(`Port 3003 connected.`));
app.get("/ping", (req, res) => {
    res.send(`Pong!`);
});
app.get("/pets", (req, res) => {
    res.status(200).send(database_1.pets);
});
app.get("/pets/search", (req, res) => {
    const q = req.query.q;
    const result = database_1.pets.filter((pet) => pet.name.toLowerCase().includes(q.toLowerCase()));
    res.status(200).send(result);
});
app.post("/pets", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const size = req.body.size;
    const newPet = {
        id,
        name,
        age,
        size,
    };
    database_1.pets.push(newPet);
    res.status(201).send("Pet successful registered.");
    return database_1.pets;
});
app.get("/pet/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.pets.find((pet) => {
        return pet.id === id;
    });
    res.status(200).send(result);
});
app.put("/pets/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newAge = req.body.age;
    const newSize = req.body.size;
    const pet = database_1.pets.find((pet) => {
        return pet.id === id;
    });
    if (pet) {
        pet.id = newId || pet.id;
        pet.name = newName || pet.name;
        pet.size = newSize || pet.size;
        pet.age = isNaN(newAge) ? pet.age : newAge;
    }
    res.status(200).send("Pet data updated.");
});
//# sourceMappingURL=index.js.map