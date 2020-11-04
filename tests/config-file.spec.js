const request = require('supertest');
const server = require('../mock_server');

describe('Configuration File', () => {
	it('Should get auth error without token when updating', () => {
		return request(server).post('/config').send({}).expect(401);
	});

	it('Should get auth error without token when getting file', () => {
		return request(server).get('/config/setup').expect(401);
	});
});
