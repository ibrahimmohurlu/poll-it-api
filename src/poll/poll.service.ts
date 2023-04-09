import { Injectable } from "@nestjs/common";

@Injectable()
export class PollService {
  getAllPolls() {
    return [{ title: "poll1" }, { title: "poll2" }];
  }
}
