# Getting Started with Rick and Morty app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Documentation
### Transactions
Register of any money movement
```
{
    from: id_reference,
    to: id_reference,
    quantity: number
}
```
from: User who sends money<br/>
to: User who recieves money<br/>
quantity: Amount of money<br/>
<br/></br>
### Notification
Notification object created when an user sends a transaction to another user
```
{
    notified: boolean,
    to: id_reference,
    transaction: transaction_reference
}
```
notified: Variable to know if the user has seen the notification object<br/>
to: User who recieves the notification<br/>
trasanction: Reference to transaction that trigger the notification object<br/>
<br/></br>
### Bank Account
Created to save total money of a user. 
```
{
    amount: number,
    userApp_id: id_reference
}
```
amount: Total of money available by user<br/>
userApp_id: User who owns the bank account<br/>

<br/></br>
## About the App
This app is developed using specific knowledge, tools and technologies from the front-end development.

As a package manager for the code, Yarn has been used. The React library  has been used, with its  Functional Components.

Firebase services have been implemented to store information and manage registrations and logins

For the visual and design part, I have used Bootstrap 5. This SPA has a responsive design.
<br/></br>
### Objective
Develop an application using the Rick & Morty public API from where users have been reached. 

This SPA has different spaces: main page, Home: to view all registered users, and accessing each of them, we can view their profile. At this point user have 2 options: 
 * send money to another user 
* deposit money in his own bank account.

