import { ScalekitClient } from '@scalekit-sdk/node';
import { ScalekitAuthNext } from '@scalekit-sdk/node/next';

export const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENVIRONMENT_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!
);

export const auth = new ScalekitAuthNext({
  client: scalekit,
  redirectUri: process.env.REDIRECT_URI!,
  cookieEncryptionSecret: process.env.COOKIE_ENCRYPTION_SECRET!,
});