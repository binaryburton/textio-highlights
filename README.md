# How I solved this problem

I boiled this problem down to 2 problems to solve
1. Create a new highlights array that have no set-ranges that that cross over into other set-ranges, which is decided by each objects priorioty
2. Highlight the ranged characters with their corresponding colors

Both problems branched out into their own steps that needed to be solved one after another to complete each of the 2 problems

1a. Order highlights in ascending order based on the startOffset<br />
1b. Find all contradicting ranges starting from [0]<br />
1c. Resolve each range based on priority<br />
1d. Add id's to each highlight object for rending through an array with a proper key
I am now left with an array of highlight objects that have clean start and end offsets that don't spill into anyother offset range in the array, or order with ids

2a. Need to differentiate between highlighted text vs non-highlighted text<br />
2b. Create function that takes in a color and text and return a span element with style color in a single string<br />
2c. Reconstruct text with a loop, go through each highlight object in array, find normal text and call span-color function, and add to reconstructed text(string), until have one long string<br />
2d. Take string and render it to the html<br />

### DONE.


#### Render all manipulated highlights object
      {newHighlights.map((element) => (
        <div key={element.id}>
          {element.startOffset} -{element.endOffset} -{element.color} -
          {element.priority}
        </div>
      ))}