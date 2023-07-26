import { UserDBInterface } from "../../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { AuthServiceInterface } from "../../../application/services/authServiceInterface";
import { AuthService } from "../../../frameworks/service/authService";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  CustomRequest,
  ticketBookingCreationInterface,
} from "../../../types/userInterface";
import {
  addAddress,
  addProfileContactInfo,
  cancelBooking,
  createBooking,
  getAddressInfo,
  getAllOrganizers,
  getApprovedEvents,
  getBookings,
  getCompleteEventDetails,
  getOneBookingDetails,
  getUserById,
  updateEmail,
  verifyPassword,
} from "../../../application/usecases/user/userAuth";

const userController = (
  userDbRepository: UserDBInterface, 
  userDbRepositoryImpl: UserRepositoryMongoDB,
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const verifyPasswordController = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.Id
    const password = req.body.password
    console.log(userId,password)
    if(userId){
      const response = await verifyPassword(userId,password,dbRepositoryUser,authService)
      if(response){
        res.json({message:'password verified',ok:true})
      }else{
        res.json({error:'password does not matched',ok:false})
      }
    }

  })

  const getUserByEmail = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const email = req.user?.email;
      if (email) {
        const data = await dbRepositoryUser.getUserByEmail(email);
        if (data) {
          res.json({ data });
        } else {
          res.json({ error: "user data fetching failed" });
        }
      } else {
        res.json({ error: "fetching id from api bearer failed" });
      }
    }
  );
  const getUserByIdController = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.Id
    if(userId){
        const data = await getUserById(userId,dbRepositoryUser)
        if(data){
            res.json({message:'fetching user data done',data,ok:true})
        }else{
            res.json({error:'fetching user data failed'})
        }
    }
  })

  const getApprovedEventsController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await getApprovedEvents(dbRepositoryUser);
      if (data) {
        res.json({ message: "approved events fetched", data });
      } else {
        res.json({ error: "approved events fetching failed" });
      }
    }
  );

  const getCompleteEventDetailsController = asyncHandler(
    async (req: Request, res: Response) => {
      const id: string = req.params.id;
      const data = await getCompleteEventDetails(id, dbRepositoryUser);
      if (data) {
        res.json({ message: "event details fetch done", data });
      } else {
        res.json({ error: "event fetching failed" });
      }
    }
  );

  const createBookingController = asyncHandler(
    async (req: Request, res: Response) => {
      const data: ticketBookingCreationInterface = req.body;
      const response = await createBooking(data, dbRepositoryUser);
      if (response) {
        res.json({ message: "booking confirmed", response });
      } else {
        res.json({ error: "booking failed" });
      }
    }
  );

  const getBookingsController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.user?.Id;
      if (userId) {
        const data = await getBookings(userId, dbRepositoryUser);
        if (data) {
          res.json({ message: "fetching booking details done", data });
        } else {
          res.json({ error: "fetching booking details failed" });
        }
      }
    }
  );

  const getOneBookingDetailsController = asyncHandler(
    async (req: Request, res: Response) => {
      const bookingId: string = req.params.bookingId;
      const data = await getOneBookingDetails(bookingId, dbRepositoryUser);
      if (data) {
        res.json({ message: "fetching booking details done", data });
      } else {
        res.json({ error: "fetching details failed" });
      }
    }
  );

  const cancelBookingController = asyncHandler(
    async (req: Request, res: Response) => {
      const bookingId: string = req.params.id;
      console.log(bookingId);
      const response = await cancelBooking(bookingId, dbRepositoryUser);
      if (response) {
        res.json({ message: "canceling order done", response });
      } else {
        res.json({ error: "canceling order failed" });
      }
    }
  );

  const getAllOrganizersController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await getAllOrganizers(dbRepositoryUser);
      if (data) {
        res.json({ message: "getting all organizers details done", data });
      } else {
        res.json({ error: "getting organizers details failed" });
      }
    }
  );

  const addProfileContactInfoController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const data = req.body;
      const profileImage = req.files as Express.Multer.File[];
      const userId = req.user?.Id;
      if (userId) {
        if(profileImage.length){
            data.imageURL = profileImage[0].path
        }
        const response = await addProfileContactInfo(
          data,
          userId,
          dbRepositoryUser
        );
        if (response) {
          res.json({ok:true, message: "data added to user db", response });
        } else {
          res.json({ error: "data adding failed" });
        }
      }
    }
  );

  const addAddressController = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.Id
    const data = req.body
    if(userId){
        const response = await addAddress(data,userId,dbRepositoryUser)
        if(response){
            res.json({message:'adding address done',ok:true,response})
        }else{
            res.json({error:'adding address failed'})
        }
    }
  })
  
  const updateEmailController = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.Id
    const {email} = req.body
    if(userId){
      const response = await updateEmail(email,userId,dbRepositoryUser)
      if(response){
        res.json({message:'email updated',ok:true,response})
      }else{
        res.json({error:'update email failed',ok:false})
      }
    }
  })

  const getAddressInfoController = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.Id
    if(userId){
      const data = await getAddressInfo(userId,dbRepositoryUser)
      if(data){
        res.json({message:'fetching address data done',ok:true,data})
      }else{
        res.json({error:'fetching address details failed'})
      }
    }
  })

  const searchEventsController = asyncHandler(async(req:Request,res:Response)=>{
    const query = req.query
    console.log(query)
  })
  return {
    getUserByEmail,
    verifyPasswordController,
    getUserByIdController,
    getApprovedEventsController,
    getCompleteEventDetailsController,
    createBookingController,
    getBookingsController,
    getOneBookingDetailsController,
    cancelBookingController,
    getAllOrganizersController,
    addProfileContactInfoController,
    addAddressController,
    updateEmailController,
    getAddressInfoController,
    searchEventsController
  };
};

export default userController;
