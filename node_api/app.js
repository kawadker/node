const exp = require('express');
const bp = require('body-parser');
const app = exp();
const mongoose = require('mongoose');
// app.set('view engine', 'ejs')


app.use(bp.json());

const empschema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
    },
    Mobile: {
        type: Number,
        required: true, 
    },
    // email: {
    //         type: String,
    //         required: true
    //     }
});

const Emps = mongoose.model('emps', empschema);


//<-----**CONNECT TO MONGODB SERVER**---->\\
mongoose.connect('mongodb://localhost:27017/emps')

mongoose.connection.on('connected', () => {
    console.log('mongodb connected with localhost:27017/emps');
});

mongoose.connection.on('error', (error) => {
    console.log('mongodb server is not connected with localhost:27017/emps' + error);
});

//<-----**GET ALL DATA FROM MONGODB SERVER**---->\\
app.get('/get/all', (req, res) => {
    Emps.find({}).then((emp) => {
        console.log(JSON.stringify(emp, undefined, 2));
        res.send(emp);
    })
});

//<-----**GET BY ID DATA FROM MONGODB SERVER**---->\\
app.get('/get/:id', (req, res) => {
    const _id = req.params.id
    Emps.findById({ _id }).then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
        res.send(data);
    });
});




//<-----**SEND DATA AND SAVE IN MONGODB SERVER**---->\\
app.post('/post', (req, res) => {
    const Emp = new Emps({
        _id: req.body.id,
        name: req.body.name,
        city: req.body.city,
        Mobile: req.body.mono
    });

    //<----**FOR CHEACHING DATA ARE EXISTED OR NOT **---->\\
    Emps.findById(Emp._id, (err, emp) => {
        if (err) {
            console.error('error, their is error');
        } else if (emp) {
            //<-----** IF ID IS EXISTED THEN MESSAGE FOR NEW ID **----->\\
            Emps.find().count().then((count) => {
                console.log(count);
                const eid = parseInt(count) + 1;
                console.log(eid);
                res.send("id is exist you cant save data with duplicate id you should use . . " + eid);
            });
        } else {
            //<-----**IF ALL COND. IS SATISFIED THEN SAVE DATA **---->\\
            Emp.save({}).then((data) => {
                console.log('data has saved');
                console.log(data);
            }, (err) => {
                console.log('data has not saved  ' + err.message);
            });
            console.log(JSON.stringify(Emp, undefined, 2));
            res.send(Emp);
        }
    });
});


//<-----**UPDATE DATA AND SAVE IN MONGODB SERVER**---->\\
app.patch('/update/:id', (req, res) => {
    const _id = req.params.id;

    Emps.findById(_id, (err, emp) => {
        if (err) {
            console.log('error, their is error');
        }
        if (emp === null) {
            console.log('Id you provided is not exist');
            res.send('Id you provided is not exist');
            Emps.find({}).then((emp) => {
                console.log(JSON.stringify(emp.id, undefined, 2));
                // res.send(emp);
            });
        } else {
            console.log('old data ');
            console.log(JSON.stringify(emp, undefined, 2));
            emp.name = req.body.name;
            emp.city = req.body.city;
            emp.Mobile = req.body.mono;
            emp.save();
            res.send(emp);
            // res.send("data has updated....")
            console.log('updated data ');
            console.log(JSON.stringify(emp, undefined, 2));
        }
    })
});

//<-----**DELETE DATA AND SAVE IN MONGODB SERVER**---->\\
app.delete('/delete/:id', (req, res) => {
    const _id = req.params.id
    Emps.findOneAndRemove(_id).then((data) => {
        console.log(data);
        res.send(data);
    }, (err) => {
        console.log('data is not deleted...');
    })
});




const port = 2365;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server started with:-  ${port}`)
});
