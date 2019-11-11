# React Project Bolierplate

## Features

- Redux
  - `redux-thunk`
  - `redux-saga`
- React Router
- Code Splitting
  - Create a Component, `import` it in `/pages/index.js` using `withSplitting()`
- Environment Variables
  - Set it in `webpack.config.js`
- Webpack Dev Server
- Other optimizations when building

## Index

- `/components` for presentational unit components
  - `/base` for large components
  - `/common` for minimal component unit
    - `index.js`
    - `component.css`
    - `component.test.js`
- `/containers` for container components
- `/pages` for page per each routings
  - All routings indexed in `App.js`
- `/utils` for utility functions
- `/redux` for redux store and reducers settings in Ducks pattern

## How to build

1. Run `npm run build`
2. Use a build output from `/build` directory

## How to run `webpack-dev-server`

1. Run `npm run dev`
2. Visit `http://localhost:3000` (Automatically opens)

## Update Report

### v1.1 (2019-11-11)
- added `redux` basic sample codes
- changed directory structures

### v1.0 (2019-11-9)
Initial boilerplate checkout
