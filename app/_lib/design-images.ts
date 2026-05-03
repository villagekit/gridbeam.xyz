// Static image imports for every design in `gridkit-products/products/`.
//
// Built-time imports (Next.js + Webpack) give us hashed asset URLs and known
// dimensions per file. We bypass the global Cloudinary loader at the call
// site (`unoptimized={true}` on `<Image>`) so these locally-imported PNGs are
// served directly from `_next/static/media/`.
//
// When a new product is added under `gridkit-products/products/<id>/<id>.png`,
// add the import + map entry here.

import type { StaticImageData } from 'next/image'

import _51213TriangleDesk from '../../gridkit-products/products/5-12-13-triangle-desk/5-12-13-triangle-desk.png'
import babyChair from '../../gridkit-products/products/baby-chair/baby-chair.png'
import babyLearningTower from '../../gridkit-products/products/baby-learning-tower/baby-learning-tower.png'
import bedFrame from '../../gridkit-products/products/bed-frame/bed-frame.png'
import bench from '../../gridkit-products/products/bench/bench.png'
import bikeRack from '../../gridkit-products/products/bike-rack/bike-rack.png'
import catCastle from '../../gridkit-products/products/cat-castle/cat-castle.png'
import catShelves from '../../gridkit-products/products/cat-shelves/cat-shelves.png'
import catTree from '../../gridkit-products/products/cat-tree/cat-tree.png'
import chair from '../../gridkit-products/products/chair/chair.png'
import clothesRack from '../../gridkit-products/products/clothes-rack/clothes-rack.png'
import coatRack from '../../gridkit-products/products/coat-rack/coat-rack.png'
import coffeeTable from '../../gridkit-products/products/coffee-table/coffee-table.png'
import consoleTable from '../../gridkit-products/products/console-table/console-table.png'
import garageWorkbench from '../../gridkit-products/products/garage-workbench/garage-workbench.png'
import hangingShelves from '../../gridkit-products/products/hanging-shelves/hanging-shelves.png'
import kidFort from '../../gridkit-products/products/kid-fort/kid-fort.png'
import ladderShelf from '../../gridkit-products/products/ladder-shelf/ladder-shelf.png'
import ladder from '../../gridkit-products/products/ladder/ladder.png'
import lumberRack from '../../gridkit-products/products/lumber-rack/lumber-rack.png'
import makersDesk from '../../gridkit-products/products/makers-desk/makers-desk.png'
import makersWorkbench from '../../gridkit-products/products/makers-workbench/makers-workbench.png'
import shelfTower from '../../gridkit-products/products/shelf-tower/shelf-tower.png'
import shelvingUnit from '../../gridkit-products/products/shelving-unit/shelving-unit.png'
import shoeRack from '../../gridkit-products/products/shoe-rack/shoe-rack.png'
import sideTable from '../../gridkit-products/products/side-table/side-table.png'
import signBoard from '../../gridkit-products/products/sign-board/sign-board.png'
import stage from '../../gridkit-products/products/stage/stage.png'
import stepStool from '../../gridkit-products/products/step-stool/step-stool.png'
import stilts from '../../gridkit-products/products/stilts/stilts.png'
import superTable from '../../gridkit-products/products/super-table/super-table.png'
import utilityWorkbench from '../../gridkit-products/products/utility-workbench/utility-workbench.png'
import wallShelf from '../../gridkit-products/products/wall-shelf/wall-shelf.png'
import wallShelvesHorizontal from '../../gridkit-products/products/wall-shelves-horizontal/wall-shelves-horizontal.png'
import wallShelvesVertical from '../../gridkit-products/products/wall-shelves-vertical/wall-shelves-vertical.png'
import wardrobeOrganizer from '../../gridkit-products/products/wardrobe-organizer/wardrobe-organizer.png'
import workTable from '../../gridkit-products/products/work-table/work-table.png'

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
