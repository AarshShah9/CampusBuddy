import Express from 'express';

const router = Express.Router();

// test User
router.get('/userTest', (req, res) => {
    res.send("User -> Valid");
})

// create new User
router.post('/newUser', (req, res) => {
    
});

module.exports = router;