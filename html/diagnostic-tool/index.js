import palette from "google-palette";
import embed  from "vega-embed";
const dataForge = require('data-forge');

const data = require('./wayback_vs_2011_census_diagnostics-by-scrape.json')
const df = new dataForge.DataFrame(data);
const universities = df.distinct(row => row.place).select(row => [
    row.place,
    row.suspicious,
    row.scraped_count_by_2011_count
]).toArray() 
let makeDiagnosticPlotForUniversity = univ => {
    let dc = df.where(row => row.place == univ)
    let rows = dc.toArray()
    let websites = dc.distinct(row => row.scraped_url).getSeries('scraped_url').toArray()
    let websitesIndex = websites.reduce((dict, elt, ix) => (dict[elt] = ix, dict), {})
    let seq = palette('tol', websites.length);

    let diagnosticPlot = {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
        title: `Diagnostic plot for ${univ}`,
        description: 'A plot that shows the baseline number of faculty from a 2011 manual census, and the number of parsed faculty for each scrape from the wayback machine.',
        width: 600,
        height: 600,
        data: { values: rows },
        layer: [
            { // The diamond that shows the count of all TT and non-TT faculty
              // in the scrape
                mark: {
                    type: 'point',
                    size: 50,
                    shape: 'diamond',
                },
                encoding: {
                    x: {
                        timeUnit: 'year',
                        field: 'dt',
                        type: 'temporal',
                        axis: { title: "Year" }
                    },
                    y: {
                        field: 'dept_size_scrape_all',
                        type: 'quantitative',
                        axis: {
                            title: 'Scraped dept size'
                        }
                    },
                    color: {
                        field: 'scraped_url',
                        type: 'nominal',
                    },
                    href: {
                        field: 'directory',
                        type: 'nominal',
                    }
                },
            },
            { // The square that shows the count of only TT faculty
                mark: 'square',
                encoding: {
                    x: {
                        timeUnit: 'year',
                        field: 'dt',
                        type: 'temporal'
                    },
                    y: {
                        field: 'dept_size_scrape_tt',
                        type: 'quantitative',
                        axis: { title: null }
                    },
                    color: {
                        field: 'scraped_url',
                        type: 'nominal',
                    },
                    href: {
                        field: 'directory',
                        type: 'nominal',
                    }
                },
            },
            {// The line that connects the counts of TT faculty
                mark: 'line',
                encoding: {
                    x: {
                        timeUnit: 'year',
                        field: 'dt',
                        type: 'temporal'
                    },
                    y: {
                        field: 'dept_size_scrape_tt',
                        type: 'quantitative',
                        axis: { title: null }
                    }
                },
            },
            { // The horizontal line for the 2011 scrape
                mark: 'rule',
                mark: {
                    type: 'rule',
                    strokeDash: [6, 4]
                },
                encoding: {
                    y: {
                        field: 'num_faculty2011',
                        type: 'quantitative',
                        axis: { title: null }
                    }
                },
            },
            { // The vertical line connecting the TT and all points.
                mark: {
                    type: 'rule',
                    strokeDash: [1]
                },
                encoding: {
                    x: {
                        timeUnit: 'year',
                        field: 'dt',
                        type: 'temporal'
                    },
                    y: {
                        field: 'dept_size_scrape_tt',
                        type: 'quantitative',
                        axis: { title: null }
                    },
                    y2: {
                        field: 'dept_size_scrape_all',
                        type: 'quantitative',
                        axis: { title: null }
                    },
                },
            }
        ]
    };

    return diagnosticPlot;
}

let plotUniversity = univ => {
    let plot = makeDiagnosticPlotForUniversity(univ)
    embed('#plot', plot);
}

plotUniversity('Dartmouth College')

let links = document.getElementById("links")

universities.map(row => {
    let univ = row[0]
    let suspicious = row[1]
    let ratio = row[2]

    let linkBlock = document.createElement('div')
    let link = document.createElement('a')
    let cls = "univ-link"
    if (suspicious) {
        cls += " suspicious"
    }
    link.text = univ
    //link.text = `${univ} (ratio: ${ratio})`
    link.className = cls
    link.onclick = () => plotUniversity(univ)
    linkBlock.appendChild(link)
    links.appendChild(linkBlock);
});

