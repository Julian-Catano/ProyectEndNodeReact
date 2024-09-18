// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface JwtPayload {
//   id: number;
// }

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('x-token');  // El token lo esperamos en el encabezado 'x-token'

//   if (!token) {
//     return res.status(401).json({ msg: 'No hay token en la petición' });
//   }

//   try {
//     const { id } = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto') as JwtPayload;

//     // Guardar el id del usuario en la request para usarlo en las rutas protegidas
//     req.userId = id;

//     next();
//   } catch (error) {
//     return res.status(401).json({ msg: 'Token no válido' });
//   }
// };