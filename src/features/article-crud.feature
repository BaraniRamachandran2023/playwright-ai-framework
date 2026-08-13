Feature: Article management

  Scenario: Create a new article
    Given I am on the article editor
    When I publish an article with a unique title
    Then I should land on the published article page