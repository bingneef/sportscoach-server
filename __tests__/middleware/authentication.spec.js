import authentication from '../../middleware/authentication';

describe('#authentication', () => {
  test('calls next function if no token in query', async () => {
    const mockNext = jest.fn();
    const ctx = {
      query: {},
      request: {
        header: {}
      }
    }

    await authentication(ctx, mockNext)
    expect(mockNext.mock.calls.length).toBe(1);
  });
});
