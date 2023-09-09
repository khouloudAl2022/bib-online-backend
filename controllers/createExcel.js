
const Category = require("../models/category");
const exceljs = require("exceljs");
const path = require("path");
const fs = require("fs");

exports.downloadExcelFile = async (req, res) => {
  try {
    const categories = await Category.find().populate("listofbooks");

    //create a workbook excel
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Bibliotheque");

    //add headers comlumn
    worksheet.addRow(["Cat", "title", "Auteur", "Description"]);

    // parcourir through catégories and books for adding data to Excel file
    categories.forEach((categorie) => {
      categorie.listofbooks.forEach((livre) => {
        // Add data of every book in new line
        worksheet.addRow([
          categorie.nameCat,
          livre.title,
          livre.author,
          livre.desc,
        ]);
      });
    });

    //generate a new unique name of file for the download
    const fileName = "bibliotheque.xlsx";
    const filePath = path.join(__dirname, `../uploads/${fileName}`);

    //write excel file on disk
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error through downloading Excel file");
      } else {
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error through generating Excel file");
  }
};
