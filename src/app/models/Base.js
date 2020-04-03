const db = require('../../config/db');

const Base = {
    init({table}) {
        if(!table) throw new Error('Invalid Params')

        this.table = table;
        return this;
    },

    create(fields, callback) {
        const keys = [],
            values = [];

            console.log(fields)
        Object.keys(fields).map(key => {
            keys.push(key)
            console.log(fields[key])
            values.push(`'${fields[key]}'`)
        })

        const query = `
        INSERT INTO ${this.table} (${keys.join(',')}) 
        VALUES (${values.join(',')})
        RETURNING id`

        db.query(query, (err, results) => {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0]);
            
        })
    },

    update(id, fields, callback) {
        const update = [];

        Object.keys(fields).map(key => {
            const line = `${key} = '${fields[key]}'`;
            update.push(line);
        })

        let query = `UPDATE ${this.table}
        SET ${update.join(',')} WHERE id = ${id}`
        
        db.query(query, (err, results) => {
            if(err) throw `Data Error! ${err}`
            callback()
        })
    },

    delete(id, callback) {
        db.query( `
        DELETE FROM ${this.table}
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Data error! ${err}`
            callback()
        })
    },
}

module.exports = Base;
