import { durationFromTimings } from '../../../../../services/faktory/workers/stats/timings';
import { Stat } from '../../../../../models/Stat'

const timeToDate = (...args) => new Date(2018,1,1, ...args)

describe('#durationFromTimings', () => {
  test('works for a period', async () => {
    const timings = [
      { _id: 1, kind: 'TIMING_PERIOD_START', createdAt: timeToDate(14,0,0) },
      { _id: 2, kind: 'TIMING_PERIOD_END', parentId: 1, createdAt: timeToDate(14,45,0) },
    ]
    expect(durationFromTimings({timings})).toBe(2700000);
  });

  test('works for multiple periods', async () => {
    const timings = [
      { _id: 1, kind: 'TIMING_PERIOD_START', createdAt: timeToDate(14,0,0) },
      { _id: 2, kind: 'TIMING_PERIOD_END', parentId: 1, createdAt: timeToDate(14,45,0) },
      { _id: 3, kind: 'TIMING_PERIOD_START', createdAt: timeToDate(15,0,0) },
      { _id: 4, kind: 'TIMING_PERIOD_END', parentId: 3, createdAt: timeToDate(15,45,0) },
    ]
    expect(durationFromTimings({timings})).toBe(5400000);
  });

  test('works with pauses / resumes', async () => {
    const timings = [
      { _id: 1, kind: 'TIMING_PERIOD_START', createdAt: timeToDate(14,0,0) },
      { _id: 2, kind: 'TIMING_PAUSED', createdAt: timeToDate(14,15,0) },
      { _id: 3, kind: 'TIMING_RESUMED', parentId: 2, createdAt: timeToDate(14,20,0) },
      { _id: 4, kind: 'TIMING_PERIOD_END', parentId: 1, createdAt: timeToDate(14,45,0) },
    ]
    expect(durationFromTimings({timings})).toBe(2400000);
  });
});
