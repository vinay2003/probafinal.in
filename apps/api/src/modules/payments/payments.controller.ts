import { Controller, Post, Body } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("order")
  async createOrder(@Body() body: { amount: number }) {
    return this.paymentsService.createOrder(body.amount);
  }

  @Post("verify")
  async verifyPayment(
    @Body()
    body: {
      paymentId: string;
      orderId: string;
      signature: string;
      userId: string;
    },
  ) {
    return this.paymentsService.verifyPayment(
      body.paymentId,
      body.orderId,
      body.signature,
      body.userId,
    );
  }
}
