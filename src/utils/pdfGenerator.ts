import { jsPDF } from 'jspdf';

export interface PdfExportOptions {
  title: string;
  draftText: string;
  templateId: string;
  metadata?: {
    reporterName?: string;
    location?: string;
    date?: string;
    authority?: string;
  };
}

/**
 * Generates a clean, professionally styled legal document PDF
 * and initiates an immediate browser download.
 */
export function exportDraftToPdf(options: PdfExportOptions): boolean {
  const { title, draftText, templateId, metadata } = options;

  // Create A4 PDF in portrait mode
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20; // 20mm margin
  const contentWidth = pageWidth - margin * 2; // 170mm

  // Generate Reference Number
  const timestamp = new Date();
  const dateStr = timestamp.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = timestamp.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const refCode = `PL-DRAFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  let currentY = margin;

  // Helper function to draw top header on a page
  const drawPageHeader = (isFirstPage: boolean) => {
    // Top banner bar
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(margin, currentY, contentWidth, 1.5, 'F');
    currentY += 6;

    if (isFirstPage) {
      // Organization / App branding
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('POCKET LAWYER LEGAL STUDIO', margin, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('CITIZEN LEGAL ASSISTANCE & DRAFTING SYSTEM', margin, currentY + 4);

      // Status badge on right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(5, 150, 105); // emerald-600
      doc.text('PRELIMINARY LEGAL DRAFT', pageWidth - margin, currentY, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`REF: ${refCode}  |  ${dateStr}`, pageWidth - margin, currentY + 4, { align: 'right' });

      currentY += 10;

      // Thin separator
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.4);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 7;

      // Main Document Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      const cleanTitle = (title || 'LEGAL REPORT DRAFT').toUpperCase();
      doc.text(cleanTitle, margin, currentY);
      currentY += 5;

      // Meta information if available
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const metaParts: string[] = [];
      if (metadata?.reporterName) metaParts.push(`Applicant/Complainant: ${metadata.reporterName}`);
      if (metadata?.location) metaParts.push(`Location: ${metadata.location}`);
      if (metadata?.date) metaParts.push(`Incident Date: ${metadata.date}`);

      if (metaParts.length > 0) {
        doc.text(metaParts.join('  •  '), margin, currentY);
        currentY += 5;
      }

      currentY += 3;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 8;
    } else {
      // Running header on continuation pages
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`${title.toUpperCase()}  (Continuation)`, margin, currentY);
      doc.text(`REF: ${refCode}`, pageWidth - margin, currentY, { align: 'right' });
      currentY += 4;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 7;
    }
  };

  // Helper function to draw footer
  const drawPageFooter = (pageNum: number, totalPages: number) => {
    const footerY = pageHeight - 12;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'NOTICE: Draft prepared for reference. Not an official filing until verified and signed by advocate/complainant.',
      margin,
      footerY
    );

    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerY, { align: 'right' });
  };

  // Draw first page header
  drawPageHeader(true);

  // Split text by lines and paragraphs
  const rawLines = draftText.split('\n');
  const lineHeight = 5.2; // mm

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59); // slate-800

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();

    // Check if new page is needed
    if (currentY + lineHeight > pageHeight - 22) {
      doc.addPage();
      currentY = margin;
      drawPageHeader(false);
    }

    if (!trimmed) {
      // Empty line / paragraph gap
      currentY += lineHeight * 0.7;
      continue;
    }

    // Identify headings or section headers
    const isHeading =
      /^(SECTION|PART|ANNEXURE|MEMORANDUM|COMPLAINT|SUBJECT|STATEMENT|RELIEF|PRAYER|VERIFICATION|PRAYER CLAUSE|GROUNDS|FACTS|DETAILS)/i.test(
        trimmed
      ) ||
      (trimmed.length < 55 && trimmed === trimmed.toUpperCase() && !trimmed.includes('. '));

    const isSubHeader =
      /^(To,|From,|Date:|Place:|Subject:|Ref:|Case:)/i.test(trimmed) ||
      /^([0-9]+\.|\([a-z]\)|\([0-9]+\))\s+[A-Z]/.test(trimmed);

    if (isHeading) {
      if (currentY + lineHeight * 2 > pageHeight - 22) {
        doc.addPage();
        currentY = margin;
        drawPageHeader(false);
      }
      currentY += 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);

      // Light background pill for major sections
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin - 1, currentY - 3.8, contentWidth + 2, 6, 1, 1, 'F');

      doc.text(trimmed, margin + 1, currentY);
      currentY += lineHeight + 2;

      // Reset to body font
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
    } else if (isSubHeader) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);

      const wrapped = doc.splitTextToSize(rawLine, contentWidth);
      for (const line of wrapped) {
        if (currentY + lineHeight > pageHeight - 22) {
          doc.addPage();
          currentY = margin;
          drawPageHeader(false);
        }
        doc.text(line, margin, currentY);
        currentY += lineHeight;
      }

      doc.setFont('helvetica', 'normal');
    } else {
      // Normal paragraph text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      const wrapped = doc.splitTextToSize(rawLine, contentWidth);
      for (const line of wrapped) {
        if (currentY + lineHeight > pageHeight - 22) {
          doc.addPage();
          currentY = margin;
          drawPageHeader(false);
        }
        doc.text(line, margin, currentY);
        currentY += lineHeight;
      }
    }
  }

  // Add Verification / Signature block at the end if space permits, or new page
  if (currentY + 28 > pageHeight - 22) {
    doc.addPage();
    currentY = margin;
    drawPageHeader(false);
  }

  currentY += 8;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // Signature columns
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('VERIFICATION & SIGNATURE:', margin, currentY);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Date of Generation: ' + dateStr + ' ' + timeStr, margin, currentY);
  doc.text('Drafted via: Pocket Lawyer Studio', margin, currentY + 4);

  doc.text('Signature of Applicant / Deponent', pageWidth - margin, currentY + 6, {
    align: 'right',
  });
  doc.setDrawColor(148, 163, 184);
  doc.line(pageWidth - margin - 50, currentY + 4, pageWidth - margin, currentY + 4);

  // Second pass: Draw page footers with accurate total page count
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawPageFooter(i, totalPages);
  }

  // Trigger browser download
  const safeFilename = `${templateId || 'legal'}-draft-report-${timestamp.getFullYear()}${(
    timestamp.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}.pdf`;

  doc.save(safeFilename);
  return true;
}
