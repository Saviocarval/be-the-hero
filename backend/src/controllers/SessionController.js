const connection = require('../database/connection')
const bcrypt = require('bcryptjs');

module.exports = {
    async create(req, res)  {
        const {id, password} = req.body;

        const ong = await connection('ongs')
            .where('id',id)
            .select('password','name')
            .first();

        if(!ong){
            return res.status(400).json({error:"No ONG found with this ID"})
        }

        bcrypt.compare(password,ong.password,(err, result)=>{
            if(err){
                return res.status(400).send();
            }

            if(result){
                return res.json(ong); 
            }

            return res.status(401).send("Falha na Autenticação")
             
        })


                
       
    }
}