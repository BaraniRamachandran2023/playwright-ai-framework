Feature: User authentication

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I sign in with valid credentials
    Then I should see my username in the navigation bar

  Scenario: Login fails with invalid credentials
    Given I am on the login page
    When I sign in with email "nobody@example.com" and password "wrongpassword"
    Then I should see a login error message