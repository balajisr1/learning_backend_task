import { readData, writeData } from "../../utils/common"
import path from "path"
import * as uuid from 'uuid'
const filepath = path.join(__dirname, "../../utils/details.json")

const insertItems = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = await readData(filepath)
            const newItem = req.body
            newItem.id = uuid.v4()
            items.push(newItem)

            writeData(items, filepath)

            resolve(newItem)
        } catch (error) {
            reject(error)
        }
    })
}

const getItems = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = await readData(filepath)
            resolve(items)
        } catch (error) {
            reject(error)
        }
    })
}

const getItemsById = (item_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = readData(filepath)
            const item = items.find(i => i.id === item_id)
            if (!item) {
                resolve("Data not found")
            }

            resolve(item)
        } catch (error) {
            reject(error)
        }
    })
}

const updateItemById = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = readData(filepath);
            const itemIndex = items.findIndex(i => i.id === req.params.id)

            if (itemIndex === -1) {
                reject("Data not found")
            }
            // if (itemIndex === -1) {
            //     return res.status(404).json({ message: 'Item not found' })
            // }

            const updatedItem = { ...items[itemIndex], ...req.body }
            items[itemIndex] = updatedItem

            writeData(items, filepath);

            resolve(updatedItem);
        } catch (error) {
            reject(error)
        }
    })
}

const deleteItemById = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = readData(filepath);
            const itemIndex = items.findIndex(i => i.id === req.params.id)

            // if (itemIndex === -1) {
            //     return res.status(404).json({ message: 'Item not found' })
            // }
            if (itemIndex === -1) {
                reject("Data not found")
            }

            items.splice(itemIndex, 1)
            writeData(items, filepath)

            resolve("Item Deleted Successfully")
        } catch (error) {
            reject(error)
        }
    })
}

export { insertItems, getItems, getItemsById, updateItemById, deleteItemById }