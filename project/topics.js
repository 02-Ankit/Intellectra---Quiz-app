import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./basicMath.json', 'utf-8'));
const topics = [...new Set(data.map(item => item.topic))];
console.log(topics);
