Create a React component `SolarPanelOverImage` (or a better name)
Component have a prop: the url endpoint or the id of the data

Reactive states:
  - data
  - loading state

On mount:
  - get the data.

Early returns for missing data and loading

Extract image size

Create a canva of image size with the image as background
For each solar panel position:
    draw the polygon on the canva using given coordinates

Returns the canva JSX

Could use react-konva