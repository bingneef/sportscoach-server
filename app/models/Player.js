import uniq from 'lodash/uniq'

import { Event, Match, Stat } from '.'

export default class Player {
  async stats (args = {}, select = null) {
    let stats = Stat.where({playerId: this.id});
    if (args.kind) { stats = stats.where({kind: args.kind}) }
    if (select) { stats = stats.select(select) }

    return stats
  }

  async matches (args = {}) {
    const events = await this.events({ ...args, kind: 'STARTING_LINEUP'}, 'matchId');
    const matchIds = uniq(events.map(item => item.matchId));
    return Match.find({_id: matchIds});
  }

  async goals (args = {}) {
    return Event.countDocuments({playerId: this.id, kind: 'GOAL'})
  }

  async events (args = {}, select = null) {
    let events = Event.where({playerId: this.id});
    if (args.kind) { events = events.where({kind: args.kind}) }
    if (select) { events = events.select(select) }
    return events
  }
}