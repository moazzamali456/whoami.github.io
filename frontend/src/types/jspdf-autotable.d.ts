declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

declare module 'jspdf-autotable' {
  interface UserOptions {
    head?: any[][];
    body?: any[][];
    startY?: number;
    theme?: string;
    headStyles?: any;
    bodyStyles?: any;
    columnStyles?: any;
    margin?: any;
    pageBreak?: string;
    rowPageBreak?: string;
    tableWidth?: string;
  }
}
