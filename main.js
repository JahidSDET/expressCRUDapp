require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const Product = require('./models/product.model')

const app = express()
app.use(express.json())

const port = process.env.PORT || 4000

// Home route
app.get('/', (req, res) => {
  res.send('Hello World from Rest API')
})

// Create a new product (POST)
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).send(product)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get all products (GET)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get a product by ID (GET)
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).send({ message: 'Product not found' })
    }
    res.status(200).send(product)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Update a product by ID (PUT)
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).send({ message: 'Product not found' })
    }
    res.status(200).send(product)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Delete a product by ID (DELETE)
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).send({ message: 'Product not found' })
    }
    res.status(200).send({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://jahid82:JwyGDUUAefdbS2iA@crud01.i6xl7.mongodb.net/?retryWrites=true&w=majority&appName=CRUD01',
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

