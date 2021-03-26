const path = require('path')
const xlsx = require('xlsx')
class ExportController {
  constructor() {

  }
  readFile(req, res) {
    const workbook = xlsx.readFile(
      path.join(__dirname.replace('controllers', 'exports'), 'template_laporan_survey.xlsx')
    )
    const isiExcelJson = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet3);
    isiExcelJson.push({
      no : 1,
      nama : "Imal",
      responden : "esikat\r\nesirup"
    })
    xlsx.utils.sheet_add_json(workbook.Sheets.Sheet3, isiExcelJson)
    xlsx.writeFile(workbook, "test.xlsx")
    res.send("Cek Console bray")
  }
}

module.exports = new ExportController()