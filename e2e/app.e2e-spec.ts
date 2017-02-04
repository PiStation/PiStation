import { PistationClientPage } from './app.po';

describe('pistation-client App', function() {
  let page: PistationClientPage;

  beforeEach(() => {
    page = new PistationClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
