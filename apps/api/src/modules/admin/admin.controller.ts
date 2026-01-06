import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get("users/:id")
  getUser(@Param("id") id: string) {
    return this.adminService.getUser(id);
  }

  @Get("plans")
  getPlans() {
    return this.adminService.getPlans();
  }

  @Post("plans")
  createPlan(@Body() plan: any) {
    return this.adminService.createPlan(plan);
  }

  @Get("stats")
  getStats() {
    return this.adminService.getStats();
  }
}
