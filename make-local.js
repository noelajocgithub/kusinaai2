/* Wraps index.html (which is written as artifact body content) into a
   complete standalone document you can double-click and open locally.
   Run: node make-local.js   ->   open-locally.html                     */

const fs = require('fs');
const body = fs.readFileSync(__dirname + '/index.html', 'utf8');
const title = (body.match(/<title>([^<]*)<\/title>/) || [, 'Kusina'])[1];

fs.writeFileSync(__dirname + '/open-locally.html',
  '<!doctype html>\n<html lang="en">\n<head>\n' +
  '<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '<title>' + title + '</title>\n' +
  '<meta name="description" content="A Filipino recipe chatbot with three difficulty levels, pantry matching, scaling, and a cooking class.">\n' +
  '</head>\n<body>\n' + body + '\n</body>\n</html>\n');

console.log('wrote open-locally.html — generated from index.html, do not edit directly');
