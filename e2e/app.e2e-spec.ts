import { TrackedPixelWebsitePage } from './app.po';

describe('tracked-pixel-website App', () => {
  let page: TrackedPixelWebsitePage;

  beforeEach(() => {
    page = new TrackedPixelWebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
