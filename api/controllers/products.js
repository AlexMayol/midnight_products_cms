
const client = require('../database/db');


const getProducts = (request, response) => {
    client.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ info: results.rows })
    })
}

const getProduct = (request, response) => {
    let id = parseInt(request.params.id)
    client.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ info: results.rows })
    })
}

const createProduct = (request, response) => {    
    console.log(request.body)
    const { code } = request.body

    client.query('INSERT INTO products (code) VALUES ($1)', [code], (error, results) => {
        if (error) {
            throw error
        }
        
        console.log(results)
        response.status(201).send({ success: true, message: `Category added with ID: ${results.insertId}` })
    })
}

const updateProduct = (request, response) => {
    const id = parseInt(request.params.id)    
    const { code } = request.body

    client.query(
        'UPDATE products SET code = $1  WHERE id = $2',
        [code, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ success: true, message: `Color modified with ID: ${id}` })
        }
    )
}

const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id)
    client.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ success: true, message: `Color deleted with ID: ${id}` })
    })
}

const deleteProducts = (request, response) => {
    client.query('DELETE FROM products', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ success: true, message: `All categories deleted` })
    })
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProducts
}