// Jest Matchers

test('', async () => {
  const a = {
    foo: {
      num: 1,
    },
  };

  // promises
  const res = new Promise(resolve => {
    resolve(a);
  });

  const rej = new Promise((resolve, reject) => {
    reject(a);
  });

  await expect(res).resolves.toEqual({
    // resolve object to be
    foo: {
      num: 1,
    },
  });

  // when using 'resolves/rejects' for Promise always 'return' the final statement
  // or use async await for each expectation
  // return expect(rej).rejects.toEqual({
  await expect(rej).rejects.toEqual({
    // resolve object to be
    foo: {
      num: 1,
    },
  });
});

// Mock Functions

// test function
const fetchData = cb => {
  const val = 'Data';

  cb(val);
};

test('', async () => {
  // jest mock function does not do anything
  // place holder for any related function when testing
  // in this case, some sort of 'callback' function - just to be fulfill the requirements
  const cb = jest.fn();
  fetchData(cb);

  // NOTE - .toHaveBeenCalled to ensure that a mock function got called.
  //  expect(cb).toHaveBeenCalled();
  expect(cb).toHaveBeenCalledWith('Data');
});

// Waiting with the Done Callback for Async actions/Callback functions
test('', done => {
  // needs add done param
  // this is NOT going to pass since 'Jest is synchronous test runner'
  // this should fail the test unless call with 'done' Callback
  setTimeout(() => {
    expect(1).toBe(1);
    done(); // calling done to tell jest everything is finished
  }, 3000);
});
