import { PDFDocument, rgb } from 'pdf-lib';

export default async (req, res) => {
  const { name, course } = req.body;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  const fontSize = 30;

  page.drawText(`Certificate of Completion`, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`This certifies that`, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(name, {
    x: 50,
    y: height - 8 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 1),
  });

  page.drawText(`has successfully completed the course`, {
    x: 50,
    y: height - 10 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(course, {
    x: 50,
    y: height - 12 * fontSize,
    size: fontSize,
    color: rgb(1, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
  res.send(Buffer.from(pdfBytes));
};
