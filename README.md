# Feast It
Feast It Frontend Dev Project
------------------------------

My Bookmark app is a single page application built in React. I chose to use Webpack to bundle my modules into a single script file and SASS to style my app.

The process I used to build this was to first identify what my components were in the app. In this case I broke it down into a component for the Heading, a component to display the list of bookmarks, a reusable Button component for the buttons, a component to add a bookmark and a parent container to render them and hold the state and the code to process the events.

With these identified I next put the components together without any functionality and styled them to create the UI. Once I was happy with the UI, I then added functionality to the components to handle the events. To complete the app I used a Node module to validate the URL entered.

A challenge I faced was using the BEM naming convention when styling my app. This was my first attempt to using this best practise so I naturally found it a bit challenging. I also had some small bugs that handles the delete & edit events but I was able to identify them without too much trouble.
