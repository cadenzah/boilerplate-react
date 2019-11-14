# React Project Bolierplate

## Features

- Redux
  - `redux-thunk`
- React Router
- Code Splitting
  - Create a Component, `import` it in `/pages/index.js` using `withSplitting()`
- Environment Variables
  - Set it in `webpack.config.js`
- Webpack Dev Server
- Storybook for React
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

## How to run **Storybook**

1. Run `npm run storybook`
2. Visit Storybook UI (Automatically opens)

## Update Report

### v1.2 (2019-11-14)
- added comments with core logic explanations
- added `redux-thunk`, loaders for style
- added **Storybook** features

### v1.1 (2019-11-11)
- added `redux` basic sample codes
- changed directory structures

### v1.0 (2019-11-9)
Initial boilerplate checkout
