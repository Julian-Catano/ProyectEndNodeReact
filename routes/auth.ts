import { Router } from "express";
import { login, logout, validateToken} from "../controllers/auth";
import validateJWT from "../helpers/validate-jwt";
const router = Router();

router.post('/auth-user', login);
router.post('/logout', validateJWT, logout);
router.post('/validate-user', validateJWT, validateToken)

router.get('*', (req, res)=>{
    res.status(404).json({error: 'Page not found'})
})

export default router;
