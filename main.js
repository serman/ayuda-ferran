const width = 900;
const height = 700;
const margin = { top: 0, left: 0, right: 0, bottom: 0 };
var svg = null;
document.addEventListener("DOMContentLoaded", function () {
  // cuando la página se carga, carga el archivo csv con los datos
  initD3Canvas(); //creamos el canvas SVG
  d3.csv("data/linst.csv", (row) => {
    // Esto convierte cada fila en un dato del archivo json
    row.id = row.organisation + "_" + row.language;
    row.name = row.language;
    row.words = parseFloat(row.words);
    row.documents = parseInt(row.documents);
    row.transition_words = parseFloat(row.transition_words);
    row.transition_percentage = parseFloat(row.transition_percentage);
    return row;
  }).then((data) => {
    // aquí ya tenemos los datos del CSV
    console.log(data); // echa un ojo a la consola para ver los datos ya convertidos a formato JSON
    // vamos a pintar algo con los datos
    // primero hacemos una escala que va a convertir los datos de "words" a pixels El dato mas pequeño van a ser 10 pixels el dato mayor van a ser 100 pixels
    const sizeScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.words)) // esto busca el número mayor y menor del array mirando el campo words
      .range([10, 30]);
    const pInit = {
      x: 100,
      y: 100,
    }
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d, i) => pInit.x + i * 90)
      .attr("cy", pInit.y)
      .attr("r", (d) => sizeScale(d.words))
      .attr("fill", "#333")
    svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d, i) => pInit.x/2 + i * 90)
      .attr("y", pInit.y+100)
      .text((d) => d.name+'-'+d.organisation)
      .attr("fill", "#300");
    
  });
});

function initD3Canvas() {
  svg = d3
    .select("#treemap_container") // busca un elemento html con el id treemap_container
    .append("svg") // le añade un canvas svg con el tamaño
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // en este grupo g es en el que pintaremos
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}
