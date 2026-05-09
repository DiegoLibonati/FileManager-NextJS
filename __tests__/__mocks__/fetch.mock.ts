export const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
  });
};

export const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  });
};

export const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};
