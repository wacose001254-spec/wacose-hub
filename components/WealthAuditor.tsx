"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileText, Download, Loader2 } from 'lucide-react';

export default function WealthAuditor() {
  const [generating, setGenerating] = useState(false);

  const generateReport = async () => {
    setGenerating(true);
    
    // 1. Fetch Transaction Data
    const { data: transactions } = await supabase
      .from('finances')
      .select('*')
      .order('created_at', { ascending: false });

    if (!transactions || transactions.length === 0) {
      alert("No data found to audit. Log some transactions first!");
      setGenerating(false);
      return;
    }

    // 2. Run the Math
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const fuelCost = transactions.filter(t => t.description.toLowerCase().includes('fuel')).reduce((acc, curr) => acc + curr.amount, 0);
    const netSavings = totalIncome - totalExpense;
    const landGoalProgress = (netSavings / 500000) * 100;

    // 3. Initialize PDF Engine
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Cinematic Header Section
    doc.setFillColor(30, 30, 30); // Deep Zinc
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("WACOSE OS: WEALTH AUDIT", 15, 25);
    doc.setFontSize(10);
    doc.text(`DATE GENERATED: ${date}`, 15, 32);

    // Summary Table
    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: 50,
      head: [['System Metric', 'Amount (KSh)']],
      body: [
        ['Total Fleet Income', totalIncome.toLocaleString()],
        ['Total Operating Expenses', totalExpense.toLocaleString()],
        ['Fuel Expenditure (Logistics)', fuelCost.toLocaleString()],
        ['Net Capital Savings', netSavings.toLocaleString()],
      ],
      headStyles: { fillColor: [37, 99, 235] }, // Wacose Blue
      theme: 'grid'
    });

    // Land Goal Progress Visual
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text("Land Acquisition Milestone", 15, finalY);
    
    // Draw Progress Bar Background
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(4);
    doc.line(15, finalY + 8, 195, finalY + 8);
    
    // Draw Actual Progress
    doc.setDrawColor(34, 197, 94); // Success Green
    const barWidth = 15 + (180 * (Math.min(landGoalProgress, 100) / 100));
    doc.line(15, finalY + 8, barWidth, finalY + 8);
    
    doc.setFontSize(10);
    doc.text(`${landGoalProgress.toFixed(1)}% of 500,000 KSh Goal Reached`, 15, finalY + 18);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Certified by Wacose OS - Nairobi Logistics Hub", 15, 285);

    // Save
    doc.save(`Wacose_Wealth_Audit_${date.replace(/\//g, '-')}.pdf`);
    setGenerating(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="text-blue-500" size={18} />
        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Wealth Auditor</h3>
      </div>
      <button 
        onClick={generateReport}
        disabled={generating}
        className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
      >
        {generating ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
        {generating ? "Auditing System..." : "Export Wealth Audit"}
      </button>
    </div>
  );
}