const useMock = [k => k, {}];
useMock.t = k => k;
useMock.i18n = {};

module.exports = {
  useTranslation: jest
    .fn()
    .mockReturnValue(
      useMock
    )
};
