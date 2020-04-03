const {grade, date} = require('../../lib/utils');
const Student = require('../models/Student');


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
            callback(students) {

                if(students[0] == undefined) {
                    return res.render("student/index")
                 }

                const pagination = {
                    total: Math.ceil(students[0].total/limit),
                    page
                }

                for (let student of students) {
                    student.school_year = grade(student.school_year)
                }

                return res.render('student/index', {students, pagination, filter})
            }
        }

        Student.paginate(params)
    },

    create(req, res) {
        Student.teachersSelectOptions((options) =>{
            return res.render('student/create', {teacherOptions: options})
        })
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send ("Please, fill all the fields")
            }
        }

        let {name, email, birth, school_year, course_load, avatar_url, teacher} = req.body;

        birth = date(birth).iso;

        Student.create({
            name, email, birth, school_year, course_load, avatar_url, teacher_id:teacher
        }, (student) => {
            return res.redirect(`student/${student.id}`)
        })
    },

    show(req, res) {
       Student.find(req.params.id, (student) => {
            if (!student) return res.send(`Student not found!`)
            student.birth = date(student.birth).birthDay;
            student.school_year = grade(student.school_year);
            return res.render(`student/show`, {student})
       })
    },

    edit(req, res) {
        Student.find(req.params.id, (student) => {
            if(!student) return res.send("Student not found!")
            student.birth = date(student.birth).iso;
            Student.teachersSelectOptions((options) =>{
                return res.render('student/edit', {student, teacherOptions: options})
            })
        })
    },
    
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send ("Please, fill all the fields")
            }
        }
        let {avatar_url, name, email, birth, school_year, course_load, teacher} = req.body;

        Student.update(req.body.id, {
            avatar_url,
            name,
            email,
            birth: date(birth).iso,
            school_year,
            course_load,
            teacher_id: teacher
        }, () => {
            return res.redirect(`student/${req.body.id}`)
        })
    },
    
    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect("student")
        })
    }
}

