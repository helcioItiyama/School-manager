const db = require('../../config/db')
const Base = require('./Base');

const {date, grade, reverseGrade} = require('../../lib/utils');

Base.init({table: 'teachers'});

module.exports = {
    ...Base,

    all(callback) {
        db.query(`
            SELECT * 
            FROM teachers
            ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows);
        })
    },

    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },

    paginate(params) {
        const {filter, limit, offset, callback} = params;

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM teachers) AS total`
        
        if(filter) {
            filterQuery = `
                WHERE teachers.name ILIKE '%${filter}%'
                OR teachers.subjectstaught ILIKE '%${filter}%'`
            
            totalQuery = `(SELECT count(*) FROM teachers ${filterQuery}) AS total`
        }

        query = `SELECT teachers.*, ${totalQuery}
            FROM teachers
            ${filterQuery}
            LIMIT $1 OFFSET $2`
        
        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `Data error! ${err}`
            callback(results.rows)
        })

    }

}