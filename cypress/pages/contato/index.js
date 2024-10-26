import { faker } from "@faker-js/faker"

class Contato {
    preencherContato(name,email){
        cy.get("[data-qa='name']").type(name)
        cy.get("[data-qa='email']").type(email)
        cy.get("[data-qa='subject']").type(faker.lorem.word())
        cy.get("[data-qa='message']").type(faker.lorem.lines(2))
        cy.fixture('example.json').as("arquivo")
        cy.get("input[name='upload_file']").selectFile('@arquivo')
        cy.get("[data-qa='submit-button']").click()

    }
}

export default new Contato()