export class UtilIT {

    static parseTable() {
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
    
    }
    
    static name(params) {
        document.getElementById("input-table");
    }

}