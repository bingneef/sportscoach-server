import uniq from 'lodash/uniq'
import { CompetitionTeam, Team, Match } from '.'
export default class CompetitionClass {
  async teams () {
    const competitionTeams = await CompetitionTeam.find({competitionId: this.id})
    const teamIds = uniq(competitionTeams.map(item => item.teamId));
    return Team.find({_id: teamIds});
  }

  async matches () {
    return Match.find({competitionId: this.id})
  }
}
