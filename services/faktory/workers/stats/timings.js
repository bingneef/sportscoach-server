export const durationFromTimings = ({timings}) => {
  let gameDuration = 0;
  for (let timing of timings) {
    if (timing.kind == 'TIMING_PERIOD_END' || timing.kind == 'TIMING_RESUMED') {
      const matchedTiming = timings.find(t => t._id.toString() == timing.parentId.toString());

      if (!matchedTiming) {
        console.warn(`[WORKER] CalcStatsForMatch - Timing event missing (id: ${timing._id})`)
        continue;
      }

      let diff = timing.createdAt - matchedTiming.createdAt;
      if (timing.kind == 'TIMING_RESUMED') {
        // Pause resume takes away time
        diff = diff * -1;
      }
      gameDuration += diff
    }
  }

  return gameDuration;
}
