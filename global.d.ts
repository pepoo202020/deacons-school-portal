// src/global.d.ts

// 1. Import your default language file. 
// We usually use the primary language (e.g., English or Arabic) as the source of truth for all keys.
import en from './messages/en.json';

// 2. Define the type based on the JSON structure
type Messages = typeof en;

// 3. Declare the global namespace for next-intl
declare global {
  // Use type safe message keys
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}