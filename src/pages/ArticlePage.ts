import { Page, Locator } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;
  readonly articleTitle: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly articleBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.articleTitle = page.locator('.banner h1');
    this.editButton = page.getByRole('link', { name: 'Edit Article' }).first();
    this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
    this.articleBody = page.locator('.article-content');
  }

  async gotoEditor(): Promise<void> {
    await this.page.goto('/editor');
  }

  async publish(title: string, description: string, body: string, tag: string): Promise<void> {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    await this.tagsInput.fill(tag);
    await this.tagsInput.press('Enter');
    await this.publishButton.click();
  }
  async gotoArticle(slug: string): Promise<void> {
    await this.page.goto(`/article/${slug}`);
  }

  async updateTitle(newTitle: string): Promise<void> {
    await this.editButton.click();
    await this.titleInput.fill(newTitle);
    await this.publishButton.click();
  }

  async deleteArticle(): Promise<void> {
    await this.deleteButton.click();
  }
}