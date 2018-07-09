const express = require('express');
const app = express();

app.use(express.json());


const employees = [
    { id: 1, name: 'amit' },
    { id: 2, name: 'kamal' },
    { id: 3, name: 'vishal' },
    { id: 4, name: 'raj' },
    { id: 5, name: 'scott' },
]
app.get('/get/emp', (req, res) => {
    console.log(employees);
    res.send(employees)
})

app.post('/post', (req, res) => {
    const employee = {
        id: employees.length + 1,
        name: req.body.name,
        name: req.body.name,
        
    };
    employees.push(employee)
    console.log(employee)
    res.send(employee);
});

app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(a => {
        a.id == id
    }
    );
    if (!employees) res.status(404).send('COURSE NOT FOUND')

    const index = employees.indexOf(employee);
    employees.splice(index, 1)

    res.send(employee)
    console.log(employee)

})


app.put('/put/:id', (req, res) => {
    // search course which you want toupdate 
    const employee = employees.find(a => a.id == (req.params.id));
    if (!employee) return res.status(404).send('COURSE NOT FOUND')
    console.log(employee);

    res.send(employee)
    console.log(employee);
})

const port = 2000;
app.listen(port, () => {
    console.log('server started with part no:- ' + port)
})