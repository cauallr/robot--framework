describe('Testes de automação no site de e-commerce', () => {

  it('Realiza uma busca por um produto qualquer', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/products"]').click()
    cy.get('#search_product', { timeout: 10000 }).should('be.visible')
    cy.get('#search_product').type('T-shirt')
    cy.get('button[id="submit_search"]').click()
    cy.contains('h2', 'Searched Products').should('be.visible')
  })
  
  it('Preenche os campos de login com dados inválidos e tenta logar', () => {
    cy.visit('https://automationexercise.com/')
    cy.contains('a', 'Signup / Login').click()
    cy.get('input[data-qa="login-email"]').type('teste@invalido.com')
    cy.get('input[data-qa="login-password"]').type('senha123')
    cy.get('button[data-qa="login-button"]').click()
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })

  it('Adiciona um produto ao carrinho e simula o processo de checkout', () => {
    cy.visit('https://automationexercise.com/')
    cy.contains('a', 'Products').click()
    cy.get('[data-toggle="collapse"]').eq(1).click() 
    cy.get('a[href="/category_products/3"]').click()
    cy.get('.productinfo').first().trigger('mouseover')
    cy.contains('Add to cart').first().click()
    cy.contains('View Cart').click()
    cy.get('tr').should('contain', 'Tshirt')
    cy.contains('Proceed To Checkout').click()
    cy.contains('Checkout').should('be.visible')
  })
})
