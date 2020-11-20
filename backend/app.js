const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());


//MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'node20_mysql'
});

//all testing of endpoints is makeing with postman 

//Route  
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

//show all films http://localhost:3000/films
app.get('/films', (req, res) => {
    const sql = 'SELECT * FROM films';

    connection.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0 ) {
            res.json(results);
        } else {
            res.send('Not result');
        }
    });
});

//show films by id  http://localhost:3000/films/12
app.get('/films/:id', (req, res) => {
    
    const { id } = req.params
    const sql = `SELECT * FROM films WHERE id = ${id}`;
    connection.query(sql, (error, result) =>{
        if (error) throw error;
        if (result.length > 0 ) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


// add films  http://localhost:3000/add
app.post('/add', (req, res)=>{
    const sql = 'INSERT INTO films SET ?';

    const filmsObj = {
        title: req.body.title,
        descriptions: req.body.descriptions,
        duracion: req.body.duracion,
        trailer: req.body.trailer,
        fecha: req.body.fecha,
        caratula: req.body.caratula
    }

    connection.query(sql, filmsObj, error =>{
        if (error) throw error;
        res.send('Film created!');
    }); 
});

// put film reciving params like id http://localhost:3000/update/22
app.put('/update/:id', (req, res)=>{
    const  { id } = req.params;
    const { title, descriptions, duracion, trailer, fecha, caratula } = req.body;
    const sql = `UPDATE films SET title = '${title}', descriptions = '${descriptions}',  
    duracion = '${duracion}', trailer = '${trailer}', fecha = '${fecha}', caratula = '${caratula}' WHERE
    id=${id} `;
    connection.query(sql,  error =>{
        if (error) throw error;
        res.send('Film updated!');
    }); 
});

// delete film http://localhost:3000/delete/22
app.delete('/delete/:id', (req, res) =>{

    const {id} = req.params;
    const  sql = `DELETE FROM films WHERE id = ${id}`;
    connection.query(sql,  error =>{
        if (error) throw error;
        res.send('Delete film');
    }); 
});


// Check connect
connection.connect(error => {
if (error) throw error;
    console.log('Database server running!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







