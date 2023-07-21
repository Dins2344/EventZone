import { HttpStatus } from "../../../types/httpStatus";
import {
  AddressFormDataCreateInterface,
  ProfileContactInfo,
  UserInterface,
  ticketBookingCreationInterface,
} from "../../../types/userInterface";
import { UserDBInterface } from "../../repositories/userDBRepository";
import { UserRegisterInterface } from "../../../types/user";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import AppError from "../../../utils/appError";
import QRCode from "qrcode";
import { EventDetailsInterface } from "../../../types/organizerInterface";

export const userRegister = async (
  user: UserRegisterInterface,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isEmailExist = await userRepository.getUserByEmail(user.email);
  if (isEmailExist) {
    throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  }
  user.password = await authService.hashPassword(user.password);
  const { _id: Id, email } = await userRepository.addUser(user);
  const token = authService.generateToken({
    Id: Id.toString(),
    email,
    role: "user",
  });
  return token;
};

export const verifyPassword = async (
  userId: string,
  password: string,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await userRepository.getUserById(userId);
  if (user?.password) {
    const isPasswordMatch = await authService.comparePassword(
      password,
      user?.password
    );
    return isPasswordMatch
  }
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: UserInterface | null = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("this user doesn't exist", HttpStatus.BAD_REQUEST);
  }

  const isPasswordMatch = await authService.comparePassword(
    password,
    user.password
  );
  if (!isPasswordMatch) {
    throw new AppError("password is incorrect", HttpStatus.UNAUTHORIZED);
  }
  const userData = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const token = authService.generateToken({
    Id: user._id.toString(),
    email: user.email,
    role: "user",
  });
  return { token, userData };
};

export const emailVerify = async (
  email: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const user: UserInterface | null = await userRepository.getUserByEmail(email);
  return user;
};

export const tokenGenerator = async (
  email: string,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: UserInterface | null = await userRepository.getUserByEmail(email);
  const token = authService.generateToken({
    Id: user?._id.toString(),
    email: user?.email,
    role: "user",
  });
  return token;
};
export const getUserById = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getUserById(userId);
  if (!data) {
    throw new AppError("user details fetching failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const addOrganization = async (
  orgId: string,
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.addOrganization(orgId, userId);
  if (!res) {
    throw new AppError("organization adding failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const getApprovedEvents = async (
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getApprovedEvents();
  if (!data) {
    throw new AppError(
      "fetching approved events failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const getCompleteEventDetails = async (
  id: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getCompleteEventDetails(id);
  if (!data) {
    throw new AppError(
      "fetching complete event details failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const createBooking = async (
  data: ticketBookingCreationInterface,
  userRepository: ReturnType<UserDBInterface>
) => {
  const event: EventDetailsInterface[] =
    await userRepository.getCompleteEventDetails(data.eventId);
  const QRData = {
    eventName: event[0]?.eventName,
    tickets: data.ticketCount,
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
  };
  const QRDataString = JSON.stringify(QRData);
  const QRCodeLink = await QRCode.toDataURL(QRDataString);
  const dbData = {
    bookingTime: new Date().toDateString(),
    eventId: data.eventId,
    userId: data.userId,
    paymentType: data.paymentType,
    totalAmount: data.totalAmount,
    contactInfo: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
    },
    ticketCount: data.ticketCount,
    status: "confirmed",
    QRCodeLink: QRCodeLink,
    orgOwnerId: data.orgOwnerId,
    organizationId: data.organizationId,
  };
  const res = await userRepository.createBooking(dbData);
  if (!res) {
    throw new AppError("creating order failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const getBookings = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getBookings(userId);
  if (!data) {
    throw new AppError("getting bookings failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const getOneBookingDetails = async (
  bookingId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getOneBookingDetails(bookingId);
  if (!data) {
    throw new AppError(
      "getting booking details failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const cancelBooking = async (
  bookingId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.cancelBooking(bookingId);
  if (!res) {
    throw new AppError("canceling booking failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const getAllOrganizers = async (
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getAllOrganizers();
  if (!data) {
    throw new AppError(
      "getting all organizers details failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const addProfileContactInfo = async (
  data: ProfileContactInfo,
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.addProfileContactInfo(data, userId);
  if (!res) {
    throw new AppError(
      "adding profile contact info failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return res;
};

export const addAddress = async (
  data: AddressFormDataCreateInterface,
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  data.userId = userId;
  const res = userRepository.addAddress(data);
  if (!res) {
    throw new AppError("adding address failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const updateEmail = async(email:string,userId:string,userRepository:ReturnType<UserDBInterface>)=>{
  const res = await userRepository.updateEmail(email,userId)
  if(!res){
    throw new AppError('updating email failed',HttpStatus.BAD_REQUEST)
  }
  return res
}

export const getAddressInfo = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = userRepository.getAddressInfo(userId);
  if (!data) {
    throw new AppError(
      "getting address details failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};
