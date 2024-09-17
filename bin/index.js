#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {join} = require('path')
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, '../prj');
const destinationDir = process.cwd(); // Current working directory

function isFile(target) {
  return fs.statSync(target).isFile();
}

function copyFile(source, target) {
  fs.copyFileSync(source, target);
  return;
}

function copyFiles(source, target) {
  const dirs = fs.readdirSync(source);
  for (const d of dirs) {
    if (isFile(join(source, d))) {
      copyFile(join(source, d), join(target, d));
    } else {
      fs.mkdirSync(join(target, d));
      copyFiles(join(source, d), join(target, d));
    }
  }
}

copyFiles(sourceDir, destinationDir);
console.log('Template created installing dependencies...');
execSync('npm install')
console.log('Done');