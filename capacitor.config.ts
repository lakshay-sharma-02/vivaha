import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sahachar.app',
  appName: 'Sahachar',
  webDir: 'public',
  server: {
    url: 'https://sahachar.vercel.app',
    cleartext: true
  }
};

export default config;
