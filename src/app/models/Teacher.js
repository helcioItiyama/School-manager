const db = require('../../config/db')
const {date, grade, reverseGrade} = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`
            SELECT * 
            FROM teachers
            ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows);
        })
    },

    create(data, callback) {
        const query = `
        INSERT INTO teachers (
        name,
        birthdate,
        educationlevel,
        classtype,
        subjectstaught,
        created_at,
        avatar_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`

        const values = [
            data.name,
            date(data.birthdate).iso,
            data.educationlevel,
            data.classtype,
            data.subjectstaught,
            date(Date.now()).iso,
            data.avatar_url
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0]);
            
        })
    },

    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },

    findBy(filter, callback) {
        db.query(`
        SELECT *
        FROM teachers
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.subjectsTaught ILIKE '%${filter}%'`, (err, results) => {
            if(err) throw `Data error! ${err}`
            callback(results.rows);
        })
    },

    update(data, callback) {
        const query = `
        UPDATE teachers SET
            avatar_url = ($1),
            name = ($2),
            birthdate = ($3),
            educationlevel = ($4),
            classtype = ($5),
            subjectstaught = ($6)
        WHERE id = $7`

        const value = [
            data.avatar_url,
            data.name,
            date(data.birthdate).iso,
            data.educationlevel,
            data.classtype,
            data.subjectstaught,
            data.id
        ]

        db.query(query, value, (err, results) => {
            if(err) throw `Data Error! ${err}`
            callback()
        })
    },

    delete(id, callback) {
        db.query( `
        DELETE FROM teachers
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Data error! ${err}`
            callback()
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