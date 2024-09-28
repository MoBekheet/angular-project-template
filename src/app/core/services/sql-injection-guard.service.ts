import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SqlInjectionGuardService {
  private sqlKeywords = [
    'select',
    'insert',
    'update',
    'delete',
    'drop',
    'create',
    'alter',
    'truncate',
    'exec',
    'declare',
    'from',
    'where',
    'or',
    'and',
    'having',
    ';',
    '--',
    "'",
    '"',
  ];

  validateInput(input: string): boolean {
    // Check for SQL keywords
    const lowerCaseInput = input.toLowerCase();
    return !this.sqlKeywords.some(keyword => lowerCaseInput.includes(keyword));
  }
}
