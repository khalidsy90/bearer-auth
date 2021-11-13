'use strict';

const middleware = require('../src/auth/middleware/basic');
const { db } = require('../src/auth/models/index');
const Users = require('../src/auth/models/users-model')
const {app} = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(app);

let userInfo = {
  admin: { username: 'admin-basic', password: 'password' },
};

//============================================================================
// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  await Users.create(userInfo.admin);
});
//============================================================================

afterAll(async () => {
  await db.drop();
})
//============================================================================

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();
//============================================================================

  describe('user authentication', () => {
//============================================================================

    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {
      // sign in with the right user
      await mockRequest.post('/signup').send({
        username: "admin",
        passwod: "password"
      });
      // 2- send wrong req
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });
//============================================================================

    xit('logs in an admin user with the right credentials', async () => {
      await mockRequest.post('/signup').send({
        username: "weasm",
        passwod: "quas"
      });
      // 3- send correct req
      req.headers = {
        authorization: 'Basic d2Vhc206cXVhcw==',
      };
      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalled();
        });
    });
  });
});