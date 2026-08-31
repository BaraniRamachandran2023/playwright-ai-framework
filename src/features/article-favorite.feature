Feature: Favoriting articles

  Scenario: Favoriting an article increments its count
    Given I am on the home page
    When I favorite the first article
    Then the favorite count should increase by one