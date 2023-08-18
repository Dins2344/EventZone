import { userRepositoryMongoDB } from "./../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { userDbRepository } from "./../../repositories/userDBRepository";
import { HttpStatus } from "../../../types/httpStatus";
import {
  AddressFormDataCreateInterface,
  CreateChatInterface,
  GoogleUserCreateInterface,
  NewMessageInterface,
  ProfileContactInfo,
  RegisteredBookingCreationInterface,
  RegisteredEventInterface,
  RegisteredUserInterface,
  ReviewData,
  SearchQueryInterface,
  UserInterface,
  searchDataInterface,
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
    return isPasswordMatch;
  }
};

export const changePassword = async (
  newPassword: string,
  userId: string,
  userRepository: ReturnType<UserDBInterface>,
  authServices: ReturnType<AuthServiceInterface>
) => {
  newPassword = await authServices.hashPassword(newPassword);
  const res = await userRepository.changePassword(newPassword, userId);
  if (res) {
    return res;
  } else {
    throw new AppError("updating password failed", HttpStatus.BAD_REQUEST);
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

export const googleLogin = async (
  user: RegisteredUserInterface,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const token = authService.generateToken({
    Id: user._id,
    email: user.email,
    role: "user",
  });
  return token;
};

export const googleSignup = async (
  user: GoogleUserCreateInterface,
  userRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const registeredUser = await userRepository.addUser(user)
  const token = authService.generateToken({ Id: registeredUser._id.toString(), email: registeredUser.email, role: 'user' })
  return { registeredUser, token }
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
export const getUserByEmail = async (email: string,userRepository:ReturnType<UserDBInterface>) => {
  const data = await userRepository.getUserByEmail(email)
  if (!data) {
    throw new AppError('user not found',HttpStatus.BAD_REQUEST)
  }
  return data
}

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

export const updateEmail = async (
  email: string,
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.updateEmail(email, userId);
  if (!res) {
    throw new AppError("updating email failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

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

export const searchAnything = async (
  searchQuery: searchDataInterface,
  userRepository: ReturnType<UserDBInterface>
) => {
  if (searchQuery.searchFor === "event") {
    const data = await userRepository.searchEvents(searchQuery);
    if (!data) {
      throw new AppError(
        "fetching event search data failed",
        HttpStatus.BAD_REQUEST
      );
    }
    return data;
  }
  if (searchQuery.searchFor === "organizer") {
    const data = await userRepository.searchOrganizer(searchQuery.searchText);
    return data;
  }
};

export const getChat = async (
  userId: string,
  secondUser: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getChat(userId, secondUser);
  if (!data) {
    throw new AppError("finding chat exist failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const createChat = async (
  chatData: CreateChatInterface,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.createChat(chatData);
  if (!data) {
    throw new AppError("creating chat failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const getUsersChat = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getUsersChat(userId);
  if (!data) {
    throw new AppError("fetching users chats failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const sendMessage = async (
  newMessage: NewMessageInterface,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.sendMessage(newMessage);
  if (!res) {
    throw new AppError("sending new message failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const getAllMessage = async (
  chatId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getAllMessage(chatId);
  if (!data) {
    throw new AppError("all message fetching failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const addFollow = async (
  userId: string,
  orgId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.addFollow(userId, orgId);
  if (!res) {
    throw new AppError("adding following failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const unFollow = async (
  userId: string,
  orgId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.unFollow(userId, orgId);
  if (!res) {
    throw new AppError("removing from following filed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const likeEvent = async (
  userId: string,
  eventId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.likeEvent(userId, eventId);
  if (res.ok) {
    return res;
  } else {
    throw new AppError(
      "adding event to liked list failed",
      HttpStatus.BAD_REQUEST
    );
  }
};

export const unLikeEvent = async (
  userId: string,
  eventId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.unLikeEvent(userId, eventId);
  if (res.ok) {
    return res;
  } else {
    throw new AppError(
      "removing event from liked list failed",
      HttpStatus.BAD_REQUEST
    );
  }
};

export const getLikedEvents = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getLikedEvents(userId);
  if (!data) {
    throw new AppError("getting liked events failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const getFollowing = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getFollowing(userId);
  if (!data) {
    throw new AppError(
      "getting following organizers failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const updateBookings = async (
  bookingId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const res = await userRepository.updateBookings(bookingId);
  if (!res) {
    throw new AppError(
      "updating attended events failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return res;
};

export const addReview = async (
  review: ReviewData,
  eventId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.addReview(review, eventId);
  if (!data.ok) {
    throw new AppError("updating review has failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const getReviews = async (
  eventId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getReviews(eventId);
  if (!data) {
    throw new AppError(
      "getting reviews of one event is failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const getEventsFromFollowingOrganizers = async (
  userId: string,
  userRepository: ReturnType<UserDBInterface>
) => {
  const data = await userRepository.getEventsFromFollowingOrganizers(userId);
  if (!data) {
    throw new AppError(
      "getting events from user following organizations has failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};
