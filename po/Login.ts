import { WebDriver, By } from "selenium-webdriver";

class Login {
  private webDriver: WebDriver;
  private nameBy = By.name("username");
  private passwordBy = By.name("password");
  private btnLoginBy = By.css("button");

  constructor(driver: WebDriver) {
    this.webDriver = driver;
  }

  public async efetuarLogin(user: string, password: string): Promise<Login> {
    await this.webDriver.findElement(this.nameBy).click();
    await this.webDriver.findElement(this.nameBy).sendKeys(user);
    await this.webDriver.findElement(this.passwordBy).sendKeys(password);
    await this.webDriver.findElement(this.btnLoginBy).click();
    return new Login(this.webDriver);
  }
}

export { Login };
