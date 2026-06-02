import { nginxPost } from './nginx';
import { redisPost } from './redis';
import { wslPost } from './wsl';
import { bitwisePost } from './bitwise';
import { mirrorPost } from './mirror';

export const myPosts = [
  nginxPost,
  redisPost,
  wslPost,
  bitwisePost,
  mirrorPost,
];
