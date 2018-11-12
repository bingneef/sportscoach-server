import Router from 'koa-router'
import DataLoader from 'dataloader'

import { Player, PlayerTeam, Match, MatchTeam } from '../models';
import { mapValueResponse, mapArrayResponse} from 'map-array-response'

export default async (ctx, next) => {
  ctx.dataLoaders = {
    playerById: valueDataLoader({model: Player, field: '_id'}),
    playerTeamsByTeamId: arrayDataLoader({model: PlayerTeam, field: 'teamId'}),
    matchById: valueDataLoader({model: Match, field: '_id'}),
    matchTeamsByTeamId: arrayDataLoader({model: MatchTeam, field: 'teamId'}),
  }

  await next()
}

const valueDataLoader = ({model, field}) => {
  return new DataLoader(ids => (
    new Promise(async (resolve, reject) => {
      const docs = await model.find({ [field]: ids })
      const strIds = ids.map(id => id.toString());

      const response = mapValueResponse(strIds, field, docs);
      resolve(response)
    })
  ))
}

const arrayDataLoader = ({model, field}) => {
  return new DataLoader(ids => (
    new Promise(async (resolve, reject) => {
      const docs = await model.find({ [field]: ids })
      const strIds = ids.map(id => id.toString());

      const response = mapArrayResponse(strIds, field, docs);
      resolve(response)
    })
  ))
}
