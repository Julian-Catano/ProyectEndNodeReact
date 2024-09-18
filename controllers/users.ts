import {Request, Response} from 'express'
import User from '../models/user';
import bcrypt from 'bcryptjs'

export const consultUsers = async(req:Request, res:Response)=>{
    const users = await User.findAll()
    res.status(200).json({
        users
    })
}

export const consultUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error al consultar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

export const createUsers = async(req:Request, res:Response)=>{
    let {document, names, lastname, email, celphone, password} = req.body;

    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)
    //si el email ya existe en la base de datos, retornar un error
    const colsuUser = await User.findOne({ where: { email } });
    if(colsuUser){
        res.status(401).json({
            msg: 'el email ya se encuentra registrado'
        })
    }else{
        const user = await User.create({document, names, lastname, email, celphone, password, state:1})
        res.status(200).json({
            msg: 'usuario creado correctamente'
        });
    }
    

}

export const updateUser = async(req:Request, res:Response)=>{
    let {id, document, names, lastname, email, celphone} = req.body;
    await User.update({document, names, lastname, email, celphone},{
        where:{
            id
        }
    });
    res.status(200).json({
        msg: `el usuario con el id ${id} ah sido actualizado`
    })
}


export const deleteUserDestroy = async(req:Request, res:Response)=>{
    const { id } = req.params;

    await User.destroy({
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el usuario con el id ${id} ha sido eliminado`
    })
}

export const deleteUserState = async(req:Request, res:Response)=>{
    const { id } = req.params;
    await User.update({state:1},{
        where:{
            id
        }
    })
    res.status(200).json({
        msg: `el usuario con el id ${id} ah sido desactivado`
    })
}





