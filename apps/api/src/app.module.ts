import { Module } from "@nestjs/common";
import { AiModule } from "./modules/ai/ai.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { FirebaseModule } from "./modules/firebase/firebase.module";
import { CareerModule } from "./modules/career/career.module";
import { ExamsModule } from "./modules/exams/exams.module";
import { AdminModule } from "./modules/admin/admin.module";

import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
    AiModule,
    PaymentsModule,
    CareerModule,
    ExamsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
