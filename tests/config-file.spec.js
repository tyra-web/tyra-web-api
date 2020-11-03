const request = require('supertest');
const server = require('../mock_server');

describe('Configuration File', () => {
	it('Should create an initial configuration file', () => {
		return request(server).post('/config').send({}).expect(201);
	});
});
