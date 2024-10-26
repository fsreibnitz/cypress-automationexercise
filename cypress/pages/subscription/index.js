class Subscription{
    preencherSubscription(email){
        cy.get("#footer").scrollIntoView()  
        cy.get('input#susbscribe_email')
            .type(email)   
        cy.get('button#subscribe').click()
    }
}

export default new Subscription()