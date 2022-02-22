const BirthdayService = require('../src/birthday.service');

const birth = new BirthdayService();

const WRONG_ARGUMENT = 'INVALID DATE';

const TWO_DAYS_BEFORE = new Date('07/23/1998');
const TWO_DAYS_AFTER = new Date('07/27/1998');

describe('CommonJS modules', () => {
  it('should be Wrong argument!', async () => {
    await expectAsync(
      birth.howLongToMyBirthday(new Date(WRONG_ARGUMENT))
    ).toBeRejectedWith(new Error('Wrong argument!'));
  });

  it('should be Wrong argument!', async () => {
    await expectAsync(
      birth.howLongToMyBirthday(WRONG_ARGUMENT)
    ).toBeRejectedWith(new Error('Wrong argument!'));
  });

  // currentDate 16 Feb 2022;
  it("should be Oh, you have celebrated it 2 days ago, don't you remember?", async () => {
    await expectAsync(
      birth.howLongToMyBirthday(new Date(TWO_DAYS_BEFORE))
    ).toBeResolvedTo(
      "Oh, you have celebrated it 2 days ago, don't you remember?"
    );
  });

  it('should be Hooray!!! It is today!', async () => {
    await expectAsync(
      birth.howLongToMyBirthday(new Date(Date.now()))
    ).toBeResolvedTo('Hooray!!! It is today!');
  });

  // currentDate 16 Feb 2022;
  it('should be Soon...Please, wait just 2 days', async () => {
    await expectAsync(
      birth.howLongToMyBirthday(new Date(TWO_DAYS_AFTER))
    ).toBeResolvedTo('Soon...Please, wait just 2 days');
  });
});
