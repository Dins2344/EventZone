import AdminInterface from "../../../types/adminInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { AdminDbInterface } from "../../repositories/adminDBRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

const adminLogin = async(
    email : string,
    password : string,
    adminRepository: ReturnType<AdminDbInterface>,
    authService : ReturnType<AuthServiceInterface>
) =>{
    const admin = await adminRepository.getAdminByEmail(email)
    if(!admin){
        throw new AppError('invalid credentials',HttpStatus.UNAUTHORIZED)
    }

    const isPasswordCorrect = await authService.comparePassword(password,admin.password)
    if(!isPasswordCorrect){
        throw new AppError('invalid password',HttpStatus.UNAUTHORIZED)
    }
    const token = authService.generateToken({Id:admin._id,email:admin.email})
    return token
}

export default adminLogin