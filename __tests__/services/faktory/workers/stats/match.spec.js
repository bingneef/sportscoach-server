jest.mock('../../../../../models/Stat', () => ({
  Stat: {
    findOneAndUpdate: jest.fn(),
  },
}))
jest.mock('../../../../../services/faktory/workers/stats/match', () => ({
  kindStats: jest.fn(),
  durationStats: jest.fn(),
}))
import { calcMatchStats, kindStats, durationStats } from '../../../../../services/faktory/workers/stats/match';

describe.only('#calcMatchStats', () => {
  const match = { id: 1 }

  test('calls kindStats for goals and assists, and durationStats', async () => {
    const events = [
      { _id: 1, kind: 'BOGUS'},
    ]

    await calcMatchStats({events, match})

    expect(kindStats).toHaveBeenCalledTimes(2);
    expect(durationStats).toHaveBeenCalled();
  });
});


describe('#calcMatchStats', () => {
  const match = {
    id: 1,
  }

  test('works with a single goal event', async () => {
    const events = [
      { _id: 1, kind: 'GOAL'},
    ]

    await calcMatchStats({events, match})

    expect(Stat.findOneAndUpdate.mock.calls[0][0]).toEqual( { kind: 'MATCH_GOALS', matchId: match.id });
  });
});
