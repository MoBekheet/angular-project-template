export interface AppConfig {
  projectName: string;
  language: string;
  apiUrl: string;
  isProduction: boolean;
  [key: string]: string | boolean; // السماح بالفهرسة باستخدام string
}
