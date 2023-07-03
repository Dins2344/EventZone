import { AuthServiceReturn } from "../../frameworks/service/authService";
import { JwtPayload } from "../../types/common";

export const authServiceInterface = (service: AuthServiceReturn) => {
  const hashPassword = (password: string) => service.hashPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const verifyPassword = (token: string) => service.verifyToken(token);

  const generateToken = (payload: JwtPayload) => service.generateToken(payload);

  return {
    hashPassword,
    comparePassword,
    verifyPassword,
    generateToken,
  };
};

export type AuthServiceInterface = typeof authServiceInterface;