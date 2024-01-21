export default function (hexColor) {
    if (String(hexColor).startsWith('#')) {
        return parseInt(String(hexColor).slice(1), 16)
    }

    return parseInt(hexColor, 16)
}