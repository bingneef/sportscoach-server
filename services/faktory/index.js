import faktory from 'faktory-worker';
import { SendAttendancePushNotification } from '../notifications/event';
import { CalcStatsForMatch } from './workers/stats';

export const runBackgroundJob = async ({jobtype, args}) => {
  console.log(1)
  const client = await faktory.connect();
  console.log(2)
  const jid = await client.push({
    jobtype,
    args,
  });
  console.log(3)
  await client.close();
  console.log(4)
}

faktory.register('SendAttendancePushNotification', async message => {
  SendAttendancePushNotification(message)
});

faktory.register('CalcStatsForMatch', async matchId => {
  CalcStatsForMatch(matchId)
});

(async () => {
  await faktory.work();
})();
