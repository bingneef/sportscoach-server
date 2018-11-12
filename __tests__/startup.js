jest.mock('faktory-worker', () => ({
  connect: jest.fn(),
  push: jest.fn(),
  close: jest.fn(),
  work: jest.fn(),
  register: jest.fn(),
}));

jest.mock('ioredis', () => jest.fn().mockImplementation(() => ({
  on: jest.fn(),
})))
