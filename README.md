# vue-slider-puzzle

![Netlify Status](https://api.netlify.com/api/v1/badges/daacd32a-9f63-4fb5-9fdc-a2289e9d3198/deploy-status)

You can see a live version of this app [in here](https://beautiful-flan-fc5c64.netlify.app/).
It's layout is designed for desktop use only.

## Description

Vue Slider Puzzle is an application created with Vue.js in which users can play a simple swap title game.
There are currently two images that can be picked.
Once the game starts, the selected image is sliced into a 3x3 grid and a timer starts.
The player can swap the tiles by clicking on the first and then the second title.
Once the shuffled titles are re-ordered as the original picture, the game is won.
This project is based on the Chapter 3 of the book Learn Vue.js by Example, written by John Au-Yeung.

## Tools used and concepts applied

This app was built for the purpose of applying tests with Vue.js.
Building a game is a good environment to apply unit tests.
There are several different execution flows and edge cases to be tested.
It uses Vue.js with the options API as the JS framework and plain CSS for the layout.
The test framework used is Jest.
There is no backend, so the game best times are stored in local storage.
While doing this project, I could practice unit tests, component tests, computed properties testing, test coverage, and local storage.

## Project setup

To run this project locally, download the repository and install the required dependencies:
```
npm install
```
A development version can be accessed via:
```
npm run serve
```