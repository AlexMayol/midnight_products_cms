
const client = require('../database/db');



const getColors = (request, response) => {
    client.query('SELECT * FROM colors ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ info: results.rows })
    })
}


const getColor = (request, response) => {
    let id = parseInt(request.params.id)
    client.query('SELECT * FROM colors WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ info: results.rows })
    })
}

const createColor = (request, response) => {    
    console.log(request.body)
    const { code } = request.body

    client.query('INSERT INTO colors (code) VALUES ($1)', [code], (error, results) => {
        if (error) {
            throw error
        }
        
        console.log(results)
        response.status(201).send({ success: true, message: `Color added with ID: ${results.insertId}` })
    })
}

const updateColor = (request, response) => {
    const id = parseInt(request.params.id)    
    const { code } = request.body

    client.query(
        'UPDATE colors SET code = $1  WHERE id = $2',
        [code, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ success: true, message: `Color modified with ID: ${id}` })
        }
    )
}

const deleteColor = (request, response) => {
    const id = parseInt(request.params.id)
    client.query('DELETE FROM colors WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ success: true, message: `Color deleted with ID: ${id}` })
    })
}

const deleteColors = (request, response) => {
    client.query('DELETE FROM colors', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ success: true, message: `All colors deleted` })
    })
}


module.exports = {
    getColors,
    getColor,
    createColor,
    updateColor,
    deleteColor,
    deleteColors
}