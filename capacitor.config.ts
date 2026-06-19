import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vivaha.app',
  appName: 'Vivaha',
  webDir: 'public',
  bundledWebRuntime: false,
  server: {
    url: 'https://vivaha.vercel.app',
    cleartext: true
  }
};

export default config;
