class Menu {
    irPara(pagina){
        cy.contains(pagina).click()
        if (pagina.toLowerCase() === 'logout'){
            cy.url().should("contain", "login")
        }
        else {
            cy.url().should("contain", pagina.toLowerCase() )
        }
    }
}

export default new Menu()