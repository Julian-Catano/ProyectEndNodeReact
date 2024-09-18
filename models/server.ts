import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken';
import db from '../db/connection'
import userRoutes from '../routes/users'
import authUser from '../routes/auth'
import recetRoutes from '../routes/receta'
// import { verifyToken } from '../middlewares/verifyToken';


dotenv.config();

class Server {
        private app: Application;
        private port: string | undefined;
        private apiPaths = {
            users: '/api/users',
            auth: '/api/auth',
            recetas: '/api/recetas'

        }
    constructor(){
        this.app = express();
        this.port = process.env.PORT;   
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    
    async dbConnection(){
        try{
            await db.authenticate;
            console.log('Base de datos conectada');
        }catch(err){
            console.error('Error al conectar a la base de datos', err);
        }
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/uploads', express.static('uploads'))

    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.auth, authUser);
        this.app.use(this.apiPaths.recetas, recetRoutes);
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en el puerto: ${this.port}`);
        })
    }
}

export default Server;

