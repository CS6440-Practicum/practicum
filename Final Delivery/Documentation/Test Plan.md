# Dexercise Test Plan

The goal of this document is to outline the various testing strategies we plan to implement to ensure Dexercise functions properly, safely, and efficiently. The main testing strategies we will utilize are:

- Unit Testing
- Acceptance Testing
- Exploratory Testing

## Unit Testing

Unit testing is the bread and butter of software testing. Before a full release of the application, unit tests must be set up to achieve at least **75% coverage**. The goal of these unit tests will be to ensure all sections of the application work as expected and all edge cases are handled.

The main items to test will include all of the module exports in the server and client. Individual helper functions inside modules will also be unit tested as necessary. Some broad unit tests at the highest level to ensure the site is functioning generally as expected will also be useful.

## Acceptance Testing

Since the application is very simple, the acceptance testing for it will be very lightweight. The goal of this testing is to ensure the site works as expected. There is only one main functionality (the chart), so the acceptance criteria for the application will be focused on that.

Acceptance Criteria:

- The site allows and enforces authentication with
    - Google
    - Dexcom
- The chart displays
    - Google Fit heart point data
    - Dexcom estimated blood glucose level data
- The chart ranges data based on input datetimes

## Exploratory Testing

The final stage of testing to implement is a catch-all to cover any gaps the previous testing may have missed. Some sample use cases containing possible edge cases will be followed to ensure the application can handle them. Since there is only one form of input currently inside the core application (datetime range entry), this will be the target of the exploratory testing. This can be covered through testing invalid input (such as inverted time ranges), as well as exceedingly large time ranges or ranges with no data.