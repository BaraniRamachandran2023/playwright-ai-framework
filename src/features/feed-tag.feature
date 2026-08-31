Feature: Feed filtering by tag

  Scenario: Filter the global feed by a popular tag
    Given I am on the home page
    When I select the "automation" tag
    Then the feed should show only articles tagged "automation"