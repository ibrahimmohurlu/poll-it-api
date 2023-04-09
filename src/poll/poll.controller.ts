import { Controller, Get } from "@nestjs/common";
import { PollService } from "./poll.service";

@Controller("api/polls")
export class PollController {
  constructor(private pollService: PollService) {}

  @Get("/")
  getAllPolls() {
    return this.pollService.getAllPolls();
  }
}
