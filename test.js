import colors from "colors"
import { table } from 'table';

const config = {
    columns: [
        { alignment: 'center', }
    ],
    spanningCells: [
        { col: 0, row: 0, colSpan: 2 },
        { col: 0, row: 4, colSpan: 2 },
    ]
}

const data = [
    ['Info'.blue.bold, ''],
    ['Status:'.cyan, 'Online'.green],
    ['Name:'.cyan, 'Bot'.yellow],
    ['Guilds:'.cyan, '2'.yellow],
    ['Loaded'.blue.bold, ''],
    ['Commands:'.cyan, 'test.js, setup.js'.yellow.italic],
    ['Events:'.cyan, 'ready.js, interactionCreate.js'.yellow.italic]
]

console.log(table(data, config))