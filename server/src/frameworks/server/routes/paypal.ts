import express from "express";
import { Response, Request } from "express";
import * as paypal from "../../../application/services/paypalAPI";

const paypalRouter = () => {
  const router = express.Router();

  router.post(
    "/create-paypal-order",
    async (req: Request, res: Response) => {
      try {
        const order = await paypal.createOrder(req.body);
        res.json(order);
      } catch (err:any) {
        res.status(500).send(err.message);
      }
    }
  );

  router.post(
    "/capture-paypal-order",
    async (req: Request, res: Response) => {
      const { orderID } = req.body;
      try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
      } catch (err:any) {
        res.status(500).send(err.message);
      }
    }
  );

  return router
};


export default paypalRouter