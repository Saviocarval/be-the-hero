const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const bcrypt = require('bcryptjs');

module.exports = {

    async index(req, res)  {
        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    },

    async create(req, res){
        const {name, email, whatsapp, city, uf, password} = req.body;

        const id = await generateUniqueId();

        bcrypt.hash(password,12, async function(err, password){
            if(err){
                return;
            }

            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
                password
            })


        })

        

        return res.json({id})
    }
}