import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';
const secretKey = environment.secretKey;

const CryptoJSAesJson = {
  stringify: function (cipherParams: any) {
    const j: any = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr: string) {
    const j = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv.toString());
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s.toString());
    return cipherParams;
  }
};

export function encryptData(data: any): string {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, { format: CryptoJSAesJson }).toString();
  return encrypted;
}

export function decryptData(encryptedData: string): any {
  try {
    if (!encryptedData) {
      return null;
    }
    const decrypted = CryptoJS.AES.decrypt(JSON.stringify(encryptedData), secretKey, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      return null;
    }
    const data = JSON.parse(decodeURIComponent(JSON.parse(decrypted)));
    return data;
  } catch (error) {
    return null;
  }
}
