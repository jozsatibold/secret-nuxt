import * as crypto from "crypto";
import { decrypt, encrypt } from "~/serverMiddleware/utils/encryption";
describe('encryption', () => {
  test('Should_encrypt_and_decrypt', () => {

    const text = 'RANDOM_TEXT';

    const iv = crypto.randomBytes(16).toString('hex');

    const encryptedText = encrypt(text, iv);

    expect(encryptedText).not.toEqual(text);

    const decryptedText = decrypt(encryptedText, iv);

    expect(decryptedText).toEqual(text);
  })
});
