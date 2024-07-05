function getStdFormat(tableId) {
    // Get the table element by ID
    let table = document.getElementById(tableId);

    if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        return '';
    }
    let std = '';

    // Loop through each row in the table
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];

        // Loop through each cell in the row (skipping header cells)
        for (let j = 1; j < row.cells.length; j++) {
            let cell = row.cells[j];

            // Append the text content of the cell to the concatenatedText
            std += cell.textContent.trim();
        }

        std += '_';
    }

    return std.substring(0, std.length-1);
}

const std_format = document.getElementById("input-std-format");
std_format.innerText = getStdFormat("input-table");