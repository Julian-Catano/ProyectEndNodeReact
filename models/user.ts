import { DataType, DataTypes } from "sequelize";
import db from '../db/connection'

const User = db.define('User', {
    document: {
        type: DataTypes.STRING
    },
    names:{
        type: DataTypes.STRING
    },
    lastname:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING,
    },
    celphone:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    state:{
        type: DataTypes.STRING
    }


})

export default User;