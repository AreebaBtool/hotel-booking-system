const nodemailer=require("nodemailer");


let transporter=nodemailer.createTransport(
    {
        host:'smtp.gmail.com',
        port:465,
        secure:'false',

        auth:{
            user:'areebabatool75@gmail.com',
            pass:'pqptbmnecwzktaoe',
        }
    }
)
module.exports={transporter,nodemailer};