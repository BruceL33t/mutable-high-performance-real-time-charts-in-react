# mutable-high-performance-real-time-charts-in-react
Just a desperate attempt to try and avoid sacrificing MobX mutability while updating a chart in real-time.
In the end you end up having to give up on the React-way, by using a ref to the chart to obtain access to 
the internal APi of the chart lib.

And even that seems to perform even worse than copying the entire array, passing it by prop to the Chart
component and letting React do the re-render..?

**Development** mode:
- clone
- npm install
- npm start to run the app

**Production** mode:

- clone
- npm install
- npm run build
- npm install -g serve
- serve -s build

