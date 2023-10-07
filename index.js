const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { readData, writeData } = require('./functions')
require('dotenv').config()

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send('Welcome to my API with NodeJS')
})

//EJEMPLOS DE CREATE Y READ

app.get("/dishes", (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post('/dishes', (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})

// EJERCICIOS DE CREATE, READ, UPDATE Y DELETE

app.get("/books", (req, res) => {
    const data = readData()
    res.json(data.books)
})

app.post('/books', (req, res) => {
    const data = readData()
    const book = req.body
    const newBook = {
        id: data.books.length + 1,
        ...book
    }
    data.books.push(newBook)
    writeData(data)
    res.json(newBook)
})

app.put("/books/:id", (req, res) => {
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex(book => book.id === id)
    data.books[bookIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "Dish update succesfully" })

})

app.delete("/books/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex(book => book.id === id)
    data.books.splice(bookIndex, 1)
    writeData(data)
    res.json({ message: "Se borro el platillo"})
}) 

//EJEMPLOS DE UPDATE Y DELETE

app.put("/dishes/:id", (req, res) => {
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "Dish update succesfully" })

})

app.delete("/dishes/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes.splice(dishIndex, 1)
    writeData(data)
    res.json({ message: "Se borro el platillo"})
}) 

// ESCUCHADOR

app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.BACKEND_BASEURL}`)
})
