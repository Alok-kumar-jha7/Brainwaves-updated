const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
// Allow Metro to resolve .cjs modules used by Firebase
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;
module.exports = config;

