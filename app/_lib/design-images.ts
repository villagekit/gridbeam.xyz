// Static image imports for every design in `products/`.
//
// Built-time imports (Next.js + Webpack) give us hashed asset URLs and known
// dimensions per file. We bypass the global Cloudinary loader at the call
// site (`unoptimized={true}` on `<Image>`) so these locally-imported PNGs are
// served directly from `_next/static/media/`.
//
// When a new product is added under `products/<id>/<id>.png`,
// add the import + map entry here.

import type { StaticImageData } from 'next/image'

import _51213TriangleDesk from '../../products/5-12-13-triangle-desk/5-12-13-triangle-desk.png'
import babyChair from '../../products/baby-chair/baby-chair.png'
import babyLearningTower from '../../products/baby-learning-tower/baby-learning-tower.png'
import bedFrame from '../../products/bed-frame/bed-frame.png'
import bench from '../../products/bench/bench.png'
import bikeRack from '../../products/bike-rack/bike-rack.png'
import catCastle from '../../products/cat-castle/cat-castle.png'
import catShelves from '../../products/cat-shelves/cat-shelves.png'
import catTree from '../../products/cat-tree/cat-tree.png'
import chair from '../../products/chair/chair.png'
import clothesRack from '../../products/clothes-rack/clothes-rack.png'
import coatRack from '../../products/coat-rack/coat-rack.png'
import coffeeTable from '../../products/coffee-table/coffee-table.png'
import consoleTable from '../../products/console-table/console-table.png'
import garageWorkbench from '../../products/garage-workbench/garage-workbench.png'
import hangingShelves from '../../products/hanging-shelves/hanging-shelves.png'
import kidFort from '../../products/kid-fort/kid-fort.png'
import ladderShelf from '../../products/ladder-shelf/ladder-shelf.png'
import ladder from '../../products/ladder/ladder.png'
import lumberRack from '../../products/lumber-rack/lumber-rack.png'
import makersDesk from '../../products/makers-desk/makers-desk.png'
import makersWorkbench from '../../products/makers-workbench/makers-workbench.png'
import shelfTower from '../../products/shelf-tower/shelf-tower.png'
import shelvingUnit from '../../products/shelving-unit/shelving-unit.png'
import shoeRack from '../../products/shoe-rack/shoe-rack.png'
import sideTable from '../../products/side-table/side-table.png'
import signBoard from '../../products/sign-board/sign-board.png'
import stage from '../../products/stage/stage.png'
import stepStool from '../../products/step-stool/step-stool.png'
import stilts from '../../products/stilts/stilts.png'
import superTable from '../../products/super-table/super-table.png'
import utilityWorkbench from '../../products/utility-workbench/utility-workbench.png'
import wallShelf from '../../products/wall-shelf/wall-shelf.png'
import wallShelvesHorizontal from '../../products/wall-shelves-horizontal/wall-shelves-horizontal.png'
import wallShelvesVertical from '../../products/wall-shelves-vertical/wall-shelves-vertical.png'
import wardrobeOrganizer from '../../products/wardrobe-organizer/wardrobe-organizer.png'
import workTable from '../../products/work-table/work-table.png'

export const designImages: Record<string, StaticImageData> = {
  '5-12-13-triangle-desk': _51213TriangleDesk,
  'baby-chair': babyChair,
  'baby-learning-tower': babyLearningTower,
  'bed-frame': bedFrame,
  bench,
  'bike-rack': bikeRack,
  'cat-castle': catCastle,
  'cat-shelves': catShelves,
  'cat-tree': catTree,
  chair,
  'clothes-rack': clothesRack,
  'coat-rack': coatRack,
  'coffee-table': coffeeTable,
  'console-table': consoleTable,
  'garage-workbench': garageWorkbench,
  'hanging-shelves': hangingShelves,
  'kid-fort': kidFort,
  ladder,
  'ladder-shelf': ladderShelf,
  'lumber-rack': lumberRack,
  'makers-desk': makersDesk,
  'makers-workbench': makersWorkbench,
  'shelf-tower': shelfTower,
  'shelving-unit': shelvingUnit,
  'shoe-rack': shoeRack,
  'side-table': sideTable,
  'sign-board': signBoard,
  stage,
  'step-stool': stepStool,
  stilts,
  'super-table': superTable,
  'utility-workbench': utilityWorkbench,
  'wall-shelf': wallShelf,
  'wall-shelves-horizontal': wallShelvesHorizontal,
  'wall-shelves-vertical': wallShelvesVertical,
  'wardrobe-organizer': wardrobeOrganizer,
  'work-table': workTable,
}
