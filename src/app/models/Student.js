const db = require('../../config/db')
const {date} = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`
            SELECT students.*, teachers.name AS teachers_name
            FROM students
            LEFT JOIN teachers ON (teachers.id = students.teacher_id)
            ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows);
        })
    },

    create(data, callback) {
        const query = `
        INSERT INTO students (
        name,
        email,
        birth,
        school_year,
        course_load,
        avatar_url,
        teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`

        const values = [
            data.name,
            data.email,
            date(data.birth).iso,
            data.school_year,
            data.course_load,
            data.avatar_url,
            data.teacher
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0]);
            
        })
    },

    find(id, callback) {
        db.query(`SELECT students.*, teachers.name AS teacher_name
        FROM students
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
        UPDATE students SET
            avatar_url = ($1),
            name = ($2),
            email = ($3),
            birth = ($4),
            school_year = ($5),
            course_load = ($6),
            teacher_id = ($7)
        WHERE id = $8`

        const value = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.school_year,
            data.course_load,
            data.teacher,
            data.id
        ]

        db.query(query, value, (err, results) => {
            if(err) throw `Data Error! ${err}`
            callback()
        })
    },

    delete(id, callback) {
        db.query( `
        DELETE FROM students
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Data error! ${err}`
            callback()
        })
    },

    teachersSelectOptions(callback) {
        db.query(`
        SELECT name, id
        FROM teachers`, (err, results) => {
            if(err) throw `Data error! ${err}`
            callback(results.rows)
        })

    },

    paginate(params) {
        const {filter, limit, offset, callback} = params;

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM students) AS total`
        
        if(filter) {
            filterQuery = `
                WHERE students.name ILIKE '%${filter}%'
                OR students.school_year ILIKE '%${filter}%'`
            
            totalQuery = `(SELECT count(*) FROM students ${filterQuery}) AS total`
        }

        query = `
            SELECT students.*, ${totalQuery}, teachers.name AS teachers_name
            FROM students
            LEFT JOIN teachers ON (teachers.id = students.teacher_id)
            ${filterQuery}
            ORDER BY name ASC
            LIMIT $1 OFFSET $2`
        
        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `Data error! ${err}`
            callback(results.rows)
        })
    }
}