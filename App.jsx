import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, Users, DollarSign, Clock, Target, BarChart3, Lightbulb } from 'lucide-react';
import { Industry, CompanySize, ROICalculator } from './lib/roiCalculator';
import './App.css';

const roiCalculator = new ROICalculator();

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyProfile, setCompanyProfile] = useState({
    industry: '',
    companySize: '',
    monthlyRevenue: '',
    employeeCount: '',
    avgHourlyWage: ''
  });
  
  const [currentSituation, setCurrentSituation] = useState({
    weeklyHoursPerEmployee: 40,
    manualWorkPercentage: 30,
    affectedEmployeesPercentage: 50,
    processingTimePerTask: 30,
    tasksPerDay: 50,
    errorRate: 5,
    costPerError: 50,
    avgResponseTime: 24,
    customerSatisfaction: 70,
    supportTicketsPerMonth: 500,
    customerAcquisitionCost: 200,
    avgCustomerValue: 1000,
    customerRetentionRate: 80
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [selectedUseCases, setSelectedUseCases] = useState([]);
  const [roiResults, setRoiResults] = useState({});
  const [painScores, setPainScores] = useState({});

  const handleCompanyProfileChange = (field, value) => {
    setCompanyProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSituationChange = (field, value) => {
    setCurrentSituation(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const analyzeCompany = () => {
    if (!companyProfile.industry || !companyProfile.employeeCount) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    const company = {
      industry: companyProfile.industry,
      companySize: companyProfile.companySize,
      monthlyRevenue: parseFloat(companyProfile.monthlyRevenue) || 0,
      employeeCount: parseInt(companyProfile.employeeCount) || 0,
      avgHourlyWage: parseFloat(companyProfile.avgHourlyWage) || 35
    };

    const painScores = roiCalculator.calculatePainScore(currentSituation);
    setPainScores(painScores);

    const recs = roiCalculator.recommendUseCases(company, currentSituation);
    setRecommendations(recs);
    
    setCurrentStep(2);
  };

  const selectUseCase = (useCase) => {
    if (selectedUseCases.find(uc => uc.id === useCase.id)) {
      setSelectedUseCases(prev => prev.filter(uc => uc.id !== useCase.id));
    } else if (selectedUseCases.length < 3) {
      setSelectedUseCases(prev => [...prev, useCase]);
    }
  };

  const calculateROI = () => {
    if (selectedUseCases.length === 0) {
      alert('Bitte wählen Sie mindestens einen Use Case aus.');
      return;
    }

    const company = {
      industry: companyProfile.industry,
      companySize: companyProfile.companySize,
      monthlyRevenue: parseFloat(companyProfile.monthlyRevenue) || 0,
      employeeCount: parseInt(companyProfile.employeeCount) || 0,
      avgHourlyWage: parseFloat(companyProfile.avgHourlyWage) || 35
    };

    const results = {};
    selectedUseCases.forEach(useCase => {
      ['conservative', 'realistic', 'optimistic'].forEach(scenario => {
        const key = `${useCase.id}_${scenario}`;
        results[key] = roiCalculator.calculateROI(company, currentSituation, useCase, scenario);
      });
    });

    setRoiResults(results);
    setCurrentStep(3);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const getPainColor = (score) => {
    if (score < 0.3) return 'text-green-600';
    if (score < 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPainLabel = (score) => {
    if (score < 0.3) return 'Niedrig';
    if (score < 0.6) return 'Mittel';
    return 'Hoch';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">KI ROI-Rechner</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berechnen Sie den Return on Investment für KI-Implementierungen in Ihrem Unternehmen
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Fortschritt</span>
            <span className="text-sm font-medium text-gray-700">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        {/* Step 1: Company Profile */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-600" />
                  Unternehmensprofil
                </CardTitle>
                <CardDescription>
                  Geben Sie grundlegende Informationen über Ihr Unternehmen ein
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry">Branche *</Label>
                    <Select value={companyProfile.industry} onValueChange={(value) => handleCompanyProfileChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie Ihre Branche" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(Industry).map(([key, value]) => (
                          <SelectItem key={key} value={value}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="companySize">Unternehmensgröße</Label>
                    <Select value={companyProfile.companySize} onValueChange={(value) => handleCompanyProfileChange('companySize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie die Unternehmensgröße" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CompanySize).map(([key, value]) => (
                          <SelectItem key={key} value={value}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="employeeCount">Anzahl Mitarbeiter *</Label>
                    <Input
                      id="employeeCount"
                      type="number"
                      placeholder="z.B. 100"
                      value={companyProfile.employeeCount}
                      onChange={(e) => handleCompanyProfileChange('employeeCount', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthlyRevenue">Monatlicher Umsatz (€)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      placeholder="z.B. 500000"
                      value={companyProfile.monthlyRevenue}
                      onChange={(e) => handleCompanyProfileChange('monthlyRevenue', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="avgHourlyWage">Durchschnittlicher Stundenlohn (€)</Label>
                    <Input
                      id="avgHourlyWage"
                      type="number"
                      placeholder="z.B. 35"
                      value={companyProfile.avgHourlyWage}
                      onChange={(e) => handleCompanyProfileChange('avgHourlyWage', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">Inkl. Nebenkosten</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                  Aktuelle Situation
                </CardTitle>
                <CardDescription>
                  Beschreiben Sie die aktuellen Herausforderungen in Ihrem Unternehmen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="manualWorkPercentage">Anteil manueller Tätigkeiten (%)</Label>
                    <Input
                      id="manualWorkPercentage"
                      type="number"
                      value={currentSituation.manualWorkPercentage}
                      onChange={(e) => handleSituationChange('manualWorkPercentage', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="affectedEmployeesPercentage">Betroffene Mitarbeiter (%)</Label>
                    <Input
                      id="affectedEmployeesPercentage"
                      type="number"
                      value={currentSituation.affectedEmployeesPercentage}
                      onChange={(e) => handleSituationChange('affectedEmployeesPercentage', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="processingTimePerTask">Bearbeitungszeit pro Vorgang (Min)</Label>
                    <Input
                      id="processingTimePerTask"
                      type="number"
                      value={currentSituation.processingTimePerTask}
                      onChange={(e) => handleSituationChange('processingTimePerTask', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tasksPerDay">Vorgänge pro Tag</Label>
                    <Input
                      id="tasksPerDay"
                      type="number"
                      value={currentSituation.tasksPerDay}
                      onChange={(e) => handleSituationChange('tasksPerDay', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="errorRate">Fehlerrate (%)</Label>
                    <Input
                      id="errorRate"
                      type="number"
                      value={currentSituation.errorRate}
                      onChange={(e) => handleSituationChange('errorRate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="costPerError">Kosten pro Fehler (€)</Label>
                    <Input
                      id="costPerError"
                      type="number"
                      value={currentSituation.costPerError}
                      onChange={(e) => handleSituationChange('costPerError', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="avgResponseTime">Durchschnittliche Antwortzeit (h)</Label>
                    <Input
                      id="avgResponseTime"
                      type="number"
                      value={currentSituation.avgResponseTime}
                      onChange={(e) => handleSituationChange('avgResponseTime', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="customerSatisfaction">Kundenzufriedenheit (%)</Label>
                    <Input
                      id="customerSatisfaction"
                      type="number"
                      value={currentSituation.customerSatisfaction}
                      onChange={(e) => handleSituationChange('customerSatisfaction', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="supportTicketsPerMonth">Support-Tickets pro Monat</Label>
                    <Input
                      id="supportTicketsPerMonth"
                      type="number"
                      value={currentSituation.supportTicketsPerMonth}
                      onChange={(e) => handleSituationChange('supportTicketsPerMonth', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={analyzeCompany} size="lg" className="px-8">
                <TrendingUp className="h-5 w-5 mr-2" />
                Analyse starten
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Use Case Selection */}
        {currentStep === 2 && (
          <div className="max-w-6xl mx-auto">
            {/* Pain Score Analysis */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-6 w-6 mr-2 text-red-600" />
                  Pain Point Analyse
                </CardTitle>
                <CardDescription>
                  Identifizierte Problembereiche in Ihrem Unternehmen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="mb-2">
                      <span className="text-2xl font-bold">Effizienz</span>
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${getPainColor(painScores.efficiency)}`}>
                      {getPainLabel(painScores.efficiency)}
                    </div>
                    <Progress value={painScores.efficiency * 100} className="h-2" />
                    <p className="text-sm text-gray-600 mt-2">
                      Manuelle Prozesse und Zeitverluste
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-2">
                      <span className="text-2xl font-bold">Kundenservice</span>
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${getPainColor(painScores.customerService)}`}>
                      {getPainLabel(painScores.customerService)}
                    </div>
                    <Progress value={painScores.customerService * 100} className="h-2" />
                    <p className="text-sm text-gray-600 mt-2">
                      Antwortzeiten und Kundenzufriedenheit
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-2">
                      <span className="text-2xl font-bold">Skalierung</span>
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${getPainColor(painScores.scaling)}`}>
                      {getPainLabel(painScores.scaling)}
                    </div>
                    <Progress value={painScores.scaling * 100} className="h-2" />
                    <p className="text-sm text-gray-600 mt-2">
                      Wachstum und Ressourcenengpässe
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use Case Recommendations */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-yellow-600" />
                  Empfohlene KI-Use Cases
                </CardTitle>
                <CardDescription>
                  Basierend auf Ihrer Branche und den identifizierten Pain Points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((rec, index) => (
                    <Card 
                      key={rec.useCase.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedUseCases.find(uc => uc.id === rec.useCase.id) 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => selectUseCase(rec.useCase)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <Badge variant="secondary">
                            Score: {(rec.score * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{rec.useCase.name}</CardTitle>
                        <CardDescription>{rec.useCase.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Setup-Kosten:</span>
                            <span className="font-medium">{formatCurrency(rec.useCase.setupCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Monatlich:</span>
                            <span className="font-medium">{formatCurrency(rec.useCase.monthlyCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Kategorie:</span>
                            <Badge variant="outline">{rec.useCase.category}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Wählen Sie bis zu 3 Use Cases für die ROI-Berechnung aus ({selectedUseCases.length}/3)
                  </p>
                  <Button 
                    onClick={calculateROI} 
                    disabled={selectedUseCases.length === 0}
                    size="lg"
                    className="px-8"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    ROI berechnen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: ROI Results */}
        {currentStep === 3 && (
          <div className="max-w-6xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-green-600" />
                  ROI-Analyse Ergebnisse
                </CardTitle>
                <CardDescription>
                  Return on Investment für die ausgewählten KI-Use Cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={selectedUseCases[0]?.id} className="w-full">
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                    {selectedUseCases.map(useCase => (
                      <TabsTrigger key={useCase.id} value={useCase.id}>
                        {useCase.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {selectedUseCases.map(useCase => (
                    <TabsContent key={useCase.id} value={useCase.id}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['conservative', 'realistic', 'optimistic'].map(scenario => {
                          const result = roiResults[`${useCase.id}_${scenario}`];
                          if (!result) return null;
                          
                          return (
                            <Card key={scenario} className={scenario === 'realistic' ? 'ring-2 ring-blue-500' : ''}>
                              <CardHeader>
                                <CardTitle className="text-lg capitalize">
                                  {scenario === 'conservative' ? 'Konservativ' : 
                                   scenario === 'realistic' ? 'Realistisch' : 'Optimistisch'}
                                </CardTitle>
                                {scenario === 'realistic' && (
                                  <Badge variant="default">Empfohlen</Badge>
                                )}
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="text-center">
                                  <div className="text-3xl font-bold text-green-600">
                                    {formatPercentage(result.roiPercentage)}
                                  </div>
                                  <p className="text-sm text-gray-600">ROI</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm">Investition:</span>
                                    <span className="font-medium">{formatCurrency(result.totalInvestment)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">Jährlicher Nutzen:</span>
                                    <span className="font-medium text-green-600">
                                      {formatCurrency(result.totalAnnualBenefit)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">Amortisation:</span>
                                    <span className="font-medium">
                                      {result.paybackMonths < 12 
                                        ? `${result.paybackMonths.toFixed(1)} Monate`
                                        : `${(result.paybackMonths / 12).toFixed(1)} Jahre`
                                      }
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">Betroffene MA:</span>
                                    <span className="font-medium">{result.affectedEmployees}</span>
                                  </div>
                                </div>
                                
                                <div className="pt-2 border-t">
                                  <p className="text-xs text-gray-500 mb-2">Nutzenaufschlüsselung:</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span>Kosteneinsparungen:</span>
                                      <span>{formatCurrency(result.costSavings.total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Umsatzsteigerung:</span>
                                      <span>{formatCurrency(result.revenueIncrease.total)}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <div className="text-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Neue Berechnung
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Use Cases ändern
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

