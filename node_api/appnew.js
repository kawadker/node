const exp = require('express');
const bp = require('body-parser');
const app = exp();
const mongoose = require('mongoose');

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
        type: String
    },
    mono: {
        type: Number,
        required: true
    },
    // date: {
    //     type: String,
    //     required: true
    // },
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
        console.log(JSON.stringify(data, undefined, 3));
        res.send(data);
    });
});




//<-----**SEND DATA AND SAVE IN MONGODB SERVER**---->\\
app.post('/post', (req, res) => {
    const Emp = new Emps({
        _id: req.body.id,
        name: req.body.name,
        city: req.body.city,
        mono: req.body.mono,
    });
    Emps.findById(Emp._id).then((emp) => {
        // Emps.count().then((emp1) => {
            // console.log(emp1);
            if (emp) {
                console.log('Id has already exist use another id..');
                res.send('Id has already exist use another id..' );
                // } else if (!emp && Emp._id != y) {
                //     console.log('you used wronge id please use ' + y);
                //     res.send('you used wronge id please use ' + y);
            } else {
                Emp.save({}).then((data) => {
                    console.log('data has saved');
                    console.log(data);
                }, (err) => {
                    console.log('data has not saved in ' + err);
                });
                console.log(JSON.stringify(Emp, undefined, 2));
                res.send(Emp);
            }
        // });
    });
});

//<-----**UPDATE DATA AND SAVE IN MONGODB SERVER**---->\\

app.post('/update/:id', (req, res) => {
    const _id = req.params.id;
    Emps.findById(_id, (err, emp) => {
        // Emps.count().then((count) => {
        if (!emp) {
            Emps.find().then((emp2) => {
                console.log("no data is available for this id");
                res.send('no data is available for this id please use 1 to ' + count);
                console.log('please use 1 to ' + count);
                var x = parseInt(count);
                for (var i = 1; i < x; i++) {
                    console.log(JSON.stringify(emp2[i].name));
                }
            });
        } else {
            console.log('old data ');
            console.log(JSON.stringify(emp));
            if (err) {
                console.log('error, no entry found');
            }
            emp.name = req.body.name;
            emp.city = req.body.city;
            emp.mono = req.body.mono;
            emp.save();
            res.send('data has updated ' + emp);
            console.log('New data ');
            console.log(JSON.stringify(emp));
        }
    })
    // });
});



//<----**UPADATE DATA**---->\\
app.patch('/update/data', (req, res) => {
    const _id = req.body.id;
    Emps.update({ _id }, {
        name: req.body.name,
        city: req.body.city,
        mono: req.body.mono,
    }).then((status, data) => {
        // console.log(status.n);
        if (status.n === 0) {
            console.log("id you provided is not exist in database ");
            res.send("id you provided is not exist in database ");
        } else if (status.nModified === 1) {
            Emps.findById(_id).then((data) => {
                console.log(data)
                console.log("data is updated");
                res.send("data is updated");
            })
        } else if (status.nModified === 0) {
            console.log("old data and new data are same ");
            res.send("old data and new data are same ");
        }
    })

});



//<-----**DELETE DATA OF MONGODB SERVER**---->\\

app.delete('/delete/:id', (req, res) => {
    const _id = req.params.id;
    Emps.findById(_id).then((emp) => {
        if (!emp) {
            Emps.count().then((count) => {
                Emps.find().then((emp2) => {
                    var x = parseInt(count);
                    for (var i = 0; i < x; i++) {
                        console.log(JSON.stringify(emp2[i].name));
                    }
                    res.send("No such id is found use another one from 1 to " + count);
                    console.log("No such id is found use another one from 1 to " + count);
                });
            });
        } else if (emp) {
            Emps.findByIdAndDelete(_id).then((emp) => {
                console.log("Deleted data:- ")
                console.log(emp);
                res.send("Deleted data:- " + emp);
            })
        }
    })
})

//<-----**FOR  PORT **---->\\
const port = 2365;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server started with:-  ${port}`)
});





















