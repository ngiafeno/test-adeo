const { count, filter, filterAndCount } = require('../app.js');

describe('Combine filter and count args', () => {
  it('Should filter the result to only matching animal  name (ry) and count only one', () => {
    expect(filterAndCount('ry')).toEqual('[{"name":"Uzuzozne [1]","people":[{"name":"Lillie Abbott [1]","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi [1]","people":[{"name":"Anthony Bruno [1]","animals":[{"name":"Oryx"}]}]}]');
  });
  
  it("Should return message nothing is found it the filter return nothing", () => {
    expect(filterAndCount('')).toEqual('Nothing found');
  })
});
