// from data.js
var tableData = data;

// Component vars
var resetButton = d3.select("#reset-btn");
var filterButton = d3.select("#filter-btn");
var inputDate = d3.select("#datetime");
var searchCity = d3.select("#inputGroupsearchCity");
var searchState = d3.select("#inputGroupsearchState");
var searchShape = d3.select("#inputGroupsearchShape");

// List cities, states, shapes for search boxes
const distinctCities = [...new Set(tableData.map(x => x.city))].sort();
const distinctStates = [...new Set(tableData.map(x => x.state))].sort();
const distinctShapes = [...new Set(tableData.map(x => x.shape))].sort();

// Loop through array/each object
function loadTableData(tableData) {
    // Clear tbody
    d3.select("tbody").selectAll("tr").remove();
    // Loop through data
    tableData.forEach((rowData) => {
        // Table row
        var trData = d3.select("tbody").append("tr");
        // Get the entries for each object in the array and create table data
        Object.values(rowData).forEach(value => trData.append("td").text(`${value}`));
    });
};

// Create search function
function selectFilter(rowData) {
    // Search Date
    var result = (new Date(rowData.datetime)).getTime() >= (new Date(inputDate.property("value"))).getTime();
    // Search City
    if (searchCity.property("value") != "All") {
        result = (result && (rowData.city === searchCity.property("value")));
    };
    // Search State
    if (searchState.property("value") != "All") {
        result = (result && (rowData.state === searchState.property("value")));
    };
    // Search Shape
    if (searchShape.property("value") != "All") {
        result = (result && (rowData.shape === searchShape.property("value")));
    };
    return result;
};

// Define click for table
filterButton.on("click", function() {
    // Stop refresh
    d3.event.preventDefault();
    // Search table inputs
    var filterTableData = tableData.filter(selectFilter);  
    // Reload data
    loadTableData(filterTableData);
});

// Define click for search reset
resetButton.on("click", function() {
    /// Stop refresh
    d3.event.preventDefault();
    // Reset search date
    inputDate.property("value", "1/1/2010");
    // Clear search inputs
    var elements = document.getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++) {
        elements[i].selectedIndex = 0;
    };
});

// Load components
function initComponents() {
    // Load input group for city
    distinctCities.forEach((city) => {
        searchCity.append("option").text(`${city}`);
    });
    // Load input group state
    distinctStates.forEach((state) => {
        searchState.append("option").text(`${state}`);
    });
    // Load input group for shape
    distinctShapes.forEach((shape) => {
        searchShape.append("option").text(`${shape}`);
    });
    // Load table data
    loadTableData(tableData);
};

// Initialize
initComponents();