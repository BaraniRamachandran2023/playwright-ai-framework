@api
Feature: Authentication API contract

  Scenario: Login endpoint returns a valid user payload
    When I request a login token with valid credentials
    Then the response status should be 200
    And the response should contain a valid user object

  Scenario: Login endpoint rejects invalid credentials
    When I request a login token with email "nobody@example.com" and password "wrongpassword"
    Then the response status should be 401