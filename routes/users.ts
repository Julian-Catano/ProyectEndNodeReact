import { Router } from "express";
import {createUsers, consultUsers, updateUser, consultUserById, deleteUserDestroy, deleteUserState} from '../controllers/users'
const router = Router();

router.post('/create-users', createUsers);
router.get('/consult-user-Id/:id', consultUserById);
router.get('/consult-users', consultUsers);
router.put('/update-users', updateUser);
router.delete('/delete-destroy/:id', deleteUserDestroy);
router.put('/delete-update-state/:id', deleteUserState)
router.get('*', (req, res)=>{
    res.status(404).json({error: 'Page not found'})
})

export default router;
