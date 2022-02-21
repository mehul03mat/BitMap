var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BitMap = /** @class */ (function () {
    function BitMap() {
    }
    /**
     * computes the distance from the nearest white pixel
     * @param rows
     * @param cols
     * @param grid
     * @returns
     */
    BitMap.prototype.calculateDistance = function (rows, cols, grid) {
        var solution = this.createMatrix(rows, cols, Number.MAX_VALUE);
        var targetPositions = this.findAllWhitePositions(grid);
        this.setPositionsToValue(solution, targetPositions, 0);
        var searchQueue = __spreadArray([], targetPositions, true);
        while (searchQueue.length > 0) {
            var position = searchQueue.shift();
            var neighbors = this.findNeighbors(rows, cols, position);
            for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
                var neighbor = neighbors_1[_i];
                var distance = this.getDistance(position, neighbor);
                var totalDistance = solution[position.row][position.col] + distance;
                if (totalDistance < solution[neighbor.row][neighbor.col]) {
                    solution[neighbor.row][neighbor.col] = totalDistance;
                    searchQueue.push(neighbor);
                }
            }
        }
        return solution;
    };
    /**
     * Calculates the distance between two positions
     * @param pos1
     * @param pos2
     * @returns
     */
    BitMap.prototype.getDistance = function (pos1, pos2) {
        return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col);
    };
    /**
    * Finds all points where value is white in the matrix.
    * @param matrix
    * @param value
    */
    BitMap.prototype.findAllWhitePositions = function (matrix) {
        var positions = [];
        for (var row = 0; row < matrix.length; row++) {
            for (var col = 0; col < matrix[0].length; col++) {
                if (matrix[row][col] === 1) {
                    positions.push(new MatrixPosition(row, col));
                }
            }
        }
        return positions;
    };
    /**
    * Creates a rows x cols matrix initialized to a value
    * @param rows
    * @param cols
    * @param initialValue
    */
    BitMap.prototype.createMatrix = function (rows, cols, initialValue) {
        var matrix = [];
        for (var row = 0; row < rows; row++) {
            var row_1 = [];
            for (var col = 0; col < cols; col++) {
                row_1.push(initialValue);
            }
            matrix.push(row_1);
        }
        return matrix;
    };
    /**
    * Sets positions in matrix to value.
    * Does not check bounds.
    * Mutates original matrix.
    *
    * @param matrix
    * @param positions
    * @param value
    */
    BitMap.prototype.setPositionsToValue = function (matrix, positions, value) {
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var _a = positions_1[_i], row = _a.row, col = _a.col;
            matrix[row][col] = value;
        }
    };
    /**
    * Finds all neighbors around a matrix position.
    *
    * @param rows
    * @param cols
    * @param pos
    */
    BitMap.prototype.findNeighbors = function (rows, cols, pos) {
        var neighbors = [];
        var dirx = [-1, 1, 0, 0];
        var diry = [0, 0, -1, 1];
        for (var i = 0; i < 4; i++) {
            if (pos.row + dirx[i] >= 0 && pos.row + dirx[i] < rows && pos.col + diry[i] >= 0 && pos.col + diry[i] < cols) {
                neighbors.push(new MatrixPosition(pos.row + dirx[i], pos.col + diry[i]));
            }
        }
        return neighbors;
    };
    return BitMap;
}());
var MatrixPosition = /** @class */ (function () {
    function MatrixPosition(row, col) {
        this.row = row;
        this.col = col;
    }
    return MatrixPosition;
}());
var TestBitmap = /** @class */ (function () {
    function TestBitmap() {
    }
    TestBitmap.testCases = function () {
        var bitMap = new BitMap();
        var matrix = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        var solution = bitMap.calculateDistance(3, 3, matrix);
        var expexted = [
            [2, 1, 2],
            [1, 0, 1],
            [2, 1, 2]
        ];
        if (TestBitmap.arraysAreIdentical(solution, expexted)) {
            console.log("Basic test passed");
        }
        else {
            console.log("Basic test failed");
        }
        matrix = [
            [1, 1],
            [1, 1]
        ];
        var solution = bitMap.calculateDistance(2, 2, matrix);
        var expexted = [
            [0, 0],
            [0, 0]
        ];
        if (TestBitmap.arraysAreIdentical(solution, expexted)) {
            console.log("All 1s test passed");
        }
        else {
            console.log("All 1s test failed");
        }
        matrix = [[0, 0, 0, 0, 0, 1]];
        var solution = bitMap.calculateDistance(1, 6, matrix);
        var expexted = [
            [5, 4, 3, 2, 1, 0]
        ];
        if (TestBitmap.arraysAreIdentical(solution, expexted)) {
            console.log("Single row test passed");
        }
        else {
            console.log("Single row test failed");
        }
        matrix = [[0], [0], [0], [0], [0], [1]];
        var solution = bitMap.calculateDistance(6, 1, matrix);
        var expexted = [[5], [4], [3], [2], [1], [0]];
        if (TestBitmap.arraysAreIdentical(solution, expexted)) {
            console.log("Single col test passed");
        }
        else {
            console.log("Single col test failed");
        }
        matrix = [
            [0, 0],
            [0, 0]
        ];
        var solution = bitMap.calculateDistance(2, 2, matrix);
        var expexted = [
            [Number.MAX_VALUE, Number.MAX_VALUE],
            [Number.MAX_VALUE, Number.MAX_VALUE]
        ];
        if (TestBitmap.arraysAreIdentical(solution, expexted)) {
            console.log("all 0s test passed");
        }
        else {
            console.log("all 0s test failed");
        }
    };
    TestBitmap.arraysAreIdentical = function (array1, array2) {
        return JSON.stringify(array1) === JSON.stringify(array2);
    };
    return TestBitmap;
}());
TestBitmap.testCases();
