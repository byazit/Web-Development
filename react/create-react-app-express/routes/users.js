var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/list', {
                    title: 'User List', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                /* res.render('Everything', {
                    title: 'User List', 
                    data: rows
                }) */
                //console.log(rows);
                res.send({ express: rows });
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/add', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/add', {
        title: 'Add New User',
        name: '',
        age: '',
        email: ''        
    })
})
 
// ADD NEW USER POST ACTION
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
app.post('/add', [
    // username must be an email
    check('name').notEmpty().trim().escape(),
    // password must be at least 5 chars long
    check('age').isLength({ min: 2 }).notEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail().notEmpty().trim().escape()

  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }    
    req.getConnection(function(error, conn) {
        conn.query('INSERT INTO users SET ?', user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                
                // render to views/user/add.ejs
                res.render('user/add', {
                    title: 'Add New User',
                    name: user.name,
                    age: user.age,
                    email: user.email                    
                })
            } else {                
                req.flash('success', 'Data added successfully!')
                
                // render to views/user/add.ejs
                res.render('user/add', {
                    title: 'Add New User',
                    name: '',
                    age: '',
                    email: ''                    
                })
            }
        })
    })
  });

// app.post('/add', function(req, res, next){    
//     check('name').notEmpty()           //Validate name
//     check('age').notEmpty()             //Validate age
//     //check('email', 'A valid email is required').isEmail()  //Validate email
//     check('email').isEmail()
 
//     var errors = validationResult(req)
    
//     if( !errors ) {   //No errors were found.  Passed Validation!
//         /********************************************
//          * Express-validator module
         
//         req.body.comment = 'a <span>comment</span>';
//         req.body.username = '   a user    ';
 
//         req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
//         req.sanitize('username').trim(); // returns 'a user'
//         ********************************************/
//         var user = {
//             name: req.sanitize('name').escape().trim(),
//             age: req.sanitize('age').escape().trim(),
//             email: req.sanitize('email').escape().trim()
//         }
        
//         req.getConnection(function(error, conn) {
//             conn.query('INSERT INTO users SET ?', user, function(err, result) {
//                 //if(err) throw err
//                 if (err) {
//                     req.flash('error', err)
                    
//                     // render to views/user/add.ejs
//                     res.render('user/add', {
//                         title: 'Add New User',
//                         name: user.name,
//                         age: user.age,
//                         email: user.email                    
//                     })
//                 } else {                
//                     req.flash('success', 'Data added successfully!')
                    
//                     // render to views/user/add.ejs
//                     res.render('user/add', {
//                         title: 'Add New User',
//                         name: '',
//                         age: '',
//                         email: ''                    
//                     })
//                 }
//             })
//         })
//     }
//     else {   //Display errors to user
//           console.log("sdsdsd");              
//         //req.flash('error', errors.array())        
        
//         /**
//          * Using req.body.name 
//          * because req.param('name') is deprecated
//         */  
//         res.render('user/add', { 
//             title: 'Add New User',
//             name: req.body.name,
//             age: req.body.age,
//             email: req.body.email
//         })
//     }
// })
 
// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with id = ' + req.params.id)
                res.redirect('/users')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/edit', {
                    title: 'Edit User', 
                    //data: rows[0],
                    id: rows[0].id,
                    name: rows[0].name,
                    age: rows[0].age,
                    email: rows[0].email                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/edit/(:id)',
    [
        check('name', 'Name is required').notEmpty().trim().escape(),           //Validate name
        check('age', 'Age is required').notEmpty().trim().escape(),             //Validate age
        check('email', 'A valid email is required').isEmail().trim().escape()  //Validate email
    ], 
    (req, res, next) => {         
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }    
        var user = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                }
            })
        })
    }
)
 
// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
    
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/users')
            } else {
                req.flash('success', 'User deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/users')
            }
        })
    })
})
 
module.exports = app
