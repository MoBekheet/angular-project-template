import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  secretKey = 'your-secret-key';

  encrypt(data: string): string {
    return AES.encrypt(data, this.secretKey).toString();
  }

  decrypt(cipherText: string): string {
    const bytes = AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(enc.Utf8);
  }
}
