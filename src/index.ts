import express, { Request, Response } from "express";
import { Tproducts, Tusers } from "./types";
import cors from "cors";

import { db } from "./database/knex";


// create express server
const app = express();

//middleware - garantees response is a JSON file
app.use(express.json());

//middleware config - enables CORS (cross-origin-sharing) that allows front-end responses be send to a back-end local server.
app.use(cors());

//enables port to app use
app.listen(3003, () => console.log(`Port 3003 connected.`));


//Return all users
app.get("/users", async (req: Request, res: Response) => {

  try {
    //get users table
    const result = await db('users')

    res.status(200).send(result);

  } catch (error: any) {

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});

//Return all products
app.get("/products", async (req: Request, res: Response) => {

  try {

    const queryParams = req.query.name as string | undefined

    //check if queryParams exists or if it has more than 2 digits.
    if (queryParams !== undefined && queryParams.length < 2) {
      res.status(400)
      throw new Error("Searching by name expect at least 2 letters.")
    }

    //if exists, check its length to return by name, could be a part of the full word.
    if (queryParams && queryParams.length > 2) {

      const result = await db.select('*').from('products').where(`name`, `like`, `%${queryParams}%`)

      res.status(200).send(result)
    }

    //if no params is passed, returns products table.
    if (!queryParams || queryParams === undefined) {

      const result = await db('products')
      res.status(200).send(result);
    }


  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});



//create new user
app.post("/users", async (req: Request, res: Response) => {

  try {
    const id = req.body.id as string
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    const createdAt = new Date().toISOString();

    //check if id already exists
    const [idAlreadyRegistered] = await db.select(`*`).from('users').where(`id`, `=`, `${id}`)


    //avoid duplicated id.
    if (idAlreadyRegistered) {
      res.status(400)
      throw new Error("User id already registered.");
    }

    //email already registered checker.
    const [emailAlreadyRegistered] = await db.select(`*`).from(`users`).where(`email`, `=`, `${email}`)


    //avoid duplicated email.
    if (emailAlreadyRegistered) {
      res.status(400)
      throw new Error("User email already registered.");
    }



    //check id string.
    if (typeof id !== "string") {
      res.status(400)
      throw new Error("ID should be a string.");
    }

    //check name string.
    if (typeof name !== "string" || name.match(/^(?=.*\d).+$/)) {
      res.status(400)
      throw new Error("Name should be a string without number.");
    }

    //check email format.
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

    //New object(user) to be insert on table.
    const newUser: Tusers = {
      id: id,
      name: name,
      email: email,
      password: password,
      created_at: createdAt
    }

    await db(`users`).insert(newUser)

    res.status(201).send("User registered!");
  } catch (error: any) {
    if (res.statusCode === 201) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});

//create new product
app.post("/products", async (req: Request, res: Response) => {

  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const image_url = req.body.image_url as string;

    //check if ID already exists.
    const [idAlreadyRegistered] = await db('products').where({ id: id })
    if (idAlreadyRegistered) {
      res.status(400)
      throw new Error("This ID is already been used.");
    }

    //check if id is a string.
    if (typeof id !== "string") {
      res.status(400)
      throw new
        Error("Id should be a string.");
    }
    //check if name is a string.
    if (typeof name !== "string") {
      res.status(400)
      throw new Error("Name should be a string.");
    }
    //check if price is a number greater or equal to 0.
    if (typeof price !== "number" || price < 0) {
      res.status(400)
      throw new Error("Price should be a number greater than 0");
    }
    //check if description is a string or if it has more than 1 digit.
    if (typeof description !== "string" || description.length < 1) {
      res.status(400)
      throw new Error("Description shoud be a string with more than 1 digit.");
    }
    //check if image_url is a string. 
    if (typeof image_url !== "string") {
      res.status(400)
      throw new Error("Image url should be a link.");
    }

    //creates a new object following the Tproducts pre-defined type.
    const newProduct: Tproducts = {
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: image_url
    }

    //insert new product to products table.
    await db('products').insert(newProduct)
    res.status(201).send("Product registered!");

  } catch (error: any) {
    if (res.statusCode === 201) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});

//delete user
app.delete("/users/:id", async (req: Request, res: Response) => {

  try {
    const idToDelete = req.params.id as string;

    //check if user id pattern is correct.
    if (idToDelete[0].toLowerCase() !== "u") {
      res.status(400)
      throw new Error("Id should have letter 'u' as initial.")
    }

    //try to find user by id
    const [user] = await db('users').where({ id: idToDelete })

    //check if user exists
    if (!user) {
      res.status(400)
      throw new Error("User ID not found.");
    }

    //executes the properly query to delete user.
    await db("users").del().where({ id: idToDelete })
    res.status(200).send("User deleted!");


  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});

//delete product
app.delete("/products/:id", async (req: Request, res: Response) => {

  try {
    const idToDelete = req.params.id as string;

    const [idExist] = await db('products').where({ id: idToDelete })

    if (!idExist) {
      res.status(404)
      throw new Error("Product ID not found.");
    }

    await db('products').del().where({ id: idToDelete })

    res.status(200).send("Product deleted!");
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});

//edit products
app.put("/products/:id", async (req: Request, res: Response) => {

  try {
    const id = req.params.id as string;

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const [product] = await db('products').where({ id: id })


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

    if (product) {
      const updateUser = {
        name: newName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newImageUrl || product.image_url
      }

      await db('products').update(updateUser).where({ id: id })
      res.status(200).send(product);

    } else {
      res.status(404)
      throw new Error("Product not found.")
    }



  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }

});






app.get("/purchases/:id", async (req: Request, res: Response) => {

  try {
    const id = req.params.id


    if (id === ":id") {
      res.status(400)
      throw new Error("Id is mandatory.")
    }

    const [purchases] = await db('purchases').select('purchases.id AS purchaseID',
      'purchases.buyer AS buyerID',
      'users.name AS buyerName',
      'users.email AS userEmail',
      'purchases.created_at AS createdAt',
    ).innerJoin('users', 'purchases.buyer', '=', 'users.id').where({ purchaseID: id })

    if (!purchases || typeof purchases === undefined || id === ':id') {
      res.status(404)
      throw new Error("Id not found.")
    }

    const productsArray = []
    const productsPurchased = await db('purchases_products').select().where({ purchase_id: id })

    for (const prod of productsPurchased) {
      const prodId = prod.product_id
      const [result] = await db('products').where({ id: prodId })
      result.quantity = prod.quantity
      productsArray.push(result)
    }

    let totalPrice = 0;
    for (const price of productsArray) {
      totalPrice += price.price * price.quantity
    }

    const purchaseResult = {
      purchaseId: purchases.purchaseID,
      buyerId: purchases.buyerID,
      buyerName: purchases.buyerName,
      totalPrice: totalPrice,
      createdAt: purchases.createdAt,
      products: productsArray
    }

    res.status(200).send(purchaseResult)


  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }

  }

})



app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string
    const buyer = req.body.buyer as string
    const products = req.body.products


    const [idExist] = await db('purchases').where({ id })

    if (idExist) {
      res.status(400)
      throw new Error("Purchase ID already registered.")
    }

    if (!idExist && !id || !buyer) {
      res.status(400)
      throw new Error("All fields are mandatory.")
    }

    const [buyerExist] = await db('users').where({ id: buyer })

    if (!buyerExist) {
      res.status(404)
      throw new Error("Buyer not found.")
    }

    const resultProducts = []

    let totalPrice = 0

    for (const prod of products) {
      const [product] = await db('products').where({ id: prod.id })
      resultProducts.push({ ...product, quantity: prod.quantity })
    }

    for (const product of resultProducts) {
      totalPrice += product.quantity * product.price
    }


    const newPurchase = {
      id: id,
      buyer: buyer,
      total_price: totalPrice
    }
    await db('purchases').insert(newPurchase)

    for (const product of products) {
      const newPurchasesProducts = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity
      }

      await db('purchases_products').insert(newPurchasesProducts)

    }

    res.status(201).send("New purchase registered sucessfully.")
  } catch (error: any) {
    if (res.statusCode === 201) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }
})



app.delete('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (!id || id === ":id" || id === undefined) {
      res.status(400)
      throw new Error("An id is exepected to find purchase to be deleted.")
    }

    const [result] = await db(`purchases`).select(`*`).where({ id: id })

    if (!result) {
      res.status(404)
      throw new Error("Product ID cannot be found.")
    }

    await db('purchases').del().where({ id })

    res.status(200).send("Purchase has been cancelled.")

  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Unexpected error.")
    }
  }
})

