const {age, date, level} = require('../../lib/utils');
const Intl = require('intl');
const Teacher = require('../models/Teacher');


module.exports = {
    index(req, res) {
        let {filter, page, limit} = req.query;
        page = page || 1;
        limit = limit || 3;
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {

                if(teachers[0] == undefined) {
                    return res.render("instructor/index")
                 }

                const pagination = {
                   
                    total: Math.ceil(teachers[0].total / limit),
                    page
                } 
                return res.render('instructor/index', {teachers, pagination, filter})
            }
        }

        Teacher.paginate(params)
    },

    create(req, res) {
        return res.render('instructor/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send ("Please, fill all the fields")
            }
        }
        Teacher.create(req.body, (teacher) => {
            return res.redirect(`instructor/${teacher.id}`)
        })
    },

    show(req, res) {
       Teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send(`Teacher not found!`)
            teacher.age = age(teacher.birthdate);
            teacher.educationlevel = level(teacher.educationlevel);
            teacher.subjectstaught = teacher.subjectstaught.split(',');
            teacher.created_at = date(teacher.created_at).format
            return res.render(`instructor/show`, {teacher})
       })
    },

    edit(req, res) {
        Teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send("Teacher not found!")
            teacher.birthdate = date(teacher.birthdate).iso;
            return res.render("instructor/edit", {teacher})
        })
    },
    
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send ("Please, fill all the fields")
            }
        }
        Teacher.update(req.body, () => {
            return res.redirect(`instructor/${req.body.id}`)
        })
    },
    
    delete(req, res) {
        Teacher.delete(req.body.id, () => {
            return res.redirect("instructor")
        })
    }
}