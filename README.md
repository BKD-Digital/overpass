#JavaScript Code Test - Automated Parking Garage

#IMPORTANT INSTRUCTIONS

- You have been given access to this repository, please commit as you would normally do with any other project.
- Please start by creating a branch and work off that branch. Please do not commit to master.
- When you are finished with the code test, please create a pull request for this project and inform the HR person at overpass you are in touch with.

###Summary
 A nearby Parking Garage requires the help of an engineer to display a day's worth of transactions in a data table.

###Requirements
- Build UI that displays a data table of a day's worth of parking transactions
- The data table should display license plate number, price, duration, time the vehicle entered (in) and exited (out)
- The table should be sorted sorted descending by the time the car exited the garage
- The price of parking is 2.99/hr and usually the first hour is free
- Entries for a car that is there for more than 24 hours, we need to tag them (red colored)
- Entries for cars that were not charged, because they were there less than the first hour, should be blue

###Data Model
The parking garage has a REST API that can be queried for a day's worth of parking information. The application you build should request the data from the `/api/event` endpoint. Sending a `GET` request will retrieve a JSON Array of transactions. Each transaction includes the car's license plate number, the time the vehicle entered, and the time the vehicle left the garage.

###Deliverables
The data table should be sorted descending by the time the car exited the garage. The table should display a header in the order described below with license plate as the left most column. Price should be rounded to the nearest cent, duration is measured in hours and rounded to the nearest hundreth, in and out time should be pretty printed in the following date format: `M/DD/YYYY h:mm:mm AM/PM`. The table should be styled to taste.

Here is an example in Markdown of how the table should be organized.

| LICENSE        | PRICE        | DURATION    | IN                         | OUT                         |
| 9SC8DK         | 2.53         | 1.85        | 3/13/2017 10:09:00 PM      | 3/13/2017 11:59:35 PM       |
| UJR0K4         | 28.42        | 10.51       | 3/13/2017 1:29:00 PM       | 3/13/2017 11:59:17 PM       |


###Focus
We are primarily looking at how you solve the problem architecturally. You may use any framework or library, however vanilla JavaScript is highly recommended since we take that into account during our code review, so use it sparingly.


###Getting Started
Clone the repository. You must have `node` and `npm` installed locally to begin the test.

Run `npm install`

To start the development environment, run `npm start`. This will start up the Express Server at `http://localhost:4200`.

The JSON Model is available by making a http request to `http://localhost:4200/api/event`


###Extra Credit
- Provide unit tests for the code you write.
- The system should be configured to run promotions where parking is free for other durations, this would mean updating the event code to also randomly add in promotion codes to some car entries, and display the resulting pricing in the output
