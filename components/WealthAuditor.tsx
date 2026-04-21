"use client";
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, Landmark, TrendingUp } from 'lucide-react';

interface WealthAuditorProps {
  totalSavings: number;
}

export default function WealthAuditor({ totalSavings }: WealthAuditorProps) {
  
  const targetGoal = 500000;
  const progressPercent = Math.min((totalSavings / targetGoal) * 100, 100);

  const generatePDF = async () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // 1. BRANDING & HEADER
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("WACOSE OS", 14, 22);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("WEALTH AUDIT | SYSTEM PERFORMANCE REPORT", 14, 30);
    doc.text(`TIMESTAMP: ${date} ${time}`, 140, 30);

    // 2. SUMMARY DATA TABLE
    autoTable(doc, {
      startY: 50,
      head: [['CAPITAL METRIC', 'SPECIFICATION', 'VALUE (KSh)']],
      body: [
        ['Current Liquidity', 'Total Logged Savings', totalSavings.toLocaleString()],
        ['Asset Target', 'Nairobi Land Acquisition', targetGoal.toLocaleString()],
        ['Funding Gap', 'Remaining Requirement', (targetGoal - totalSavings).toLocaleString()],
      ],
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      theme: 'grid',
    });

    // 3. PROGRESS VISUALIZATION
    const finalY = (doc as any).lastAutoTable.finalY + 25;
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("STRATEGIC GOAL PROGRESS", 14, finalY);
    
    // Progress Bar Background
    doc.setDrawColor(230, 230, 230);
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(14, finalY + 5, 180, 12, 2, 2, 'FD');
    
    // Progress Bar Fill
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(14, finalY + 5, (180 * (progressPercent / 100)), 12, 2, 2, 'F');

    // Percentage Text
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text(`${progressPercent.toFixed(1)}%`, 14, finalY + 28);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`ESTIMATED COMPLETION: Q4 2026`, 14, finalY + 35);

    // 4. FOOTER NOTE
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic"); // ✅ The correct way to set italic style
doc.text("Confidential Logistics Performance Data - Wacose Courier Services Hub.", 14, 285);

    doc.save(`Wacose_Wealth_Audit_${date.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Visual Indicator of Progress inside the card */}
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
        <div className="flex items-center gap-1">
          <TrendingUp size={12} className="text-blue-500" />
          <span>Efficiency Projection</span>
        </div>
        <span className="text-white">{progressPercent.toFixed(1)}%</span>
      </div>

      <button 
        onClick={generatePDF}
        className="group relative w-full py-4 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300"
      >
        <Download size={16} className="text-blue-500 group-hover:text-white transition-colors" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 group-hover:text-white transition-colors">
          Export Wealth Audit
        </span>
        
        {/* Subtle Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>

      <p className="text-[8px] text-zinc-600 text-center uppercase tracking-tighter">
        Target: KSh 500,000 for Nairobi Land Deed
      </p>
    </div>
  );
}