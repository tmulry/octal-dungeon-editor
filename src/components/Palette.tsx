import TileGrid from '@/components/TileGrid.vue'
import { reactive, watch, defineComponent, PropType } from 'vue'
import { TileData } from '@/types/tile-data'
import { makeGrid, clearGridSelection, changeToolSet } from '@/utils/useTiles'
import { DataStore } from '@/types/store'

const Palette = defineComponent({
  name: 'Palette',
  props: {
    dataStore: {
      type: Object as PropType<DataStore>,
      required: true,
    },
  },
  setup(props) {
    const { store, methods } = props.dataStore
    const toolSetRows = 8
    const toolSetColumns = 8

    const initToolSet = () => {
      return makeGrid(
        toolSetColumns,
        toolSetRows,
        (rowIdx: number, colIdx: number): TileData => ({
          selected: rowIdx === colIdx && colIdx === 0,
          visible: true,
          tileSet: store.activeToolSet.tileSet,
          tileType: `${colIdx}${rowIdx}`,
        })
      )
    }

    const toolSet = reactive(initToolSet())

    watch(
      () => store.activeToolSet.tileSet,
      (newTileSet, oldTileSet) => {
        changeToolSet(toolSet, newTileSet)
      }
    )

    const clickedTile = (coords: { y: number; x: number }, data: TileData) => {
      clearGridSelection(toolSet)
      toolSet[coords.y][coords.x].selected = true
      methods.setSelectedTileType(data.tileType ? [data.tileType] : undefined)
    }

    methods.setSelectedTileType(['00'])

    return () => (
      <div>
        <TileGrid
          numRows={toolSetRows}
          numCols={toolSetColumns}
          rows={toolSet}
          onTileClicked={clickedTile}
        />
      </div>
    )
  },
})
// // todo use this method for a custom cursor? https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/

export default Palette
