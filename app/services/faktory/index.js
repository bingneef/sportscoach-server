import faktory from 'faktory-worker';
import { SendAttendancePushNotification } from '../notifications/event';
import { CalcStatsForMatch } from './workers/stats';

export const runBackgroundJob = async ({jobtype, args}) => {
  const client = await faktory.connect();
  const jid = await client.push({
    jobtype,
    args,
  });
  await client.close();
}

faktory.register('SendAttendancePushNotification', async message => {
  SendAttendancePushNotification(message)
});

faktory.register('CalcStatsForMatch', async matchId => {
  CalcStatsForMatch(matchId)
});

// (async () => {
//   await faktory.work();
// })();
