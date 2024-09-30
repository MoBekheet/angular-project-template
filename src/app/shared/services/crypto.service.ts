import { Injectable } from '@angular/core';
import { AES, SHA256, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  // Use a strong and secure secret key for encryption
  secretKey = 'S3cur3K3y@1234'; // Replace this with your own secure secret key

  // Hash the key to ensure it's consistent
  hashKey(key: string): string {
    return SHA256(key).toString();
  }

  // Encrypt the data (value)
  encrypt(data: string): string {
    return AES.encrypt(data, this.secretKey).toString();
  }

  // Decrypt the data (value)
  decrypt(cipherText: string): string {
    const bytes = AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(enc.Utf8);
  }
}
