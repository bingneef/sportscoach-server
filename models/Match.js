import last from 'lodash.last';

import mongoose from '../services/database/mongodb'
import { Event } from './Event';
import { calcTennisScore, addTennisPoint } from '../services/stats/tennis';

const Schema = mongoose.Schema

const homeAwayDoc = {
  home: {
    type: Number,
    required: true,
  },
  away: {
    type: Number,
    required: true,
  },
};

export const MatchSchema = new Schema({
  status: {
    type: String,
    enum: ['PLANNED', 'IN_PROGRESS', 'FINISHED'],
    required: true,
    default : 'PLANNED',
  },
  winnerTeamId: {
    type: String,
    index: true,
  },
  homeTeamId: {
    type: String,
    index: true,
    required: true,
  },
  awayTeamId: {
    type: String,
    index: true,
    required: true,
  },
  score: {
    setScores: [homeAwayDoc],
    setScore: homeAwayDoc,
    lastGameScore: homeAwayDoc,
  },
})

class MatchClass {
  async calculateScore () {
    try {
      const pointEvents = await Event.find({matchId: this.id, kind: 'POINT'});
      const { sets, games, points } = calcTennisScore({match: this, pointEvents});
      const setScores = games.map(last);
      const setScore = last(sets);
      const lastGameScore = last(last(last(points)));

      this.set({score: { setScores, setScore, lastGameScore }})

      await this.save()
    } catch (e) { console.log(e) }
  }

  async addPoint(pointEvent) {
    try {
      console.log(JSON.stringify(this.score));
      const score = addTennisPoint({...this.score, match: this, pointEvent});
      console.log(score);
      this.set({score})
      const resp = await this.save()
      console.log(JSON.stringify(resp));
    } catch (e) { console.log(e) }
  }
}

MatchSchema.loadClass(MatchClass)

export const Match = mongoose.model('Match', MatchSchema)
