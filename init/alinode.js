const os = require('os');
const path = require('path');
const AlinodeAgent = require('agentx');

const alinode = appRequire('services/config').get('alinode');
const logPath = path.resolve(os.homedir(), '.ssmgr', 'logs');
let alinodeLogdir = path.join(logPath, 'alinode');

const config = {
  server: 'wss://agentserver.node.aliyun.com:8080',
  appid: '',
  secret: '',
  cmddir: path.dirname(require.resolve('commandx/package.json')),
  logdir: alinodeLogdir,
  error_log: [
    path.join(alinodeLogdir, 'common-error.log'),
    path.join(alinodeLogdir, 'stderr.log'),
  ],
  packages: [
    path.resolve(__dirname, '../package.json')
  ],
  // seconds
  reconnectDelay: 10,
  heartbeatInterval: 60,
  reportInterval: 60,
};

try {
  if (alinode) {
    new AlinodeAgent({
      ...config,
      ...alinode
    }).run();
  }
} catch (err) {
  logger.info(`init alinode failed: ${err}`);
}
