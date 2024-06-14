const express = require('express');
const router = express.Router();
const multer = require('multer');

const { 
    loginUser, 
    signupUser, 
    userForgetPassword,
    editUsername,
    uploadProfilePic,
    ubahPassword
} = require('./handler');

const upload = multer({ 
    storage: multer.memoryStorage() 
});

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.post('/email/login', async (req, res)=>{
    let { email, password } = req.body;
    try{
        const data = await loginUser(email, password);
        res.status(201);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
    } catch (error){
        console.error(error);
        res.send({
          'status': 'fail',
          'message': 'Harap maklum'
        }).status(500);
    }
})

router.post('/email/signup', async (req, res)=>{
    let { email, password, username } = req.body;
    try{
        const data = await signupUser(email, password, username);
        res.status(201);

        if(data.status === 'fail'){
            res.status(400);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'Harap maklum'
        }).status(500);
    }
})

router.post('/email/forpas', async (req, res) => {
    let { email } = req.body;
    try {
        const data = await userForgetPassword(email);
        res.send(200);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'harap maklum'
        }).status(500);
    }
})

router.put('/user/username', async (req, res) => {
    let user_id = req.body.uid;
    let username = req.body.username;
    try {
        const data = await editUsername(user_id, username);
        res.status(200);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'harap maklum'
        }).status(500);
    }
})

router.post('/user/profile', upload.none(), async (req, res) => {
    let user_id = req.body.uid;
    let file = req.body.image;
    try {
        const data = await uploadProfilePic(user_id, file);
        res.status(201);

        if(data.status === 'fail'){
            res.status(400);
        }
        
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'Terjadi Kesalahan Pada Server'
        }).status(500);
    }
})

router.put('/user/pass', async (req, res) => {
    let email = req.body.email;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    try {
        const data = await ubahPassword(email, oldPassword, newPassword);
        res.status(200);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'harap maklum'
        }).status(500);
    }
})

module.exports = router;
