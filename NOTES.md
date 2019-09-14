# EZ grid beam

create a website like [Thingiverse](https://www.thingiverse.com/) for [Grid Beam](https://www.ocf.berkeley.edu/~mwilliams/reading/construction/How-to-Build-With-Grid-Beam.pdf) furniture ([example from 2013 me](https://www.thingiverse.com/thing:51228)).

sell Grid Beams by partnering with a local CNC manufacturing company, like [gridbeam.com](http://www.gridbeam.com/woodproducts.html)

why?

- Grid Beams are a square columns with holes drilled every width of the column, starting at a half width (so you can cut a beam in half and it is still compatible)
- Grid Beams are like Lego for adults, a protocol for re-configurable building parts using standard wood or metal materials
- Grid Beams are re-usable, no destructive screws, only easy bolts that anyone can assemble and disassemble
- Grid Beams allow you to evolve your furniture patterns as you needs change, your furniture is alive not dead

job stories:

- when i want to find furniture patterns,
  - i can browse patterns by tags, author, etc
  - i can search patterns based on name, description, tags, author, etc
- when i want to design a furniture pattern,
  - i can create a new pattern
  - i can fork an existing pattern
- when i want to "buy" a pattern,
  - i can order the necessary bundles of beams and accessories (attachments, plates)
  - i can pay for my order
  - i can set my delivery address
- when i want to manufacture Grid Beams,
  - i know what standard wood or metal materials are necessary to buy
  - i receive standard instructions and CAD files that are appropriate for my CNC machine

the pattern editor is basically a simplified 3d modeling program, that allows you to add, update, or remove beams on a grid.

---

TODO

build a landing page

- create grid beam renderer
  - input: beams, bolts, panels
  - use jscad-viewer or csg-viewer
- render examples
  - basic desk
  - corner desk
  - shelves
  - bed frame
  - corner desk with shelves and bed frame
- layout
  - hero
    - animation of re-configuring grid beam
  - values
    - adaptable, flexible
    - durable, re-usable
    - made locally
    - fun to use
  - explainer
  - examples
  - call to action

---

renderer

- threejs
  - example voxel painter: https://threejs.org/examples/#webgl_interactive_voxelpainter
- can we have a mesh for a single "block"
  - then link them together for a "beam"
- then have a mesh for a bolt
-
