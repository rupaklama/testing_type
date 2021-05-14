import { Server } from 'http';
import * as axios from 'axios';
import { createApp, SECRET_KEY } from './api';
import * as jwt from 'jsonwebtoken';

// NOTE - The Jest Lifecylce: Before and After Hooks
describe('app', () => {
  // execute some code before each tests
  beforeEach(done => {
    console.log('Before');
    let app: Server;
    // express instance
    // to finish execution with done callback
    app = createApp().listen(8080, done);
  });

  // execute some code after each tests
  afterEach(done => {
    console.log('After');
    app.close(done);
  });

  it('gets data', async () => {
    interface Data {
      foo: string;
    }

    // making request
    const res = await axios.get<Data>('http://localhost:8080/data');
    console.log(res.data);
    expect(res.data).toEqual<Data>({ foo: 'bar' });
  });

  // user authentication
  it('successfully auth', async () => {
    const token = jwt.sign('token', SECRET_KEY);
    const res = await axios.default.post(
      'http://localhost:8080/login',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(res.status).toBe(200);
  });

  it('fails to auth', async () => {
    const token = jwt.sign('token', 'fake key');
    const res = () =>
      axios.default.post(
        'http://localhost:8080/login',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    // try {
    //   await res()
    // } catch (e) {
    //   expect(e.response.status).toBe(401)
    // }
    await expect(res).rejects.toHaveProperty('response.status', 401);
  });
});
