import * as ExcelJs from 'exceljs';
import { saveAs } from "file-saver";

const DEFAULT_COLUMN_WIDTH = 20;

export function saveWorkbook(workbook, fileName) {
    // 导出文件
    workbook.xlsx.writeBuffer().then((data => {
        const blob = new Blob([data], { type: '' });
        saveAs(blob, fileName);
    }))
}

export function generateHeaders(columns) {
    return columns.map(col => {
        const obj = {
            header: col.title,
            key: col.dataIndex,
            width: col.width / 5 || DEFAULT_COLUMN_WIDTH,
        };
        return obj;
    })
}

export const richText2Plain = (list, theme, gid) => {

    list[0].theme = theme
    list[0].gid = gid
    return list
}

export const toExcel = (columns, list, theme, gid) => {

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('demo sheet');
    worksheet.properties.defaultRowHeight = 20;
    worksheet.columns = generateHeaders(columns);
    let rows = worksheet.addRows(richText2Plain(list, theme, gid));
    let headerRow = worksheet.getRow(1);
    let allRows = [headerRow].concat(rows)
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '#eeeeee1'},
    }
    allRows.forEach(row => {
        row.font = {
            size: 11,
            name: '微软雅黑',
        };
        row.alignment = {vertical: 'middle', horizontal: 'left', wrapText: false,};
    })
    worksheet.mergeCells(2, 1, list.length + 1, 1);
    worksheet.mergeCells(2, 2, list.length + 1, 2);
    saveWorkbook(workbook, 'simple-demo.xlsx');

}