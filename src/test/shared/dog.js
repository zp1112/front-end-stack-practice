/* eslint-disable import/no-extraneous-dependencies, no-console */
// Well first of all, we call chai.use(sinonChai) to activate the Chai plugin. Then,
// all the magic happens in the it() statement: stub(console, 'log') is going to neutralize
// console.log and monitor it. When new Dog('Test Toby').barkInConsole() is executed,
// a console.log is normally supposed to happen. We test this call to console.log with
// console.log.should.have.been.calledWith(), and finally, we restore the neutralized console.log
// to make it work normally again.
import chai from 'chai';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import Dog from '../../shared/dog';

chai.should();
chai.use(sinonChai);

describe('Shared', () => {
  describe('Dog', () => {
    describe('barkInConsole', () => {
      it('should print a bark string with its name', () => {
        stub(console, 'log');
        new Dog('Test Toby').barkInConsole();
        console.log.should.have.been.calledWith('Wah wah, I am Test Toby');
        console.log.restore();
      });
    });
  });
});
