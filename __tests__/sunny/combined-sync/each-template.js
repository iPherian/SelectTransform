const ST = require('../../../dist')['SelectTransform'];

const st = new ST();

const data = {
  name: 'Jakub',
  surname: 'Mifek',
  age: 24,
  friends: [
    {
      name: 'Michal',
      surname: 'Mozik',
    },
    {
      name: 'Marian',
      surname: 'Baca',
    },
    {
      name: 'Antonin',
      surname: 'Malik',
    },
  ],
};

const subtemplate = '{{ name + " " + surname }}';

const template = {
  name: '{{ name }}',
  surname: '{{ surname }}',
  age: '{{ age }}',
  friendList: {
    '{{ #each friends }}': '{{ #template subtemplate }}',
  },
};

const expected = {
  name: 'Jakub',
  surname: 'Mifek',
  age: 24,
  friendList: ['Michal Mozik', 'Marian Baca', 'Antonin Malik'],
};

test('transform is correct', done => {
  const result = st.addTemplates({ subtemplate }).transformSync(template, data);

  expect(result).toEqual(expected);
  done();
});
