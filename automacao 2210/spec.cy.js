describe('Testes de automação no site de e-commerce', () => {

  it('Realiza uma busca por um produto qualquer', () => {

    //Acesso ao site
    cy.visit('https://automationexercise.com/')
    //Clica em produtos, logo em seguida espera ate 10000ms ate que fique visivel o campo de busca
    cy.get('a[href="/products"]').click()
    cy.get('#search_product', { timeout: 10000 }).should('be.visible')

    // digita 't-shirt' no campo de busca
    cy.get('#search_product').type('T-shirt')

    //Clica no botão de pesquisa e espera que os produtos fiquem visiveis
    cy.get('button[id="submit_search"]').click()
    cy.contains('h2', 'Searched Products').should('be.visible')
  })
  
  it('Preenche os campos de login com dados inválidos e tenta logar', () => {
    //Acesso ao site
    cy.visit('https://automationexercise.com/')

    //Clica em 'Login / Signup'
    cy.contains('a', 'Signup / Login').click()

    //Preenche os campos de login
    cy.get('input[data-qa="login-email"]').type('teste@invalido.com')
    cy.get('input[data-qa="login-password"]').type('senha123')
    cy.get('button[data-qa="login-button"]').click()

    //Valida mensagem de erro
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })

  it('Adiciona um produto ao carrinho e simula o processo de checkout', () => {
    //Acesso ao site
    cy.visit('https://automationexercise.com/')

    //Clica em 'Products'
    cy.contains('a', 'Products').click()

    //Clica no primeiro produto, pois, o cypress retorna uma lista de elementos que contem data-toggle = collapse
    cy.get('[data-toggle="collapse"]').eq(1).click() 

    //Clica no botão Add to cart
    cy.get('a[href="/category_products/3"]').click()
    cy.get('.productinfo').first().trigger('mouseover')
    cy.contains('View Cart').click()
    cy.contains('Add to cart').first().click()

    //Clica em Proceed To Checkout
    cy.get('tr').should('contain', 'Tshirt')
    cy.contains('Proceed To Checkout').click()
    cy.contains('Checkout').should('be.visible')
  })
})
