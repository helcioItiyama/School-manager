const express = require('express');
const routes = express.Router();
const teachers = require('./app/controllers/teachers');
const students = require('./app/controllers/students')

routes.get('/', (req, res) =>{
    return res.redirect('instructor');
});

routes.get('/instructor', teachers.index);
routes.get('/instructor/create', teachers.create);
routes.get('/instructor/:id', teachers.show);
routes.get('/instructor/:id/edit', teachers.edit);
routes.post('/instructor', teachers.post);
routes.put('/instructor', teachers.put);
routes.delete('/instructor', teachers.delete);

routes.get('/student', students.index);
routes.get('/student/create', students.create);
routes.get('/student/:id', students.show);
routes.get('/student/:id/edit', students.edit);
routes.post('/student', students.post);
routes.put('/student', students.put);
routes.delete('/student', students.delete);

module.exports = routes;