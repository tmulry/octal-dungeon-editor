import { TileData } from "@/types/tile-data";
// import { reactive } from "vue";

export const makeGrid = (height: number, width: number, callback?: (rowIdx: number, colIdx: number) => TileData): TileData[][] => {
    const grid: TileData[][] = [];
    for (let i = 0; i < height; i++) {
        grid.push([]);
        for (let j = 0; j < width; j++) {
            const defaultTileData: TileData = {
                visible: false,
                selected: false,
                tileSet: "",
                tileType: undefined,
            };
            const tileData = callback ? callback(i, j) : defaultTileData;
            grid[i].push(tileData);
        }
    }
    return grid;
}

export const updateGrid = (grid: TileData[][], callback: (rowIdx: number, colIdx: number, oldValue: TileData) => TileData): void => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = callback(i, j, grid[i][j]);
        }
    }
}


export const clearGridSelection = (grid: TileData[][]): void => {
    updateGrid(grid, (rowIdx, colIdx, oldValue) => {
        return { ...oldValue,
            selected: false
        }
    });
}

export const changeToolSet = (grid: TileData[][], newToolSet?: string): void => {
    updateGrid(grid, (rowIdx, colIdx, oldValue) => {
        return { ...oldValue,
            tileSet: newToolSet
        }
    });
}
