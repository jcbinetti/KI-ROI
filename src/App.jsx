import React, { useState } from 'react'
import { Calculator, TrendingUp, Users, Building2, DollarSign, CheckCircle, ArrowRight } from 'lucide-react'
import { ROICalculator } from './lib/roiCalculator.js'

const Button = ({ children, onClick, className = "", variant = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 h-10 py-2 px-4",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 h-10 py-2 px-4"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

const Label = ({ children, className = "", ...props }) => {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  )
}

const Select = ({ children, value, onValueChange, ...props }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      {...props}
    >
      {children}
    </select>
  )
}

const Progress = ({ value, className = "" }) => {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div 
        className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  )
}

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  )
}

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    industry: '',
    employees: '',
    revenue: '',
    hourlyWage: 35,
    manualWork: '',
    affectedEmployees: '',
    processingTime: '',
    dailyTasks: '',
    errorRate: '',
    errorCost: '',
    responseTime: '',
    satisfaction: '',
    tickets: ''
  })
  const [analysis, setAnalysis] = useState(null)
  const [selectedUseCases, setSelectedUseCases] = useState([])
  const [roiResults, setRoiResults] = useState(null)

  const calculator = new ROICalculator()

  const industries = [
    'Dienstleistungen', 'Produktion', 'Einzelhandel', 'IT/Software', 
    'Finanzwesen', 'Gesundheitswesen', 'Logistik', 'Sonstige'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = () => {
    const painPoints = calculator.calculatePainPoints(formData)
    const recommendations = calculator.getUseCaseRecommendations(formData.industry, painPoints)
    setAnalysis({ painPoints, recommendations })
    setCurrentStep(2)
  }

  const handleUseCaseToggle = (useCaseId) => {
    setSelectedUseCases(prev => {
      if (prev.includes(useCaseId)) {
        return prev.filter(id => id !== useCaseId)
      } else if (prev.length < 3) {
        return [...prev, useCaseId]
      }
      return prev
    })
  }

  const handleCalculateROI = () => {
    const results = calculator.calculateROI(formData, selectedUseCases)
    setRoiResults(results)
    setCurrentStep(3)
  }

  const resetCalculator = () => {
    setCurrentStep(1)
    setFormData({
      industry: '',
      employees: '',
      revenue: '',
      hourlyWage: 35,
      manualWork: '',
      affectedEmployees: '',
      processingTime: '',
      dailyTasks: '',
      errorRate: '',
      errorCost: '',
      responseTime: '',
      satisfaction: '',
      tickets: ''
    })
    setAnalysis(null)
    setSelectedUseCases([])
    setRoiResults(null)
  }

  const progress = currentStep === 1 ? 33 : currentStep === 2 ? 67 : 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">KI ROI-Rechner</h1>
          </div>
          <p className="text-xl text-gray-600">
            Berechnen Sie den Return on Investment für KI-Implementierungen in Ihrem Unternehmen
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Fortschritt</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Step 1: Input Form */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-6 w-6 mr-2 text-blue-600" />
                  Unternehmensprofil
                </CardTitle>
                <p className="text-gray-600">Geben Sie grundlegende Informationen über Ihr Unternehmen ein</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Branche *</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <option value="">Wählen Sie Ihre Branche</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Anzahl Mitarbeiter *</Label>
                    <Input 
                      type="number" 
                      placeholder="z.B. 100"
                      value={formData.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Monatlicher Umsatz (€)</Label>
                    <Input 
                      type="number" 
                      placeholder="z.B. 500000"
                      value={formData.revenue}
                      onChange={(e) => handleInputChange('revenue', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Durchschnittlicher Stundenlohn (€)</Label>
                    <Input 
                      type="number" 
                      placeholder="z.B. 35"
                      value={formData.hourlyWage}
                      onChange={(e) => handleInputChange('hourlyWage', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">Inkl. Nebenkosten</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                  Aktuelle Situation
                </CardTitle>
                <p className="text-gray-600">Beschreiben Sie die aktuellen Herausforderungen in Ihrem Unternehmen</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Anteil manueller Tätigkeiten (%)</Label>
                    <Input 
                      type="number" 
                      value={formData.manualWork}
                      onChange={(e) => handleInputChange('manualWork', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Betroffene Mitarbeiter (%)</Label>
                    <Input 
                      type="number" 
                      value={formData.affectedEmployees}
                      onChange={(e) => handleInputChange('affectedEmployees', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Bearbeitungszeit pro Vorgang (Min)</Label>
                    <Input 
                      type="number" 
                      value={formData.processingTime}
                      onChange={(e) => handleInputChange('processingTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Vorgänge pro Tag</Label>
                    <Input 
                      type="number" 
                      value={formData.dailyTasks}
                      onChange={(e) => handleInputChange('dailyTasks', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Fehlerrate (%)</Label>
                    <Input 
                      type="number" 
                      value={formData.errorRate}
                      onChange={(e) => handleInputChange('errorRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Kosten pro Fehler (€)</Label>
                    <Input 
                      type="number" 
                      value={formData.errorCost}
                      onChange={(e) => handleInputChange('errorCost', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Durchschnittliche Antwortzeit (h)</Label>
                    <Input 
                      type="number" 
                      value={formData.responseTime}
                      onChange={(e) => handleInputChange('responseTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Kundenzufriedenheit (%)</Label>
                    <Input 
                      type="number" 
                      value={formData.satisfaction}
                      onChange={(e) => handleInputChange('satisfaction', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Support-Tickets pro Monat</Label>
                    <Input 
                      type="number" 
                      value={formData.tickets}
                      onChange={(e) => handleInputChange('tickets', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={handleAnalyze}
                disabled={!formData.industry || !formData.employees}
                className="px-8 py-3 text-lg"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Analyse starten
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Analysis Results and Use Case Selection */}
        {currentStep === 2 && analysis && (
          <div className="space-y-6">
            {/* Pain Point Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Pain Point Analyse
                </CardTitle>
                <p className="text-gray-600">Identifizierte Problembereiche in Ihrem Unternehmen</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(analysis.painPoints).map(([key, value]) => {
                    const labels = {
                      efficiency: 'Effizienz',
                      customerService: 'Kundenservice', 
                      scaling: 'Skalierung'
                    }
                    const descriptions = {
                      efficiency: 'Manuelle Prozesse und Zeitverluste',
                      customerService: 'Antwortzeiten und Kundenzufriedenheit',
                      scaling: 'Wachstum und Ressourcenengpässe'
                    }
                    const level = value < 30 ? 'Niedrig' : value < 60 ? 'Mittel' : 'Hoch'
                    const color = value < 30 ? 'text-green-600' : value < 60 ? 'text-yellow-600' : 'text-red-600'
                    
                    return (
                      <div key={key} className="text-center">
                        <h3 className="text-xl font-semibold mb-2">{labels[key]}</h3>
                        <div className={`text-3xl font-bold mb-2 ${color}`}>{level}</div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div 
                            className={`h-3 rounded-full ${value < 30 ? 'bg-green-500' : value < 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(value, 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">{descriptions[key]}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Use Case Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-600">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Empfohlene KI-Use Cases
                </CardTitle>
                <p className="text-gray-600">Basierend auf Ihrer Branche und den identifizierten Pain Points</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {analysis.recommendations.slice(0, 3).map((useCase, index) => (
                    <div 
                      key={useCase.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedUseCases.includes(useCase.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleUseCaseToggle(useCase.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="text-sm font-medium text-blue-600">Score: {useCase.score}%</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{useCase.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{useCase.description}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Setup-Kosten:</span>
                          <span className="font-medium">{useCase.setupCost.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monatlich:</span>
                          <span className="font-medium">{useCase.monthlyCost} €</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kategorie:</span>
                          <span className="font-medium">{useCase.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-600 mb-4">
                  Wählen Sie bis zu 3 Use Cases für die ROI-Berechnung aus ({selectedUseCases.length}/3)
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Zurück
                  </Button>
                  <Button 
                    onClick={handleCalculateROI}
                    disabled={selectedUseCases.length === 0}
                    className="px-8"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    ROI berechnen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: ROI Results */}
        {currentStep === 3 && roiResults && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <DollarSign className="h-6 w-6 mr-2" />
                  ROI-Analyse Ergebnisse
                </CardTitle>
                <p className="text-gray-600">Return on Investment für die ausgewählten KI-Use Cases</p>
              </CardHeader>
              <CardContent>
                {roiResults.map((result, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    <div className="flex items-center mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                        {result.useCase.name}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['conservative', 'realistic', 'optimistic'].map((scenario) => {
                        const data = result[scenario]
                        const labels = {
                          conservative: 'Konservativ',
                          realistic: 'Realistisch', 
                          optimistic: 'Optimistisch'
                        }
                        const isRecommended = scenario === 'realistic'
                        
                        return (
                          <div 
                            key={scenario}
                            className={`border rounded-lg p-4 ${isRecommended ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                          >
                            <div className="text-center mb-3">
                              <h4 className="font-semibold">{labels[scenario]}</h4>
                              {isRecommended && (
                                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Empfohlen</span>
                              )}
                            </div>
                            
                            <div className="text-center mb-4">
                              <div className="text-3xl font-bold text-green-600 mb-1">
                                {data.roi.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600">ROI</div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Investition:</span>
                                <span className="font-medium">{data.investment.toLocaleString()} €</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Jährlicher Nutzen:</span>
                                <span className="font-medium text-green-600">{data.annualBenefit.toLocaleString()} €</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Amortisation:</span>
                                <span className="font-medium">{data.paybackMonths.toFixed(1)} Monate</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Betroffene MA:</span>
                                <span className="font-medium">{data.affectedEmployees}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-gray-200">
                              <div className="text-xs text-gray-600">
                                <div>Nutzenaufschlüsselung:</div>
                                <div>Kosteneinsparungen: {data.breakdown.costSavings.toLocaleString()} €</div>
                                <div>Umsatzsteigerung: {data.breakdown.revenueIncrease.toLocaleString()} €</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={resetCalculator}>
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Neue Berechnung
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Use Cases ändern
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

