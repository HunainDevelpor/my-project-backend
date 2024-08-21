const express = require('express');
const cors = require('cors');
const ConnectMongoDB = require('./Utils/DbConnect');
const { userModel } = require('./Model/user_model');
const dotenv = require('dotenv').config();
const app=express()
const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');
const port=process.env.PORT || 5000
app.use(cors())
app.use(express.json())
ConnectMongoDB()

let transporter = nodemailer.createTransport({
        service:"gmail",
    auth: {
         user: 'abbas.techcreator@gmail.com',
        pass: 'gwla chog kcfw llsy'
    },
});









app.post('/user/create',async function (req,res){
    try {
        let{email,firstname,lastname,policyno,mobileno,identino}=req.body
        console.log(email,firstname,lastname,policyno,mobileno,identino);
       let Existeduser=await userModel.findOne({$or:[{ email }, { mobileNumber: mobileno }]})
        if (Existeduser) {
            res.status(403).json({msg:"Email or Mobile number already registered"})
        }
        const user =await userModel.create({
                firstname,lastname,
                mobileNumber:mobileno,
                email,
                IdentificationNumber:identino,
                PolicyNumber:policyno

        })
        if (user) {
            console.log("User Created successfully");
            res.status(200).json({msg:"User Created"})
        }
         // Send welcome email
         let mailOptions = {
            from:'abbas.techcreator@gmail.com',
            to: email,
            subject:'Welcome to Total Care!',
            text: `Dear ${firstname},\n
We are delighted to welcome you to Total Care! Thank you for taking the time to complete our registration form.\n

Your commitment to joining our community means a great deal to us, and we are here to support you every step of the way.\n At Total Care, we strive to provide the highest level of service and care to all our members, ensuring that your needs are met with the utmost professionalism.

If you have any questions or require assistance,\n please do not hesitate to reach out to our support team at [support email/phone number]. We are always here to help.

Once again, welcome to Total Care. We are thrilled to have you with us.

Warm regards,
Abas Teach Creator
Total Care Team `
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });

    } catch (error) {
        console.log("error occur",error);
        res.status(401).json({err:"Error occurs"})
        
    }
})
app.listen(port,()=>{console.log(`Server is running on ${port} Port`);
})

