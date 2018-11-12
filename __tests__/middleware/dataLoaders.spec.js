import dataLoaders from '../../middleware/dataLoaders';

describe('#dataLoaders', () => {
  test('calls next function', async () => {
    const mockNext = jest.fn();
    await dataLoaders({}, mockNext)
    expect(mockNext.mock.calls.length).toBe(1);
  });

  test('add dataLoaders to ctx', async () => {
    let ctx = {};
    const dataLoaderKeys = [
      'userByToken',
      'userById',
      'userWeddingById',
      'userWeddingsByWeddingId',
      'myUserWeddingByWeddingId',
      'weddingById',
      'programmeById',
      'programmesByWeddingId',
      'infoById',
      'infosByWeddingId',
      'newsItemById',
      'newsItemsByWeddingId',
      'weddingRoleByToken',
      'attendanceById',
      'myAttendanceByProgrammeId',
      'attendancesByProgrammeId',
    ]
    await dataLoaders(ctx, jest.fn())

    const ctxDataLoaderKeys = Object.keys(ctx.dataLoaders);

    for (let dataLoaderKey of dataLoaderKeys) {
      expect(ctx.dataLoaders[dataLoaderKey].constructor.name).toBe('DataLoader');
    }
  });
});
