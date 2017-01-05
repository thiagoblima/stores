import { StoresCasePage } from './app.po';

describe('stores-case App', function() {
  let page: StoresCasePage;

  beforeEach(() => {
    page = new StoresCasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
