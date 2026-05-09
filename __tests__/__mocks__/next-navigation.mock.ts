export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockRefresh = jest.fn();

export const nextNavigationMock = {
  __esModule: true,
  useRouter: (): { push: jest.Mock; replace: jest.Mock; refresh: jest.Mock } => ({
    push: mockPush,
    replace: mockReplace,
    refresh: mockRefresh,
  }),
  redirect: jest.fn(),
  notFound: jest.fn(),
};
