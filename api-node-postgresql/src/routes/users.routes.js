import { Router } from 'express'
import { getAllUsers, getUserById, addUser, editUser, deleteUser } from '../controller/users.controller.js'

const router = Router()

router.get('/users', getAllUsers)

router.get('/users/:id', getUserById)

router.post('/users', addUser)

router.put('/users/:id', editUser)

router.delete('/users/:id', deleteUser)

export default router
