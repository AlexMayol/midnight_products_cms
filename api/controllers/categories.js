
const client = require('../database/db');



const getCategories = (request, response) => {
    client.query('SELECT * FROM categories ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ info: results.rows })
    })
}

const getCategory = (request, response) => {
    let id = parseInt(request.params.id)
    client.query('SELECT * FROM categories WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ info: results.rows })
    })
}

const createCategory = (request, response) => {    
    console.log(request.body)
    const { name, description } = request.body

    client.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description], (error, results) => {
        if (error) {
            throw error
        }
        
        console.log(results)
        response.status(201).send({ success: true, message: `Category added with ID: ${results.insertId}` })
    })
}

const updateCategory = (request, response) => {
    const id = parseInt(request.params.id)    
    const { name, description } = request.body

    client.query(
        'UPDATE categories SET name = $1, description = $2  WHERE id = $3',
        [name, description, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ success: true, message: `Category modified with ID: ${id}` })
        }
    )
}

const deleteCategory = (request, response) => {
    const id = parseInt(request.params.id)
    client.query('DELETE FROM categories WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ success: true, message: `Category deleted with ID: ${id}` })
    })
}

const deleteCategories = (request, response) => {
    client.query('DELETE FROM categories', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ success: true, message: `All categories deleted` })
    })
}


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteCategories
}