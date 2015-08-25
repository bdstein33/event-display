# Practice Event App

### Overview

This app enables users to add events and set invite counts.  Events can be sorted/filtered in a variety of different ways.  Users can also click on specific days on a calendar to see all the events occuring that day that aren't cancelled.

### Technologies

I used Angular for my front end framework.  After thinking through the design and realizing that I was going to be doing a lot of filtering/sorting, I thought Angular would be my best bet for quickly throwing a prototype together.

Since I viewed this as more of a front end design/UX assignment, I decided to use Firebase for my database.  Although it is expensive to scale, Firebase is a great tool for quickly setting up a non-relational data (this app has no relational data). I was also able to avoid setting up and deploying my own server/data base which enabled me to focus more on the interface itself.  Another added benefit to Firebase is the real-time data binding.  Using AngularFire, I was able to quickly and easily establish three-way data binding between Firebase, my modal, and my view.

###