const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


var User = require('../models/users')


router.post('/signup',[
	check('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  check('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  // username must be an email
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),

  sanitizeBody('first_name').escape(),
  sanitizeBody('family_name').escape(),
  sanitizeBody('email').normalizeEmail(), 
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)
    console.log(req)
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      return res.status(422).json({ errors: errors.array() });
    } else {
      // Data from form is valid.
      User.find({email:req.body.email})
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
				message: "Mail exists"
			})} 
			else {
				createUser(req,res)
				}})
}
}]
)

function createUser(req,res){
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(err){
			return res.status(500).json({
					error: err
			});
		}
		const user= new User({
			_id: new mongoose.Types.ObjectId(),
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			email: req.body.email,
			password: hash
		})
		user.save()
		.then(result=>{
			console.log(result)
			res.status(201).json({
				message:"user created"
			})
		})
	})
}
/*
1. sign-in flow
2. generate jwt token and send
3. create my list table
4. add few movie titles
5. add access to that table
6. profile page
*/
function checkAuth(req,res,next){
	try{
		const token= req.headers.authorization.split(" ")[1]
		const decoded = jwt.verify(token, "movielist");
		req.userData = decoded;
		next()
	}catch(error){
		console.log(error)
		return res.status(401).json({
            message: 'Authen failed'
        });
	}
}
router.post('/login',[
	check('email').isEmail(),
	check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
	sanitizeBody('email').normalizeEmail(),
	(req,res,next)=>{
		const errors = validationResult(req)
		console.log(req)
		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/errors messages.
			return res.status(422).json({ errors: errors.array() });
		}else{
			User.find({email:req.body.email})
				.exec()
				.then(user=>{
					if (user.length<1) {
						return res.status(401).json({
							message:"Authorization failed"
						})
					}
					bcrypt.compare(req.body.password, user[0].password, function(err, result) {
						if(err){
							return res.status(401).json({
								message:"Authorization failed"
							})
						} 
						if(result){
							const token=jwt.sign(
							{
								email: user[0].email,
              					userId: user[0]._id
							},
							"movielist",
            				{
                				expiresIn: "1h"
            				})
            				return res.status(200).json({
            					message: "Auth successful",
            					token: token
          					})
							}
						}
					)
				})
				.catch(err=>{
					res.status(500).json({
						error:err
					})
				})
		}
	}
	])

router.get("/mylist",checkAuth,(req,res,next)=>{
	res.status(200).json({
		message:"my list of movies"
	})
})

module.exports = router;






