let users = {
  kazuya: {
    id: 'kazuya',
    name: 'Kazuya',
    avatarURL: '',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  khabib: {
    id: 'khabib',
    name: 'Khabib',
    avatarURL: '',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  claudio: {
    id: 'claudio',
    name: 'Claudio',
    avatarURL: '',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  jack: {
    id: 'jack',
    name: 'Jack',
    avatarURL: '',
    answers: {},
    questions: []
  },
  ling: {
    id: 'ling',
    name: 'Ling',
    avatarURL: '',
    answers: {},
    questions: []
  },
  yvonne: {
    id: 'yvonne',
    name: 'Yvonne',
    avatarURL: '',
    answers: {},
    questions: []
  },
  belinda: {
    id: 'belinda',
    name: 'Belinda',
    avatarURL: '',
    answers: {},
    questions: []
  },
  james: {
    id: 'james',
    name: 'James',
    avatarURL: '',
    answers: {},
    questions: []
  }
};

let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'kazuya',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['kazuya'],
      text: 'have horrible social skills amazing wealth creation skills'
    },
    optionTwo: {
      votes: [],
      text: 'have horrible wealth creation skills amazing social skills'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'khabib',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero'
    },
    optionTwo: {
      votes: ['khabib', 'kazuya'],
      text: 'become a supervillain'
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'khabib',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be great in jiu-jitsu'
    },
    optionTwo: {
      votes: ['khabib'],
      text: 'be amazing in boxing'
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'kazuya',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer'
    },
    optionTwo: {
      votes: ['brittini'],
      text: 'be a back-end developer'
    }
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'kazuya',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['kazuya'],
      text: 'make $500 for yourself'
    },
    optionTwo: {
      votes: ['claudio'],
      text: 'help your best friend find $1000'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'claudio',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['claudio'],
      text: 'write JavaScript'
    },
    optionTwo: {
      votes: ['kazuya'],
      text: 'write Golang'
    }
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000);
  });
}

function formatQuestion({optionOneText, optionTwoText, author}) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({authUser, qid, answer}) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}
