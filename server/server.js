import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv'
import router from './router/route.js';
import EmployeeModel from "./models/Employee.js";


/** import connection file */
import connect from './database/conn.js';

const app = express()

/** app middleware */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();


/** application port */
// use server as PORT variable, else default as 8080
const port = process.env.PORT || 8080;


/** routes  */

app.use('/api', router) /** apis */


/** get request to app */
app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})


/** start server only when we have valid connection ( Database Connection comes first)*/
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Cannot connect to ther server");
    }
}).catch(error => {
    console.log(error);
})


/** login code */
app.post("/login", (req, res) => {
    const {name, password} = req.body;
    EmployeeModel.findOne({name : name})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json({
                    status: "Success",
                    name: user.name,
                    email: user.email 
                });
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

/** get user info code */
app.post("/info", (req, res) => {
    const {name} = req.body;
    EmployeeModel.findOne({name : name})
    .then(user => {
        if(user) {
            res.json({
                status: "Success",
                name: user.name,
                email: user.email 
            });
        }else{
            res.json("No record existed")
        }
    })
})
