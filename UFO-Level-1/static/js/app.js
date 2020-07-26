// Starter Code
var tableData = data;

// Component vars
var $tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var searchDate = d3.select("#datetime");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Load data into web page
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = $tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column])
        )
    });
}

addData(tableData);

// Define click for table
button.on("click", () => {
    // Stop refresh
    d3.event.preventDefault();
    // Search table inputs
    var inputDate = searchDate.property("value").trim();
    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);
    
    $tbody.html("");

    let response = {
        filterDate
    }

    if(response.filterDate.length !== 0) {
        addData(filterDate);
    }
    
        else {
            $tbody.append("tr").append("td").text("No Sightings Found.");
        }
})