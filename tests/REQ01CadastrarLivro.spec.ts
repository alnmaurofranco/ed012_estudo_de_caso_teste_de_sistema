import "mocha";
import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import { Livro } from "../po/Livro";
import { Login } from "../po/Login";

describe("REQ01ManterLivrosTests", async () => {
  let driver: any;
  let vars: any;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
    await driver.get("https://ts-scel.herokuapp.com");
  });

  after(async () => {
    await driver.quit();
  });

  it("CT01CadastrarLivroComSucesso", async () => {
    const paginaLogin = new Login(driver);
    await paginaLogin.efetuarLogin("jose", "123");

    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "9789",
      "Kent Beck",
      "TDD - Desenvolvimento Guiado Por Testes"
    );
    await driver.sleep(2000);
    expect("Lista de livros").to.equal(
      await driver.findElement(By.css(".panel-heading")).getText()
    );
  });

  it("CT02CadastrarLivroComMesmosDados", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "9789",
      "Kent Beck",
      "TDD - Desenvolvimento Guiado Por Testes"
    );
    await driver.sleep(2000);
    expect("Livro ja cadastrado").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });

  it("CT03CadastrarLivroComISBNInvalido", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "9789727228645",
      "Kent Beck",
      "TDD - Desenvolvimento Guiado Por Testes"
    );
    await driver.sleep(2000);
    expect("ISBN deve ter 4 caracteres").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });

  it("CT04CadastrarLivroComISBNVazio", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "",
      "Kent Beck",
      "TDD - Desenvolvimento Guiado Por Testes"
    );
    await driver.sleep(2000);
    expect("ISBN deve ter 4 caracteres").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });

  it("CT05CadastrarLivroComTituloInvalido", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "8577",
      "Luís Abreu",
      "Typescript. O Javascript Moderno Para Criação de Aplicações"
    );
    await driver.sleep(2000);
    expect("Titulo deve ter entre 1 e 50 caracteres").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });

  it("CT06CadastrarLivroComTituloVazio", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro("8577", "Luís Abreu", "");
    await driver.sleep(2000);
    expect("Titulo deve ter entre 1 e 50 caracteres").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });

  it("CT07CadastrarLivroComAutorInvalido", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "8577",
      "",
      "Typescript. O Javascript Moderno"
    );
    await driver.sleep(2000);
    expect("Autor deve ter entre 1 e 50 caracteres").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });

  it("CT08CadastrarLivroComAutorVazio", async () => {
    await driver.findElement(By.linkText("Voltar")).click();
    const paginaLivro = new Livro(driver);
    await paginaLivro.cadastrarLivro(
      "8577",
      "",
      "Typescript. O Javascript Moderno"
    );
    await driver.sleep(2000);
    expect("Autor deve ter entre 1 e 50 caracteres").to.equal(
      await driver.findElement(By.css(".text-danger")).getText()
    );
  });
});
