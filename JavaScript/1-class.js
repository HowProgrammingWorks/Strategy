'use strict';

class Strategy {
  render() {
    console.log('Not implemented');
  }
}

class ConsoleRenderer extends Strategy {
  render(data) {
    console.table(data);
  }
}

class WebRenderer extends Strategy {
  render(data) {
    const keys = Object.keys(data[0]);
    const line = row => '<tr>' +
      keys.map(key => `<td>${row[key]}</td>`).join('') +
      '</tr>';
    const output = [
      '<table><tr>',
      keys.map(key => `<th>${key}</th>`).join(''),
      '</tr>',
      data.map(line).join(''),
      '</table>',
    ];
    console.log(output.join(''));
  }
}

class MarkdownRenderer extends Strategy {
  render(data) {
    const keys = Object.keys(data[0]);
    const line = row => '|' +
      keys.map(key => `${row[key]}`).join('|') + '|\n';
    const output = [
      '|', keys.map(key => `${key}`).join('|'), '|\n',
      '|', keys.map(() => '---').join('|'), '|\n',
      data.map(line).join(''),
    ];
    console.log(output.join(''));
  }
}

class Context extends Strategy {
  constructor(strategy) {
    super();
    this.strategy = strategy;
  }
  render(data) {
    return this.strategy.render(data);
  }
}

// Usage

const non = new Context(new Strategy());
const con = new Context(new ConsoleRenderer());
const web = new Context(new WebRenderer());
const mkd = new Context(new MarkdownRenderer());

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
];

non.render(persons);
con.render(persons);
web.render(persons);
mkd.render(persons);
