// Universal function to standardize logs
import colors from "colors";

/**
 * Function that prints a formatted and colored message in the console.
 * @module log
 * @param {Object} logObject - The object containing the message and title to be printed.
 * @param {string} logObject.title - The custom title for the log.
 * @param {string} logObject.message - The message to be printed.
 * @param {"INFO"|"ERROR"|"SUCCESS"} level - The log level, which can be INFO, ERROR, or SUCCESS.
 * @returns {void} - The function does not return anything.
 * @default level - INFO
 * @requires colors - A module that allows adding colors to the text.
 * @example
 * // Example of using the log function
 * log({message: "Starting the application", title: "App Start"})
 * log({message: "Error connecting to the database", title: "DB Error"}, "error")
 * log({message: "User successfully registered", title: "Registration"}, "success")
 */
export default ({ title, message }, level = 'INFO') => {
    level = level.toUpperCase()

    const colorsMap = {
        'INFO': ({ message, title }) => { return colors.blue(`${title.bold}\n${message}\n`) },
        'ERROR': ({ message, title }) => { return colors.red(`${title.bold}\n${message}\n`) },
        'SUCCESS': ({ message, title }) => { return colors.green(`${title.bold}\n${message}\n`) },
    }

    console.log((colorsMap[level] ?? colorsMap['INFO'])({ message, title }))
}
