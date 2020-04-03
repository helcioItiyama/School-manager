const db = require('../../config/db')
const Base = require('./Base');

const {date} = require('../../lib/utils');

Base.init({table: 'students'});

module.exports = {
    ...Base,

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

    find(id, callback) {
        db.query(`SELECT students.*, teachers.name AS teacher_name
        FROM students
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
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