import { Router } from "express";
import { createReceta, consultReceta, consultRecetaById, updateReceta, deleteReceta, consultRecetaByIdUser} from "../controllers/receta";
import upload from '../helpers/multer'
const router = Router();


router.post('/create-receta', upload.single('file'), createReceta);
router.get('/consult-receta', consultReceta);
router.get('/consult-receta-id/:id', consultRecetaById);
router.put('/update-receta', updateReceta);
router.delete('/delete-receta/:id', deleteReceta);
router.get('/consult-my-receta/:userId', consultRecetaByIdUser)
router.get('*', (req, res)=>{
    res.status(404).json({error: 'Page not found'})
})

export default router;