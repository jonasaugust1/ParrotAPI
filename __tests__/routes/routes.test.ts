import request from "supertest";
import routes from '../../src/routes'

describe("POST /users", () => {
	
	describe("give a username and password", () => {
		
		test("Deve ser um status code 200", async () => {
			const response = await request(routes).post("users").send({
				name: "name",
				email: "email",
				appartament: "appartament",
				password: "password"
			})
			expect(response.statusCode).toBe(200)
		})
    })
})