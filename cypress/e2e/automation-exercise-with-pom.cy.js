/// <reference types="cypress" />
import registerCypressGrep from '@cypress/grep/src/support'
registerCypressGrep()
import cadastro from "../pages/cadastro";
import login from "../pages/login";
import menu from "../pages/menu";
import contato from "../pages/contato";
import subscription from "../pages/subscription";
import pedido from "../pages/pedido";

import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    beforeEach(()=>{
        cy.visit('/')
    })

    it('Test Case 1: Cadastrar um usuário',{ tags: 'smoke' }, () => {
        //Arrange
        const secrets = {name: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password()}

        //Action
        cadastro.iniciarCadastro(secrets.name, secrets.email)
        cadastro.preencherFormulario(secrets.password)
        
        //Assertion
        cy.get('i.fa-user').parent().should('contain', secrets.name)
  
    });

    it("Test Case 2: Login User with correct email and password",()=>{
        //Arrange
        const secrets = {name: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password()}
        cadastro.iniciarCadastro(secrets.name, secrets.email)
        cadastro.preencherFormulario(secrets.password)
        menu.irPara("Logout")
        
        //Action
        menu.irPara("Login")
        login.preencherLogin(secrets.email, secrets.password)

        //Assertion
        cy.contains("Logged in as").should("be.visible")
        cy.contains("Delete Account").should("be.visible")
        cy.contains("Delete Account").click("")
        cy.contains("Account Deleted!").should("be.visible")

    })
    it("Test Case 3: Invalid User",()=>{
        //Arrange
        const secrets = {name: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password()}
        
        //Action
        menu.irPara("Login")
        login.preencherLogin(secrets.email, secrets.password)
        
        //Assertion
        cy.contains("Your email or password is incorrect!").should("be.visible")
        

    })

    it("Test Case 4: Logout User",()=>{
        //Arrange
        const secrets = {name: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password()}
        cadastro.iniciarCadastro(secrets.name, secrets.email)
        cadastro.preencherFormulario(secrets.password)
        cy.contains("Logout").click()

        //Action  
        menu.irPara("Login")
        login.preencherLogin(secrets.email,secrets.password)
        cy.contains(" Logged in as ").should("be.visible")
        cy.contains("Logout").click()

        //Assertion
        cy.contains("Signup / Login").should("be.visible")

    })
    it("Test Case 5 - Register existing user",()=>{
        //Arrange
        const secrets = {name: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password()}
        cadastro.iniciarCadastro(secrets.name, secrets.email)
        cadastro.preencherFormulario(secrets.password)
        cy.contains("Logout").click()
        
        //Action
        cy.contains("Signup / Login").click()
        cy.contains("Login to your account").should("be.visible")
        cadastro.iniciarCadastro(secrets.name,secrets.email)
        
        //Assertion
        cy.contains("form[action='/signup']","Email Address already exist!").should("be.visible")
    })
    it("Test Case 6 - Contact Us Form",()=>{
        //Arrange
        const user = {name: faker.person.fullName(), email: faker.internet.email()}
       
        //Action 
        menu.irPara("Contact")
        contato.preencherContato(user.name,user.email)

        //Assertion
        cy.contains('.status',"Success!").scrollIntoView().should("be.visible")


    })
    it("Test Case 8- Verify All Products and product detail page",()=>{
        //Arrange
        menu.irPara("Products")
        cy.contains("View Product")
        
        //Action
        cy.get(".product-image-wrapper").should("have.length.at.least",1)
        cy.contains(".choose","View Product").first().click()
        cy.get(".product-information").should("contain.html","<h2>")
        
        //Assertion
        cy.contains(".product-information","Category").should("be.visible")
        cy.contains(".product-information","Rs.").should("be.visible")
        cy.contains(".product-information","Availability").should("be.visible")
        cy.contains(".product-information","Condition").should("be.visible")
        cy.contains(".product-information","Brand").should("be.visible")




    })
    
    it('Test Case 9: Search Product', () => {
        //Arrange
        menu.irPara('Products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')
        
        //Action
        cy.get('input#search_product').type('Shirt')
        cy.get('button#submit_search').click()
    
        //Assertion
        cy.get('.title').should('be.visible').and('contain', 'Searched Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
    
    });
    
    it('Test Case 10: Verify Subscription in home page', () => {    
        //Arrange
        const email = faker.internet.email()

        //Action
        subscription.preencherSubscription(email)

        //Assertion
        cy.contains('You have been successfully subscribed!').should('be.visible')
    
    });
    
    it('Test Case 15: Place Order: Register before Checkout', () => {
        //Arrange
        const secrets = {name: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password()}
        cadastro.iniciarCadastro(secrets.name,secrets.email)
        cadastro.preencherFormulario(secrets.password)
        cy.get('b').should('contain', secrets.name)
        
        //Action
        pedido.adicionarCarrinho()
        pedido.checkout()
        pedido.pagamento()
        cy.get('[href *="delete"]').click()
        
        //Assertion
        cy.get('b').should('contain', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    })
});