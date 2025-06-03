"""
ROI Calculator für KI-Implementierung
Berechnungslogik und Datenmodell
"""

import json
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional
from enum import Enum

class Industry(Enum):
    MANUFACTURING = "Produktion"
    RETAIL = "Einzelhandel"
    FINANCE = "Finanzwesen"
    HEALTHCARE = "Gesundheitswesen"
    LOGISTICS = "Logistik"
    SERVICES = "Dienstleistungen"
    IT = "IT/Software"
    OTHER = "Sonstiges"

class CompanySize(Enum):
    SMALL = "Klein (1-50 Mitarbeiter)"
    MEDIUM = "Mittel (51-250 Mitarbeiter)"
    LARGE = "Groß (251-1000 Mitarbeiter)"
    ENTERPRISE = "Konzern (>1000 Mitarbeiter)"

@dataclass
class CompanyProfile:
    """Unternehmensprofil mit Grunddaten"""
    industry: Industry
    company_size: CompanySize
    monthly_revenue: float  # Monatlicher Umsatz in €
    employee_count: int
    avg_hourly_wage: float  # Durchschnittlicher Stundenlohn in € (inkl. Nebenkosten)

@dataclass
class CurrentSituation:
    """Aktuelle Situation des Unternehmens"""
    # Personalkosten und Produktivität
    weekly_hours_per_employee: float = 40.0
    manual_work_percentage: float = 30.0  # % der Zeit für manuelle Tätigkeiten
    
    # Operative Kennzahlen
    processing_time_per_task: float = 30.0  # Minuten pro Vorgang
    tasks_per_day: int = 50
    error_rate: float = 5.0  # Fehlerrate in %
    cost_per_error: float = 50.0  # Kosten pro Fehler in €
    
    # Kundenservice
    avg_response_time: float = 24.0  # Stunden
    customer_satisfaction: float = 70.0  # %
    support_tickets_per_month: int = 500
    
    # Weitere KPIs
    customer_acquisition_cost: float = 200.0  # €
    avg_customer_value: float = 1000.0  # €
    customer_retention_rate: float = 80.0  # %

@dataclass
class AIUseCase:
    """Definition eines KI-Use Cases"""
    id: str
    name: str
    category: str
    description: str
    setup_cost: float  # Einmalige Setup-Kosten in €
    monthly_cost: float  # Monatliche Kosten in €
    
    # Verbesserungspotenziale
    time_savings_percentage: float = 0.0  # % Zeitersparnis
    error_reduction_percentage: float = 0.0  # % Fehlerreduzierung
    productivity_increase: float = 0.0  # % Produktivitätssteigerung
    customer_satisfaction_increase: float = 0.0  # Prozentpunkte
    response_time_improvement: float = 0.0  # % Verbesserung
    conversion_rate_increase: float = 0.0  # Prozentpunkte
    
    # Anwendbarkeit nach Branche
    industry_fit: Dict[Industry, float] = None  # Fit-Score 0-1
    
    def __post_init__(self):
        if self.industry_fit is None:
            # Standard-Fit für alle Branchen
            self.industry_fit = {industry: 0.7 for industry in Industry}

class ROICalculator:
    """Hauptklasse für ROI-Berechnungen"""
    
    def __init__(self):
        self.use_cases = self._initialize_use_cases()
    
    def _initialize_use_cases(self) -> List[AIUseCase]:
        """Initialisiert alle verfügbaren KI-Use Cases"""
        return [
            AIUseCase(
                id="doc_processing",
                name="Intelligente Dokumentenverarbeitung",
                category="Automatisierung",
                description="Automatische Extraktion von Daten aus Rechnungen, Verträgen, E-Mails",
                setup_cost=10000,
                monthly_cost=350,
                time_savings_percentage=80,
                error_reduction_percentage=90,
                industry_fit={
                    Industry.FINANCE: 0.9,
                    Industry.HEALTHCARE: 0.8,
                    Industry.LOGISTICS: 0.8,
                    Industry.SERVICES: 0.7,
                    Industry.MANUFACTURING: 0.6,
                    Industry.RETAIL: 0.6,
                    Industry.IT: 0.7,
                    Industry.OTHER: 0.7
                }
            ),
            AIUseCase(
                id="workflow_automation",
                name="Workflow-Automatisierung",
                category="Automatisierung",
                description="Automatische Weiterleitung und Bearbeitung von Anfragen",
                setup_cost=17500,
                monthly_cost=550,
                time_savings_percentage=65,
                productivity_increase=40,
                industry_fit={
                    Industry.SERVICES: 0.9,
                    Industry.FINANCE: 0.8,
                    Industry.HEALTHCARE: 0.8,
                    Industry.IT: 0.9,
                    Industry.LOGISTICS: 0.7,
                    Industry.MANUFACTURING: 0.6,
                    Industry.RETAIL: 0.7,
                    Industry.OTHER: 0.7
                }
            ),
            AIUseCase(
                id="chatbot",
                name="Intelligenter Chatbot/Virtual Assistant",
                category="Kundeninteraktion",
                description="24/7 Kundensupport für häufige Anfragen",
                setup_cost=6500,
                monthly_cost=275,
                response_time_improvement=85,
                customer_satisfaction_increase=15,
                time_savings_percentage=70,
                industry_fit={
                    Industry.RETAIL: 0.9,
                    Industry.SERVICES: 0.9,
                    Industry.FINANCE: 0.8,
                    Industry.IT: 0.8,
                    Industry.HEALTHCARE: 0.7,
                    Industry.LOGISTICS: 0.6,
                    Industry.MANUFACTURING: 0.5,
                    Industry.OTHER: 0.7
                }
            ),
            AIUseCase(
                id="predictive_analytics",
                name="Predictive Analytics für Verkaufsprognosen",
                category="Datenanalyse",
                description="Vorhersage von Verkaufstrends und Nachfrage",
                setup_cost=21000,
                monthly_cost=650,
                productivity_increase=25,
                conversion_rate_increase=8,
                industry_fit={
                    Industry.RETAIL: 0.9,
                    Industry.MANUFACTURING: 0.8,
                    Industry.LOGISTICS: 0.8,
                    Industry.FINANCE: 0.7,
                    Industry.SERVICES: 0.6,
                    Industry.IT: 0.7,
                    Industry.HEALTHCARE: 0.5,
                    Industry.OTHER: 0.6
                }
            ),
            AIUseCase(
                id="personalized_recommendations",
                name="Personalisierte Produktempfehlungen",
                category="Kundeninteraktion",
                description="KI-basierte Empfehlungen für Cross-/Upselling",
                setup_cost=14000,
                monthly_cost=500,
                conversion_rate_increase=22,
                customer_satisfaction_increase=12,
                industry_fit={
                    Industry.RETAIL: 1.0,
                    Industry.SERVICES: 0.8,
                    Industry.FINANCE: 0.7,
                    Industry.IT: 0.6,
                    Industry.HEALTHCARE: 0.4,
                    Industry.LOGISTICS: 0.3,
                    Industry.MANUFACTURING: 0.3,
                    Industry.OTHER: 0.5
                }
            ),
            AIUseCase(
                id="automated_reporting",
                name="Automatisierte Berichtserstellung",
                category="Datenanalyse",
                description="KI-generierte Berichte und Dashboards",
                setup_cost=10500,
                monthly_cost=425,
                time_savings_percentage=90,
                productivity_increase=30,
                industry_fit={
                    Industry.FINANCE: 0.9,
                    Industry.MANUFACTURING: 0.8,
                    Industry.SERVICES: 0.8,
                    Industry.IT: 0.9,
                    Industry.HEALTHCARE: 0.7,
                    Industry.LOGISTICS: 0.7,
                    Industry.RETAIL: 0.7,
                    Industry.OTHER: 0.7
                }
            )
        ]
    
    def calculate_pain_score(self, situation: CurrentSituation) -> Dict[str, float]:
        """Berechnet Pain-Scores für verschiedene Bereiche"""
        pain_scores = {}
        
        # Effizienz-Pain
        efficiency_pain = (
            (situation.manual_work_percentage / 100) * 0.4 +
            (situation.processing_time_per_task / 60) * 0.3 +  # Normalisiert auf Stunden
            (situation.error_rate / 100) * 0.3
        )
        pain_scores["efficiency"] = min(efficiency_pain, 1.0)
        
        # Kundenservice-Pain
        customer_pain = (
            (situation.avg_response_time / 48) * 0.5 +  # Normalisiert auf 48h max
            ((100 - situation.customer_satisfaction) / 100) * 0.5
        )
        pain_scores["customer_service"] = min(customer_pain, 1.0)
        
        # Skalierungs-Pain (basierend auf Ticket-Volumen und Antwortzeit)
        scaling_pain = (
            (situation.support_tickets_per_month / 1000) * 0.6 +  # Normalisiert
            (situation.avg_response_time / 24) * 0.4
        )
        pain_scores["scaling"] = min(scaling_pain, 1.0)
        
        return pain_scores
    
    def recommend_use_cases(self, company: CompanyProfile, situation: CurrentSituation) -> List[Dict]:
        """Empfiehlt die besten 3 Use Cases basierend auf Pain Points und Branche"""
        pain_scores = self.calculate_pain_score(situation)
        recommendations = []
        
        for use_case in self.use_cases:
            # Branchenfit
            industry_fit = use_case.industry_fit.get(company.industry, 0.5)
            
            # Pain-Relevanz berechnen
            pain_relevance = 0.0
            if use_case.category == "Automatisierung":
                pain_relevance = pain_scores["efficiency"]
            elif use_case.category == "Kundeninteraktion":
                pain_relevance = pain_scores["customer_service"]
            elif use_case.category == "Datenanalyse":
                pain_relevance = (pain_scores["efficiency"] + pain_scores["scaling"]) / 2
            
            # Gesamtscore
            total_score = (industry_fit * 0.4 + pain_relevance * 0.6)
            
            recommendations.append({
                "use_case": use_case,
                "score": total_score,
                "industry_fit": industry_fit,
                "pain_relevance": pain_relevance
            })
        
        # Sortiere nach Score und gib Top 3 zurück
        recommendations.sort(key=lambda x: x["score"], reverse=True)
        return recommendations[:3]
    
    def calculate_roi(self, company: CompanyProfile, situation: CurrentSituation, 
                     use_case: AIUseCase, scenario: str = "realistic") -> Dict:
        """Berechnet ROI für einen spezifischen Use Case"""
        
        # Szenario-Multiplikatoren
        scenario_multipliers = {
            "conservative": 0.7,
            "realistic": 1.0,
            "optimistic": 1.3
        }
        multiplier = scenario_multipliers.get(scenario, 1.0)
        
        # Branchenfit berücksichtigen
        industry_fit = use_case.industry_fit.get(company.industry, 0.7)
        effectiveness = industry_fit * multiplier
        
        # Kosteneinsparungen berechnen
        annual_labor_cost = (company.employee_count * situation.weekly_hours_per_employee * 
                           52 * company.avg_hourly_wage)
        
        # Zeitersparnis
        time_savings = (use_case.time_savings_percentage / 100) * effectiveness
        annual_time_savings = annual_labor_cost * time_savings * (situation.manual_work_percentage / 100)
        
        # Fehlerreduzierung
        error_reduction = (use_case.error_reduction_percentage / 100) * effectiveness
        annual_error_savings = (situation.tasks_per_day * 365 * (situation.error_rate / 100) * 
                              error_reduction * situation.cost_per_error)
        
        # Produktivitätssteigerung
        productivity_gain = (use_case.productivity_increase / 100) * effectiveness
        annual_productivity_gain = annual_labor_cost * productivity_gain
        
        # Umsatzsteigerungen
        # Kundenservice-Verbesserung
        customer_improvement = (use_case.customer_satisfaction_increase / 100) * effectiveness
        retention_improvement = customer_improvement * 0.5  # Annahme: 50% der Zufriedenheit = Retention
        annual_retention_gain = (company.monthly_revenue * 12 * retention_improvement * 
                               (situation.customer_retention_rate / 100))
        
        # Conversion-Rate-Verbesserung
        conversion_improvement = (use_case.conversion_rate_increase / 100) * effectiveness
        annual_conversion_gain = company.monthly_revenue * 12 * conversion_improvement
        
        # Gesamtnutzen
        total_cost_savings = annual_time_savings + annual_error_savings + annual_productivity_gain
        total_revenue_increase = annual_retention_gain + annual_conversion_gain
        total_annual_benefit = total_cost_savings + total_revenue_increase
        
        # Investitionskosten
        total_investment = use_case.setup_cost + (use_case.monthly_cost * 12)
        
        # ROI-Kennzahlen
        roi_percentage = ((total_annual_benefit - total_investment) / total_investment) * 100
        payback_months = total_investment / (total_annual_benefit / 12) if total_annual_benefit > 0 else float('inf')
        
        return {
            "use_case_name": use_case.name,
            "scenario": scenario,
            "total_investment": total_investment,
            "setup_cost": use_case.setup_cost,
            "annual_operating_cost": use_case.monthly_cost * 12,
            "cost_savings": {
                "time_savings": annual_time_savings,
                "error_reduction": annual_error_savings,
                "productivity_gain": annual_productivity_gain,
                "total": total_cost_savings
            },
            "revenue_increase": {
                "retention_improvement": annual_retention_gain,
                "conversion_improvement": annual_conversion_gain,
                "total": total_revenue_increase
            },
            "total_annual_benefit": total_annual_benefit,
            "roi_percentage": roi_percentage,
            "payback_months": payback_months,
            "net_present_value_3_years": self._calculate_npv(total_annual_benefit, total_investment, 3, 0.08),
            "effectiveness_factor": effectiveness
        }
    
    def _calculate_npv(self, annual_benefit: float, initial_investment: float, 
                      years: int, discount_rate: float) -> float:
        """Berechnet den Nettobarwert (NPV)"""
        npv = -initial_investment
        for year in range(1, years + 1):
            npv += annual_benefit / ((1 + discount_rate) ** year)
        return npv
    
    def generate_comparison_report(self, company: CompanyProfile, situation: CurrentSituation,
                                 selected_use_cases: List[str]) -> Dict:
        """Generiert einen Vergleichsbericht für mehrere Use Cases"""
        results = {}
        
        for use_case_id in selected_use_cases:
            use_case = next((uc for uc in self.use_cases if uc.id == use_case_id), None)
            if use_case:
                # Berechne für alle drei Szenarien
                for scenario in ["conservative", "realistic", "optimistic"]:
                    key = f"{use_case_id}_{scenario}"
                    results[key] = self.calculate_roi(company, situation, use_case, scenario)
        
        return results

# Beispiel-Daten für Tests
def create_sample_data():
    """Erstellt Beispieldaten für Tests"""
    company = CompanyProfile(
        industry=Industry.SERVICES,
        company_size=CompanySize.MEDIUM,
        monthly_revenue=500000,
        employee_count=100,
        avg_hourly_wage=35
    )
    
    situation = CurrentSituation(
        weekly_hours_per_employee=40,
        manual_work_percentage=40,
        processing_time_per_task=45,
        tasks_per_day=80,
        error_rate=8,
        cost_per_error=75,
        avg_response_time=36,
        customer_satisfaction=65,
        support_tickets_per_month=800,
        customer_acquisition_cost=250,
        avg_customer_value=1500,
        customer_retention_rate=75
    )
    
    return company, situation

if __name__ == "__main__":
    # Test der Berechnungslogik
    calculator = ROICalculator()
    company, situation = create_sample_data()
    
    print("=== ROI Calculator Test ===")
    print(f"Unternehmen: {company.industry.value}, {company.company_size.value}")
    print(f"Mitarbeiter: {company.employee_count}, Umsatz: €{company.monthly_revenue:,.0f}/Monat")
    
    # Pain Score Analyse
    pain_scores = calculator.calculate_pain_score(situation)
    print(f"\nPain Scores:")
    for area, score in pain_scores.items():
        print(f"  {area}: {score:.2f}")
    
    # Use Case Empfehlungen
    recommendations = calculator.recommend_use_cases(company, situation)
    print(f"\nTop 3 Use Case Empfehlungen:")
    for i, rec in enumerate(recommendations, 1):
        print(f"  {i}. {rec['use_case'].name} (Score: {rec['score']:.2f})")
    
    # ROI Berechnung für Top Use Case
    top_use_case = recommendations[0]['use_case']
    roi_result = calculator.calculate_roi(company, situation, top_use_case)
    
    print(f"\nROI Analyse für '{top_use_case.name}':")
    print(f"  Investition: €{roi_result['total_investment']:,.0f}")
    print(f"  Jährlicher Nutzen: €{roi_result['total_annual_benefit']:,.0f}")
    print(f"  ROI: {roi_result['roi_percentage']:.1f}%")
    print(f"  Amortisation: {roi_result['payback_months']:.1f} Monate")
    print(f"  NPV (3 Jahre): €{roi_result['net_present_value_3_years']:,.0f}")

