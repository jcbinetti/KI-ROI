// ROI Calculator Logic - JavaScript Version
// Converted from Python for React frontend

export const Industry = {
  MANUFACTURING: "Produktion",
  RETAIL: "Einzelhandel", 
  FINANCE: "Finanzwesen",
  HEALTHCARE: "Gesundheitswesen",
  LOGISTICS: "Logistik",
  SERVICES: "Dienstleistungen",
  IT: "IT/Software",
  OTHER: "Sonstiges"
};

export const CompanySize = {
  SMALL: "Klein (1-50 Mitarbeiter)",
  MEDIUM: "Mittel (51-250 Mitarbeiter)",
  LARGE: "Groß (251-1000 Mitarbeiter)",
  ENTERPRISE: "Konzern (>1000 Mitarbeiter)"
};

export const aiUseCases = [
  {
    id: "doc_processing",
    name: "Intelligente Dokumentenverarbeitung",
    category: "Automatisierung",
    description: "Automatische Extraktion von Daten aus Rechnungen, Verträgen, E-Mails",
    setupCost: 10000,
    monthlyCost: 350,
    timeSavingsPercentage: 40,
    errorReductionPercentage: 60,
    productivityIncrease: 0,
    customerSatisfactionIncrease: 0,
    responseTimeImprovement: 0,
    conversionRateIncrease: 0,
    industryFit: {
      [Industry.FINANCE]: 0.9,
      [Industry.HEALTHCARE]: 0.8,
      [Industry.LOGISTICS]: 0.8,
      [Industry.SERVICES]: 0.7,
      [Industry.MANUFACTURING]: 0.6,
      [Industry.RETAIL]: 0.6,
      [Industry.IT]: 0.7,
      [Industry.OTHER]: 0.7
    }
  },
  {
    id: "workflow_automation",
    name: "Workflow-Automatisierung",
    category: "Automatisierung",
    description: "Automatische Weiterleitung und Bearbeitung von Anfragen",
    setupCost: 17500,
    monthlyCost: 550,
    timeSavingsPercentage: 30,
    errorReductionPercentage: 0,
    productivityIncrease: 20,
    customerSatisfactionIncrease: 0,
    responseTimeImprovement: 0,
    conversionRateIncrease: 0,
    industryFit: {
      [Industry.SERVICES]: 0.9,
      [Industry.FINANCE]: 0.8,
      [Industry.HEALTHCARE]: 0.8,
      [Industry.IT]: 0.9,
      [Industry.LOGISTICS]: 0.7,
      [Industry.MANUFACTURING]: 0.6,
      [Industry.RETAIL]: 0.7,
      [Industry.OTHER]: 0.7
    }
  },
  {
    id: "chatbot",
    name: "Intelligenter Chatbot/Virtual Assistant",
    category: "Kundeninteraktion",
    description: "24/7 Kundensupport für häufige Anfragen",
    setupCost: 6500,
    monthlyCost: 275,
    timeSavingsPercentage: 35,
    errorReductionPercentage: 0,
    productivityIncrease: 0,
    customerSatisfactionIncrease: 8,
    responseTimeImprovement: 50,
    conversionRateIncrease: 0,
    industryFit: {
      [Industry.RETAIL]: 0.9,
      [Industry.SERVICES]: 0.9,
      [Industry.FINANCE]: 0.8,
      [Industry.IT]: 0.8,
      [Industry.HEALTHCARE]: 0.7,
      [Industry.LOGISTICS]: 0.6,
      [Industry.MANUFACTURING]: 0.5,
      [Industry.OTHER]: 0.7
    }
  },
  {
    id: "predictive_analytics",
    name: "Predictive Analytics für Verkaufsprognosen",
    category: "Datenanalyse",
    description: "Vorhersage von Verkaufstrends und Nachfrage",
    setupCost: 21000,
    monthlyCost: 650,
    timeSavingsPercentage: 0,
    errorReductionPercentage: 0,
    productivityIncrease: 15,
    customerSatisfactionIncrease: 0,
    responseTimeImprovement: 0,
    conversionRateIncrease: 3,
    industryFit: {
      [Industry.RETAIL]: 0.9,
      [Industry.MANUFACTURING]: 0.8,
      [Industry.LOGISTICS]: 0.8,
      [Industry.FINANCE]: 0.7,
      [Industry.SERVICES]: 0.6,
      [Industry.IT]: 0.7,
      [Industry.HEALTHCARE]: 0.5,
      [Industry.OTHER]: 0.6
    }
  },
  {
    id: "personalized_recommendations",
    name: "Personalisierte Produktempfehlungen",
    category: "Kundeninteraktion",
    description: "KI-basierte Empfehlungen für Cross-/Upselling",
    setupCost: 14000,
    monthlyCost: 500,
    timeSavingsPercentage: 0,
    errorReductionPercentage: 0,
    productivityIncrease: 0,
    customerSatisfactionIncrease: 5,
    responseTimeImprovement: 0,
    conversionRateIncrease: 8,
    industryFit: {
      [Industry.RETAIL]: 1.0,
      [Industry.SERVICES]: 0.8,
      [Industry.FINANCE]: 0.7,
      [Industry.IT]: 0.6,
      [Industry.HEALTHCARE]: 0.4,
      [Industry.LOGISTICS]: 0.3,
      [Industry.MANUFACTURING]: 0.3,
      [Industry.OTHER]: 0.5
    }
  },
  {
    id: "automated_reporting",
    name: "Automatisierte Berichtserstellung",
    category: "Datenanalyse",
    description: "KI-generierte Berichte und Dashboards",
    setupCost: 10500,
    monthlyCost: 425,
    timeSavingsPercentage: 50,
    errorReductionPercentage: 0,
    productivityIncrease: 15,
    customerSatisfactionIncrease: 0,
    responseTimeImprovement: 0,
    conversionRateIncrease: 0,
    industryFit: {
      [Industry.FINANCE]: 0.9,
      [Industry.MANUFACTURING]: 0.8,
      [Industry.SERVICES]: 0.8,
      [Industry.IT]: 0.9,
      [Industry.HEALTHCARE]: 0.7,
      [Industry.LOGISTICS]: 0.7,
      [Industry.RETAIL]: 0.7,
      [Industry.OTHER]: 0.7
    }
  }
];

export class ROICalculator {
  calculatePainScore(situation) {
    const painScores = {};
    
    // Effizienz-Pain
    const efficiencyPain = (
      (situation.manualWorkPercentage / 100) * 0.4 +
      (Math.min(situation.processingTimePerTask / 60, 2) / 2) * 0.3 +
      (situation.errorRate / 100) * 0.3
    );
    painScores.efficiency = Math.min(efficiencyPain, 1.0);
    
    // Kundenservice-Pain
    const customerPain = (
      Math.min(situation.avgResponseTime / 48, 1) * 0.5 +
      ((100 - situation.customerSatisfaction) / 100) * 0.5
    );
    painScores.customerService = Math.min(customerPain, 1.0);
    
    // Skalierungs-Pain
    const scalingPain = (
      Math.min(situation.supportTicketsPerMonth / 2000, 1) * 0.6 +
      Math.min(situation.avgResponseTime / 24, 1) * 0.4
    );
    painScores.scaling = Math.min(scalingPain, 1.0);
    
    return painScores;
  }
  
  recommendUseCases(company, situation) {
    const painScores = this.calculatePainScore(situation);
    const recommendations = [];
    
    for (const useCase of aiUseCases) {
      // Branchenfit
      const industryFit = useCase.industryFit[company.industry] || 0.5;
      
      // Pain-Relevanz berechnen
      let painRelevance = 0.0;
      if (useCase.category === "Automatisierung") {
        painRelevance = painScores.efficiency;
      } else if (useCase.category === "Kundeninteraktion") {
        painRelevance = painScores.customerService;
      } else if (useCase.category === "Datenanalyse") {
        painRelevance = (painScores.efficiency + painScores.scaling) / 2;
      }
      
      // Gesamtscore
      const totalScore = industryFit * 0.4 + painRelevance * 0.6;
      
      recommendations.push({
        useCase,
        score: totalScore,
        industryFit,
        painRelevance
      });
    }
    
    // Sortiere nach Score und gib Top 3 zurück
    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, 3);
  }
  
  calculateROI(company, situation, useCase, scenario = "realistic") {
    // Szenario-Multiplikatoren
    const scenarioMultipliers = {
      conservative: 0.6,
      realistic: 1.0,
      optimistic: 1.4
    };
    const multiplier = scenarioMultipliers[scenario] || 1.0;
    
    // Branchenfit berücksichtigen
    const industryFit = useCase.industryFit[company.industry] || 0.7;
    const effectiveness = industryFit * multiplier;
    
    // Betroffene Mitarbeiter
    const affectedEmployees = Math.floor(company.employeeCount * (situation.affectedEmployeesPercentage / 100));
    
    // Kosteneinsparungen berechnen
    const annualLaborCostAffected = affectedEmployees * situation.weeklyHoursPerEmployee * 52 * company.avgHourlyWage;
    
    // Zeitersparnis
    const timeSavingsFactor = (useCase.timeSavingsPercentage / 100) * effectiveness;
    const manualWorkFactor = situation.manualWorkPercentage / 100;
    const annualTimeSavings = annualLaborCostAffected * timeSavingsFactor * manualWorkFactor;
    
    // Fehlerreduzierung
    const errorReductionFactor = (useCase.errorReductionPercentage / 100) * effectiveness;
    const affectedTasksPerYear = situation.tasksPerDay * 365 * (affectedEmployees / company.employeeCount);
    const annualErrorSavings = affectedTasksPerYear * (situation.errorRate / 100) * errorReductionFactor * situation.costPerError;
    
    // Produktivitätssteigerung
    const productivityFactor = (useCase.productivityIncrease / 100) * effectiveness * 0.5;
    const annualProductivityGain = annualLaborCostAffected * productivityFactor;
    
    // Umsatzsteigerungen
    const customerImprovementFactor = (useCase.customerSatisfactionIncrease / 100) * effectiveness;
    const retentionImprovement = customerImprovementFactor * 0.2;
    const annualRetentionGain = company.monthlyRevenue * 12 * retentionImprovement * 0.1;
    
    const conversionImprovementFactor = (useCase.conversionRateIncrease / 100) * effectiveness;
    const annualConversionGain = company.monthlyRevenue * 12 * conversionImprovementFactor * 0.05;
    
    // Gesamtnutzen
    const totalCostSavings = annualTimeSavings + annualErrorSavings + annualProductivityGain;
    const totalRevenueIncrease = annualRetentionGain + annualConversionGain;
    const totalAnnualBenefit = totalCostSavings + totalRevenueIncrease;
    
    // Investitionskosten
    const totalInvestment = useCase.setupCost + (useCase.monthlyCost * 12);
    
    // ROI-Kennzahlen
    const roiPercentage = totalInvestment > 0 ? ((totalAnnualBenefit - totalInvestment) / totalInvestment) * 100 : 0;
    const paybackMonths = totalAnnualBenefit > 0 ? totalInvestment / (totalAnnualBenefit / 12) : Infinity;
    
    return {
      useCaseName: useCase.name,
      scenario,
      affectedEmployees,
      totalInvestment,
      setupCost: useCase.setupCost,
      annualOperatingCost: useCase.monthlyCost * 12,
      costSavings: {
        timeSavings: annualTimeSavings,
        errorReduction: annualErrorSavings,
        productivityGain: annualProductivityGain,
        total: totalCostSavings
      },
      revenueIncrease: {
        retentionImprovement: annualRetentionGain,
        conversionImprovement: annualConversionGain,
        total: totalRevenueIncrease
      },
      totalAnnualBenefit,
      roiPercentage,
      paybackMonths,
      netPresentValue3Years: this.calculateNPV(totalAnnualBenefit, totalInvestment, 3, 0.08),
      effectivenessFactor: effectiveness
    };
  }
  
  calculateNPV(annualBenefit, initialInvestment, years, discountRate) {
    let npv = -initialInvestment;
    for (let year = 1; year <= years; year++) {
      npv += annualBenefit / Math.pow(1 + discountRate, year);
    }
    return npv;
  }
}

