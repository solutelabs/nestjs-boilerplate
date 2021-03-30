// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

const commands = [
  {
    title: 'Removing github templates',
    cmd: 'rm -rf .github',
  },
  {
    title: 'Cleaning git commits ',
    cmd: 'rm -rf .git',
  },
  {
    title: 'Creating .env',
    cmd: 'cp .env.example .env',
  },
  {
    title: 'Initializing Git Repo',
    cmd: 'git init',
  },
];

// eslint-disable-next-line no-console
console.info('🚀 Starting Setup... \n');

for (const command of commands) {
  // eslint-disable-next-line no-console
  console.info(`✅ ${command.title}`);
  exec(command.cmd);
}
// eslint-disable-next-line no-console
console.info('\n🥳 Setup Finish!\n');
// eslint-disable-next-line no-console
console.info('⚡ ka boom 💥');
