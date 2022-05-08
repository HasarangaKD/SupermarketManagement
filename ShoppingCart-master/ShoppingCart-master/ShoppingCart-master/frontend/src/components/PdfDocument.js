import React, { Component } from 'react'
import jsPDF from 'jspdf';

export default class PdfDocument extends Component {
    pdfGenerate = () => {
        var doc = new jsPDF('landscape','px','a4','false');
        doc.setFont('Helvertica','bold');
        doc.text(60,60,'Name');
        doc.text(60,80,'Email');
        doc.text(60,100,'Email');

        doc.save('a.pdf');
    }

  render() {
    return (
      <div>
          <button className='btn btn-primary' onClick={this.pdfGenerate}>Download PDF</button>
      </div>
    )
  }
}
