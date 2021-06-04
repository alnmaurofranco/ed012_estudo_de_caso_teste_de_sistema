import { WebDriver, By } from "selenium-webdriver";

class Livro {
  private webDriver: WebDriver;

  private isbnBy = By.id("isbn");
  private autorBy = By.id("autor");
  private tituloBy = By.id("titulo");

  private btnCadastrarLivroBy = By.css(".btn:nth-child(1)");
  private btnMenuBy = By.linkText("Livros");

  private resultado = By.css("tr:nth-child(1) > td:nth-child(3)");
  private btnExcluirBy = By.css("tr:nth-child(2) .delete");

  constructor(driver: WebDriver) {
    this.webDriver = driver;
  }

  public async cadastrarLivro(
    isbn: string,
    autor: string,
    titulo: string
  ): Promise<Livro> {
    await this.webDriver.findElement(this.btnMenuBy).click();
    await this.webDriver.findElement(this.isbnBy).sendKeys(isbn);
    await this.webDriver.findElement(this.autorBy).sendKeys(autor);
    await this.webDriver.findElement(this.tituloBy).sendKeys(titulo);
    await this.webDriver.findElement(this.btnCadastrarLivroBy).click();
    return new Livro(this.webDriver);
  }

  public async getResultado(): Promise<string> {
    return await this.webDriver.findElement(this.resultado).getText();
  }

  public async excluirLivro(): Promise<void> {
    await this.webDriver.findElement(this.btnExcluirBy).click();
  }
}

export { Livro };
