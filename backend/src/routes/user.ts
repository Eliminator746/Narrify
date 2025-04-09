import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.get('/signup', (c) =>{

}) 
userRouter.get('/signin', (c) => {
  
})


export {userRouter}