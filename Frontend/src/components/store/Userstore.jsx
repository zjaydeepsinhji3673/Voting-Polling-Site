import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../reducers/UserSlice'
export default configureStore ({
    reducer:{
        user: UserSlice
    }
})