import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv'
import router from './router/route.js';



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
