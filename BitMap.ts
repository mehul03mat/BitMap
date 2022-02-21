class BitMap {

    /**
     * computes the distance from the nearest white pixel
     * @param rows 
     * @param cols 
     * @param grid 
     * @returns 
     */
    calculateDistance(rows:number,cols:number,grid:number[][]) : number[][] { 
        const solution:number[][] = this.createMatrix(rows, cols, Number.MAX_VALUE);

        const targetPositions:MatrixPosition[] = this.findAllWhitePositions(grid);

        this.setPositionsToValue(solution, targetPositions, 0);

        const searchQueue:MatrixPosition[] = [...targetPositions];
        while (searchQueue.length > 0) {
            const position:MatrixPosition = searchQueue.shift()!;
            const neighbors:MatrixPosition[] = this.findNeighbors(rows, cols, position);

            for (const neighbor of neighbors) {
                const distance:number = this.getDistance(position, neighbor);
                const totalDistance:number = solution[position.row][position.col] + distance;
                if (totalDistance < solution[neighbor.row][neighbor.col]) {
                    solution[neighbor.row][neighbor.col] = totalDistance;
                    searchQueue.push(neighbor);
                }
            }
        }
        return solution;
    }

    /**
     * Calculates the distance between two positions
     * @param pos1
     * @param pos2 
     * @returns 
     */
    getDistance(pos1:MatrixPosition,pos2:MatrixPosition) : number {
        return Math.abs(pos1.row - pos2.row)+Math.abs(pos1.col - pos2.col);
    }

    /**
    * Finds all points where value is white in the matrix.
    * @param matrix
    * @param value
    */
    findAllWhitePositions(matrix:number[][]): MatrixPosition[] {
        const positions:MatrixPosition[] = [];
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[0].length; col++) {
                if (matrix[row][col] === 1) {
                    positions.push(new MatrixPosition(row, col));
                }
            }
        }
        return positions;
    }

    /**
    * Creates a rows x cols matrix initialized to a value
    * @param rows
    * @param cols
    * @param initialValue
    */
    createMatrix(rows: number,cols: number,initialValue: number): number[][] {
        const matrix:number[][] = [];
        for (let row = 0; row < rows; row++) {
            const row:number[] = [];
            for (let col = 0; col < cols; col++) {
                row.push(initialValue);
            }
            matrix.push(row);
        }
        return matrix;
    }

    /**
    * Sets positions in matrix to value.
    * Does not check bounds.
    * Mutates original matrix.
    *
    * @param matrix
    * @param positions
    * @param value
    */
    setPositionsToValue(matrix:number[][],positions:MatrixPosition[],value:number):void {
        for (const { row, col } of positions) {
            matrix[row][col] = value;
        }
    }

    /**
    * Finds all neighbors around a matrix position.
    * 
    * @param rows
    * @param cols
    * @param pos
    */
    findNeighbors(rows:number,cols:number,pos:MatrixPosition): MatrixPosition[] {
        const neighbors:MatrixPosition[] = [];
        const dirx:number[]=[-1,1,0,0];
        const diry:number[]=[0,0,-1,1];
        for(var i:number=0;i<4;i++) {
            if(pos.row+dirx[i] >=0 && pos.row+dirx[i]<rows && pos.col+diry[i] >=0 && pos.col+diry[i]<cols) {
                neighbors.push(new MatrixPosition(pos.row+dirx[i],pos.col+diry[i]));
            }
        }
        return neighbors;
    }
}

class MatrixPosition {
    row:number;
    col:number;
    constructor(row:number, col:number) {
        this.row=row;
        this.col=col;
    }
}

class TestBitmap {
    

    static testCases():void {
        const bitMap:BitMap = new BitMap();
        
        var matrix:number[][]=[
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        var solution = bitMap.calculateDistance(3,3,matrix);
        var expexted:number[][]=[
            [2,1,2],
            [1,0,1],
            [2,1,2]
        ];
        if(TestBitmap.arraysAreIdentical(solution,expexted)) {
            console.log("Basic test passed");
        } else {
            console.log("Basic test failed");
        }

        matrix= [
            [1, 1],
            [1, 1]
        ];
        var solution = bitMap.calculateDistance(2,2,matrix);
        var expexted:number[][]=[
            [0,0],
            [0,0]
        ];
        if(TestBitmap.arraysAreIdentical(solution,expexted)) {
            console.log("All 1s test passed");
        } else {
            console.log("All 1s test failed");
        }

        matrix= [[0, 0, 0, 0, 0, 1]];
        var solution = bitMap.calculateDistance(1,6,matrix);
        var expexted:number[][]=[
            [5,4,3,2,1,0]
        ];
        if(TestBitmap.arraysAreIdentical(solution,expexted)) {
            console.log("Single row test passed");
        } else {
            console.log("Single row test failed");
        }

        matrix= [[0], [0], [0], [0], [0], [1]];
        var solution = bitMap.calculateDistance(6,1,matrix);
        var expexted:number[][]=[[5], [4], [3], [2], [1], [0]];
        if(TestBitmap.arraysAreIdentical(solution,expexted)) {
            console.log("Single col test passed");
        } else {
            console.log("Single col test failed");
        }

        matrix= [
            [0, 0],
            [0, 0]
        ];
        var solution = bitMap.calculateDistance(2,2,matrix);
        var expexted:number[][]=[
            [Number.MAX_VALUE,Number.MAX_VALUE],
            [Number.MAX_VALUE,Number.MAX_VALUE]
        ];
        if(TestBitmap.arraysAreIdentical(solution,expexted)) {
            console.log("all 0s test passed");
        } else {
            console.log("all 0s test failed");
        }
    }

    static arraysAreIdentical(array1:number[][], array2:number[][]){
        return JSON.stringify(array1) === JSON.stringify(array2)
    }

}

TestBitmap.testCases();