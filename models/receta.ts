import { DataType, DataTypes } from "sequelize";
import User from "./user";
import db from "../db/connection";

const Receta = db.define(
  "recipes",
  {
    name: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true, // Esto evita que Sequelize pluralice el nombre de la tabla
  }
);

export default Receta;
