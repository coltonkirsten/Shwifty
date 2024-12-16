import { defineStorage } from '@aws-amplify/backend';
import { auth } from '../auth/resource';

export const shwiftyResumes = defineStorage({
  name: 'shwifty-resumes',
  access: (allow) => ({
    'user/*': [
      allow.authenticated.to(['write'])
    ]
  })
});
