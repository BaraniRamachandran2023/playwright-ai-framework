Feature: Article editing and deletion

  Scenario: Edit an existing article
    Given an article exists
    When I update its title
    Then the article page shows the updated title

  Scenario: Delete an article
    Given an article exists
    When I delete it
    Then the article should no longer exist