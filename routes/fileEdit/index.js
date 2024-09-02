import express from "express";
import { validationResult } from "express-validator";
import { deleteItemById, getItems, getItemsById, insertItems, updateItemById } from "./query";

const routes = express.Router()

//  Insert Item
routes.post('/items', async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ type: "error", errors });
    }
    const data = await insertItems(req)
    res.status(200).send({ type: "sucess", data, message: "New Item added successfully!" })
});

//  Get All items
routes.get('/items', async (req, res) => {
    const data = await getItems()
    res.status(200).send({ type: "sucess", data })
});


// Get Item by id
routes.get('/items/:id', async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ type: "error", errors });
    }

    const data = await getItemsById(req.params.id)
    res.status(200).send({ type: "sucess", data })
});

// Update item by id
routes.put('/items/:id', async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ type: "error", errors });
    }

    const data = await updateItemById(req)
    res.status(200).send({ type: "sucess", data, message: "Item updated successfully!" })
});

// delete item by id
routes.delete('/items/:id', async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ type: "error", errors });
    }
    
    const data = await deleteItemById(req)
    res.status(200).send({ type: "sucess", message: data })
});



export { routes as FileEdit }