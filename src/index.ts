import express, { Request, Response } from "express";
import { PET_SIZE, TPet, Tproducts, Tusers } from "./types";
import cors from "cors";
import {
  users,
  pets,
  products,
} from "./database";
import { type } from "os";

// cria servidor express
const app = express();

//middleware - garante que respostas sejam em JSON
app.use(express.json());

//middleware config - habilita uso do CORS (cross-origin-sharing) que permite que respostas do front sejam enviadas para um http (back) localmente.
app.use(cors());

//configura porta de uso do app
app.listen(3003, () => console.log(`Port 3003 connected.`));

//sintaxe de criação de endpoints:
//* app.method(path, handler)
//-- app = acessa recursos do express
//-- method = metodo de requisição http usado, CRUD (get, post, put, delete)
//-- path = caminho ou url que será utilizado para chegar ao endpoint, sempre entre aspas como string
//-- handler = callback adicinado para quando isso chegar ao endpoint (recebe dois parametros, sendo um a requisição recebida no front como a resposta enviada pelo back)



//retorna todos os users
app.get("/users", (req: Request, res: Response) => {

  try {
    res.status(200).send(users);
  } catch (error: any) {
    res.status(404).send(error.message);
  }

});

//retorna todos os produtos
app.get("/products", (req: Request, res: Response) => {

  try {
    const queryParams = req.query.name as string | undefined

    if (queryParams !== undefined && queryParams.length < 2) {
      res.status(400)
      throw new Error("Searching by name expect at least 2 letters.")
    }

    if (queryParams && queryParams.length > 2) {
      const result = products.filter((product) => {
        return product.name.toLowerCase().includes(queryParams.toLowerCase());
      });
      res.status(200).send(result)
    }

    res.status(200).send(products);

  } catch (error: any) {
    res.status(400).send(error.message);
  }

});

//retorna produto especifico
app.get("/products/:name", (req: Request, res: Response) => {

  try {
    const name = req.params.name;

    if (name.length <= 1) {
      res.status(400)
      throw new Error("Too short to find. Try with at least 2 characters.");
    }

    const result = products.filter((product) => {
      return product.name.toLowerCase().includes(name.toLowerCase());
    });

    if (result.length <= 0) {
      res.status(404);
      throw new Error("Product not found.");
    }


    res.status(200).send(result);

  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }

});

//create new user
app.post("/users", (req: Request, res: Response) => {

  try {
    const id = req.body.id as string
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    const createdAt = new Date().toISOString();

    //id already registered checker.
    const idAlreadyRegistered = users.find((user) => {
      return user.id === id;
    });
    //avoid duplicated id.
    if (idAlreadyRegistered) {
      res.status(400)
      throw new Error("User id is already registered.");
    }

    //email already registered checker.
    const emailAlreadyRegistered = users.find((user) => {
      res.status(400)
      return user.email === email;
    });
    //avoid duplicated email.
    if (emailAlreadyRegistered) {
      res.status(400)
      throw new Error("User email already registered.");
    }

    //check id string
    if (typeof id !== "string") {
      res.status(400)
      throw new Error("ID should be a string.");
    }

    //check name string
    if (typeof name !== "string" || name.match(/^(?=.*\d).+$/)) {
      res.status(400)
      throw new Error("Name should be a string without number.");
    }

    //check email format
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (typeof email !== "string" || !email.match(emailRegEx)) {
      res.status(400)
      throw new Error("Invalid email format.");
    }

    //Minimum eight characters, at least one letter, one number and one special character:
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (typeof password !== "string" || !password.match(passwordRegEx)) {
      res.status(400)
      throw new Error("Invalid password format.");
    }
    const newUser: Tusers = {
      id,
      name,
      email,
      password,
      createdAt,
    };

    users.push(newUser);

    res.status(201).send("User registered!");
  } catch (error: any) {
    res.send(error.message);
  }

});

//create new product
app.post("/products", (req: Request, res: Response) => {

  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

    const idAlreadRegistered = products.find((product) => {
      return product.id === id;
    });
    if (idAlreadRegistered) {
      res.status(400)
      throw new Error("This ID is already been used.");
    }

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("Id should be a string.");
    }
    if (typeof name !== "string") {
      res.status(400)
      throw new Error("Name should be a string.");
    }
    if (typeof price !== "number" || price < 0) {
      res.status(400)
      throw new Error("Price should be a number greater than 0");
    }
    if (typeof description !== "string" || description.length < 1) {
      res.status(400)
      throw new Error("Description shoud be a string with more than 1 digit.");
    }
    if (typeof imageUrl !== "string") {
      res.status(400)
      throw new Error("Image url should be a link.");
    }

    const newProduct: Tproducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    products.push(newProduct);

    res.status(201).send("Product registered!");
  } catch (error: any) {
    res.send(error.message);
  }

});

//delete user
app.delete("/users/:id", (req: Request, res: Response) => {

  try {
    const id = req.params.id;
    const idExist = users.find((user) => {
      return user.id === id;
    });
    if (!idExist) {
      res.status(400)
      throw new Error("User ID not found.");
    }
    const toDelete = users.findIndex((user) => {
      res.status(400)
      return user.id === id;
    });

    if (toDelete >= 0) {
      users.splice(toDelete, 1);
    }

    res.status(200).send("User deleted!");
  } catch (error: any) {
    res.send(error.message);
  }

});

//delete product
app.delete("/products/:id", (req: Request, res: Response) => {

  try {
    const id = req.params.id;

    const idExist = products.find((product) => {
      return product.id === id;
    });

    if (!idExist) {
      res.status(404)
      throw new Error("Product ID not found.");
    }
    const toDelete = products.findIndex((product) => {
      return product.id === id;
    });

    if (toDelete >= 0) {
      products.splice(toDelete, 1);
    }

    res.status(200).send("Product deleted!");
  } catch (error: any) {
    res.send(error.message);
  }

});

//edit products
app.put("/products/:id", (req: Request, res: Response) => {

  try {
    const id = req.params.id;

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const product = products.find((product) => {
      return product.id === id;
    });


    if (!product) {
      res.status(404)
      throw new Error("Product not found.");
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400)
        throw new Error("Name should be a string.");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400)
        throw new Error("Invalid description format.");
      }
    }

    if (newImageUrl !== undefined) {
      if (typeof newImageUrl !== "string") {
        res.status(400)
        throw new Error("Invalid image url.");
      }
    }


    product.name = newName || product.name;
    product.price = isNaN(newPrice) ? product.price : newPrice;
    product.description = newDescription || product.description;
    product.imageUrl = newImageUrl || product.imageUrl;

    res.status(200).send("Product edited!");


  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message);
  }

});

//////// PET FLOW EXERCICIES
app.get("/ping", (req: Request, res: Response) => {
  res.send(`Pong!`);
});
//get all pets
app.get("/pets", (req: Request, res: Response) => {
  res.status(200).send(pets);
});

//get pet using multiples results search with query params
app.get("/pets/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result: TPet[] = pets.filter((pet) =>
    pet.name.toLowerCase().includes(q.toLowerCase())
  );
  res.status(200).send(result);
});

//post a new pet
const newPetzin: TPet = {
  name: "cride",
  id: "p006",
  age: 10,
  size: PET_SIZE.MEDIUM,
};

app.post("/pets", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const age = req.body.age as number;
  const size = req.body.size as PET_SIZE;

  const newPet: TPet = {
    id,
    name,
    age,
    size,
  };

  pets.push(newPet);

  res.status(201).send("Pet successful registered.");

  return pets;
});

//get a pet beeing more specific without query params
app.get("/pet/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const result = pets.find((pet) => {
    return pet.id === id;
  });

  res.status(200).send(result);
});

//edit a pet info

app.put("/pets/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id;
  const newName = req.body.name;
  const newAge = req.body.age;
  const newSize = req.body.size;

  const pet = pets.find((pet) => {
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

//delete a pet
app.delete("/pets/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const petIndex = pets.findIndex((pet) => {
    return pet.id === id;
  });

  if (petIndex >= 0) {
    pets.splice(petIndex, 1);
  }

  res.status(200).send("Pet successful deleted.");
});

//add a pet
app.post("/pets", (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;

  try {
    if (typeof id !== "string") {
      throw new Error("'id' should be a string.");
    }
    if (typeof name !== "string") {
      throw new Error("'name' should be a string.");
    }
  } catch (error: any) {
    res.status(400).send("Error!");
  }
});
