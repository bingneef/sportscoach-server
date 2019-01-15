import { Match, Player, Team } from '.'

export default class EventClass {
  async match() {
    return Match.findOne({_id: this.matchId})
  }

  async player() {
    return Player.findOne({_id: this.playerId})
  }

  async team() {
    return Team.findOne({_id: this.teamId})
  }
}