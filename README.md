# Cocktail Finder
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FMaurimura7%2FcocktailFinder%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/Maurimura7/cocktailFinder/goto?ref=master)
### Demo
You can find a live demo here: https://maurimura7.github.io/cocktailFinder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Libraries used

    - React
    - React-dom
    - Redux
    - React-redux
    - Redux-thunk
    - node-sass

## How the list can be more performant if has to manage a big amount of data?

We can use a technique called "windowing", with this technique, we only render a smaller subsete of the list rows at any given time. It also can reduce the time it takes to re-render the components as well as the number of DOM nodes created.

There are some libraries that can help whit that, such as [react-window](https://react-window.now.sh/).

More info can be found here: https://reactjs.org/docs/optimizing-performance.html#virtualize-long-lists