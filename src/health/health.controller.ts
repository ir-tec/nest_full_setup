import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
@Controller({ path: "health", version: "1" })
export class HealthCheckController {
    constructor(private readonly health: HealthCheckService) { }


    @Get()
    @HealthCheck()
    check() {
        return this.health.check([])
    }




}