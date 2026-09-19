import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Coins, 
  HeartHandshake, 
  SunMedium, 
  Home, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  UserCheck, 
  ChevronRight,
  TrendingUp,
  Download,
  RotateCcw
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';

interface BenefitsCalculatorProps {
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  onViewDetails: (scheme: Scheme) => void;
  onToggleSave: (id: string) => void;
  savedSchemeIds: string[];
}

export const BenefitsCalculator: React.FC<BenefitsCalculatorProps> = ({
  schemes,
  currentLanguage,
  onViewDetails,
  onToggleSave,
  savedSchemeIds,
}) => {
  // Calculator Form State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(20000);
  const [isFarmer, setIsFarmer] = useState<boolean>(true);
  const [landAcres, setLandAcres] = useState<number>(2);
  const [schoolStudentsCount, setSchoolStudentsCount] = useState<number>(1);
  const [collegeStudentsCount, setCollegeStudentsCount] = useState<number>(1);
  const [girlChildCount, setGirlChildCount] = useState<number>(1);
  const [girlChildMonthlySavings, setGirlChildMonthlySavings] = useState<number>(1000);
  const [seniorCitizenCount, setSeniorCitizenCount] = useState<number>(1);
  const [monthlyPowerUnits, setMonthlyPowerUnits] = useState<number>(200);
  const [isUrbanVendor, setIsUrbanVendor] = useState<boolean>(false);
  const [hasPuccaHouse, setHasPuccaHouse] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>('All India');

  const annualIncome = monthlyIncome * 12;

  // Benefits Calculation Model
  const calculation = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      category: string;
      benefitAmount: number;
      isOneTime?: boolean;
      description: string;
      eligible: boolean;
      reasons: string[];
      schemeIdMatch?: string;
    }> = [];

    // 1. Ayushman Bharat PM-JAY (Health Insurance)
    const ayushmanEligible = annualIncome <= 300000 || !hasPuccaHouse;
    items.push({
      id: 'pmjay',
      title: 'Ayushman Bharat PM-JAY Health Protection',
      category: 'Healthcare',
      benefitAmount: 500000,
      description: 'Cashless hospital treatment cover up to ₹5 Lakh per family per year for secondary & tertiary hospitalizations.',
      eligible: ayushmanEligible,
      reasons: ayushmanEligible 
        ? ['Family annual income qualifies under socio-economic eligibility criteria', 'Includes all family members without cap'] 
        : ['Family income exceeds standard BPL/SECC threshold, but seniors 70+ may still enroll'],
      schemeIdMatch: 'ayushman-bharat-pmjay',
    });

    // 2. PM-KISAN (Direct Income Support for Farmers)
    const pmKisanEligible = isFarmer && landAcres > 0 && annualIncome <= 1000000;
    items.push({
      id: 'pmkisan',
      title: 'PM-KISAN Farmer Direct Benefit Transfer',
      category: 'Agriculture',
      benefitAmount: pmKisanEligible ? 6000 : 0,
      description: '₹6,000 per year transferred directly to bank account in 3 equal four-monthly installments of ₹2,000.',
      eligible: pmKisanEligible,
      reasons: pmKisanEligible 
        ? [`Farmer with ${landAcres} acre(s) registered cultivable land`, 'Direct DBT to bank account without middlemen'] 
        : ['Requires cultivable landholding in applicant or family member name'],
      schemeIdMatch: 'pm-kisan-samman-nidhi',
    });

    // 3. PM Surya Ghar Muft Bijli Yojana (Rooftop Solar Subsidy & Free Power)
    let solarSubsidy = 0;
    let powerSavingsPerYear = 0;
    if (monthlyPowerUnits <= 150) {
      solarSubsidy = 30000;
      powerSavingsPerYear = monthlyPowerUnits * 6 * 12;
    } else if (monthlyPowerUnits <= 300) {
      solarSubsidy = 60000;
      powerSavingsPerYear = monthlyPowerUnits * 6.5 * 12;
    } else {
      solarSubsidy = 78000;
      powerSavingsPerYear = 300 * 7 * 12; // cap around 300 units free
    }
    const totalSolarBenefit = solarSubsidy + powerSavingsPerYear;
    items.push({
      id: 'pmsuryaghar',
      title: 'PM Surya Ghar Muft Bijli (Solar Subsidy & Power Savings)',
      category: 'Clean Energy',
      benefitAmount: totalSolarBenefit,
      isOneTime: true,
      description: `Up to ₹${solarSubsidy.toLocaleString('en-IN')} direct government capital subsidy + ~₹${powerSavingsPerYear.toLocaleString('en-IN')} annual electricity bill savings.`,
      eligible: true,
      reasons: [
        `Consuming ~${monthlyPowerUnits} units/month makes rooftop solar financially viable`,
        'Government subsidy credited directly into bank within 30 days of inspection',
      ],
      schemeIdMatch: 'pm-surya-ghar-muft-bijli',
    });

    // 4. Student Scholarships (NSP Pre-Matric & Higher Education)
    let studentScholarshipTotal = 0;
    const studentReasons: string[] = [];
    if (annualIncome <= 250000) {
      if (schoolStudentsCount > 0) {
        const schoolAmount = schoolStudentsCount * 12000;
        studentScholarshipTotal += schoolAmount;
        studentReasons.push(`${schoolStudentsCount} school student(s): ~₹${schoolAmount.toLocaleString('en-IN')} scholarship stipend`);
      }
      if (collegeStudentsCount > 0) {
        const collegeAmount = collegeStudentsCount * 25000;
        studentScholarshipTotal += collegeAmount;
        studentReasons.push(`${collegeStudentsCount} higher education student(s): ~₹${collegeAmount.toLocaleString('en-IN')} stipend & maintenance`);
      }
    } else if (annualIncome <= 450000) {
      if (collegeStudentsCount > 0) {
        const collegeAmount = collegeStudentsCount * 18000;
        studentScholarshipTotal += collegeAmount;
        studentReasons.push(`${collegeStudentsCount} college student(s): Merit-based fee concession/scholarship`);
      }
    }
    const scholarshipEligible = studentScholarshipTotal > 0;
    items.push({
      id: 'scholarships',
      title: 'National & State Student Scholarship Grants',
      category: 'Education',
      benefitAmount: studentScholarshipTotal,
      description: 'Annual scholarship assistance covering tuition fees, books, examination charges, and student living stipends.',
      eligible: scholarshipEligible,
      reasons: scholarshipEligible 
        ? studentReasons 
        : ['Family annual income exceeds scholarship threshold or no active students declared'],
      schemeIdMatch: 'central-sector-scholarship',
    });

    // 5. Sukanya Samriddhi Yojana (Compounded Tax-Free Returns for Girl Child)
    let ssyProjectedGrowth = 0;
    if (girlChildCount > 0 && girlChildMonthlySavings > 0) {
      // 15 years deposit at ~8.2% p.a., matures at 21 years
      const annualDep = girlChildMonthlySavings * 12 * girlChildCount;
      const totalDeposited = annualDep * 15;
      // Rough compounded maturity estimation: ~2.8x - 3.1x of deposited amount
      const maturityEstimate = Math.round(totalDeposited * 3.0);
      ssyProjectedGrowth = maturityEstimate - totalDeposited;
    }
    items.push({
      id: 'ssy',
      title: 'Sukanya Samriddhi Yojana (Guaranteed Interest Gain)',
      category: 'Women & Child',
      benefitAmount: ssyProjectedGrowth,
      isOneTime: false,
      description: `Projected tax-free interest earnings of ~₹${ssyProjectedGrowth.toLocaleString('en-IN')} on ₹${(girlChildMonthlySavings * 12 * 15 * girlChildCount).toLocaleString('en-IN')} deposits for ${girlChildCount} girl child(ren).`,
      eligible: girlChildCount > 0,
      reasons: girlChildCount > 0 
        ? [`${girlChildCount} girl child(ren) eligible for 8.2% p.a. guaranteed government interest rate`, 'Triple tax exemption under Section 80C (EEE status)'] 
        : ['Applicable for households with girl children under 10 years of age'],
      schemeIdMatch: 'sukanya-samriddhi-yojana',
    });

    // 6. PM Awas Yojana (Housing Construction Subsidy)
    const pmayEligible = !hasPuccaHouse && annualIncome <= 300000;
    const pmayAmount = pmayEligible ? 120000 : 0;
    items.push({
      id: 'pmay',
      title: 'Pradhan Mantri Awas Yojana (Pucca House Grant)',
      category: 'Housing',
      benefitAmount: pmayAmount,
      isOneTime: true,
      description: 'Direct financial assistance of ₹1,20,000 (plains) to ₹1,30,000 (hilly areas) for building a permanent house with toilet & LPG.',
      eligible: pmayEligible,
      reasons: pmayEligible 
        ? ['Household does not possess a permanent pucca house and meets SECC income criteria', 'Additional 90 person-days of MGNREGA wage assistance included'] 
        : ['Family already possesses a pucca house or annual income exceeds low-income cutoff'],
      schemeIdMatch: 'pm-awas-yojana-gramin',
    });

    // 7. Senior Citizen National Pension (NSAP / Indira Gandhi Old Age Pension)
    const pensionEligible = seniorCitizenCount > 0 && annualIncome <= 200000;
    const pensionAmount = pensionEligible ? seniorCitizenCount * 12000 : 0;
    items.push({
      id: 'pension',
      title: 'Senior Citizen Social Security Pension (NSAP)',
      category: 'Social Welfare',
      benefitAmount: pensionAmount,
      description: 'Monthly direct cash pension credited directly to senior citizens (60+ years) from BPL/low-income families.',
      eligible: pensionEligible,
      reasons: pensionEligible 
        ? [`${seniorCitizenCount} senior citizen(s) in low-income household`, 'Monthly DBT to bank or post office account'] 
        : ['Applicable when elderly members reside in households meeting BPL criteria'],
      schemeIdMatch: 'pm-shram-yogi-maandhan',
    });

    // 8. PM SVANidhi (Street Vendors / Micro Enterprise Credit)
    const svanidhiEligible = isUrbanVendor;
    const svanidhiCredit = svanidhiEligible ? 50000 : 0;
    items.push({
      id: 'svanidhi',
      title: 'PM SVANidhi Micro-Business Credit & Interest Subsidy',
      category: 'Livelihood',
      benefitAmount: svanidhiCredit,
      description: 'Collateral-free working capital loan (₹10k → ₹20k → ₹50k) with 7% interest subsidy & up to ₹1,200 annual cashback.',
      eligible: svanidhiEligible,
      reasons: svanidhiEligible 
        ? ['Eligible for collateral-free bank credit without asset pledge', 'Unlocks digital transactions cashback'] 
        : ['Select "Street Vendor / Micro-Business" if you engage in urban vending or hawking'],
      schemeIdMatch: 'pm-svanidhi',
    });

    // Compute Totals
    const totalAnnualRecurring = items
      .filter((i) => i.eligible && !i.isOneTime && i.id !== 'pmjay' && i.id !== 'ssy')
      .reduce((acc, curr) => acc + curr.benefitAmount, 0);

    const totalSubsidiesAndAssets = items
      .filter((i) => i.eligible && (i.isOneTime || i.id === 'ssy'))
      .reduce((acc, curr) => acc + curr.benefitAmount, 0);

    const healthProtectionValue = items.find((i) => i.id === 'pmjay' && i.eligible)?.benefitAmount || 0;

    const totalEstimatedPackage = totalAnnualRecurring + totalSubsidiesAndAssets + healthProtectionValue;

    return {
      items,
      totalAnnualRecurring,
      totalSubsidiesAndAssets,
      healthProtectionValue,
      totalEstimatedPackage,
      eligibleCount: items.filter((i) => i.eligible).length,
    };
  }, [
    monthlyIncome,
    annualIncome,
    isFarmer,
    landAcres,
    schoolStudentsCount,
    collegeStudentsCount,
    girlChildCount,
    girlChildMonthlySavings,
    seniorCitizenCount,
    monthlyPowerUnits,
    isUrbanVendor,
    hasPuccaHouse,
  ]);

  const handleReset = () => {
    setMonthlyIncome(20000);
    setIsFarmer(true);
    setLandAcres(2);
    setSchoolStudentsCount(1);
    setCollegeStudentsCount(1);
    setGirlChildCount(1);
    setGirlChildMonthlySavings(1000);
    setSeniorCitizenCount(1);
    setMonthlyPowerUnits(200);
    setIsUrbanVendor(false);
    setHasPuccaHouse(false);
    setSelectedState('All India');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Citizen Welfare Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white mb-2">
            Family Benefits &amp; Subsidy Calculator
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Estimate the total financial assistance, healthcare safety net, solar capital subsidies, and scholarship funds your household is entitled to receive from Central and State welfare programs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Inputs (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold">
                  1
                </div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Household Parameters
                </h2>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm">
              {/* Monthly Family Income */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">
                    Monthly Family Income
                  </label>
                  <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">
                    ₹{monthlyIncome.toLocaleString('en-IN')} <span className="text-[11px] font-normal text-stone-500">(₹{(monthlyIncome * 12).toLocaleString('en-IN')}/yr)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-600 dark:text-stone-300 mt-1">
                  <span>₹5,000 (BPL)</span>
                  <span>₹25,000 (Lower Middle)</span>
                  <span>₹1,00,000+</span>
                </div>
              </div>

              {/* Farmer & Landholding */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <span>Agricultural Landholder / Farmer?</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFarmer(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        isFarmer 
                          ? 'bg-amber-600 text-white shadow-xs' 
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFarmer(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        !isFarmer 
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs' 
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {isFarmer && (
                  <div className="mt-2.5 bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 animate-in fade-in">
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="text-amber-950 dark:text-amber-200 font-medium">Cultivable Land Owned:</span>
                      <span className="font-bold text-amber-800 dark:text-amber-300">{landAcres} Acre(s)</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={landAcres}
                      onChange={(e) => setLandAcres(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Monthly Electricity Units */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">
                    Monthly Electricity Consumption
                  </label>
                  <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">
                    {monthlyPowerUnits} Units/Mo
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={monthlyPowerUnits}
                  onChange={(e) => setMonthlyPowerUnits(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-600 dark:text-stone-300 mt-1">
                  <span>50 Units (1 kW)</span>
                  <span>200 Units (2 kW)</span>
                  <span>400+ Units (3+ kW)</span>
                </div>
              </div>

              {/* Children & Students */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
                <h3 className="font-semibold text-stone-700 dark:text-stone-300 text-xs uppercase tracking-wider">
                  Students &amp; Children
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-600 dark:text-stone-400 block mb-1">School Students (1-10)</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSchoolStudentsCount(Math.max(0, schoolStudentsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 font-bold hover:bg-stone-300 cursor-pointer flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="font-bold text-stone-900 dark:text-stone-100 flex-1 text-center">{schoolStudentsCount}</span>
                      <button
                        type="button"
                        onClick={() => setSchoolStudentsCount(schoolStudentsCount + 1)}
                        className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 font-bold hover:bg-stone-300 cursor-pointer flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-600 dark:text-stone-400 block mb-1">College/Higher Ed</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCollegeStudentsCount(Math.max(0, collegeStudentsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 font-bold hover:bg-stone-300 cursor-pointer flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="font-bold text-stone-900 dark:text-stone-100 flex-1 text-center">{collegeStudentsCount}</span>
                      <button
                        type="button"
                        onClick={() => setCollegeStudentsCount(collegeStudentsCount + 1)}
                        className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 font-bold hover:bg-stone-300 cursor-pointer flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Girl Child & SSY */}
                <div className="bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-2xl border border-rose-200/60 dark:border-rose-900/40">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-rose-950 dark:text-rose-200">
                      Girl Children (Age ≤ 10 Years):
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGirlChildCount(Math.max(0, girlChildCount - 1))}
                        className="w-6 h-6 rounded-md bg-rose-200 dark:bg-rose-800 font-bold cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="font-bold text-rose-950 dark:text-rose-100">{girlChildCount}</span>
                      <button
                        type="button"
                        onClick={() => setGirlChildCount(Math.min(3, girlChildCount + 1))}
                        className="w-6 h-6 rounded-md bg-rose-200 dark:bg-rose-800 font-bold cursor-pointer text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {girlChildCount > 0 && (
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between text-[11px] text-stone-600 dark:text-stone-400 mb-1">
                        <span>Intended Monthly Deposit:</span>
                        <span className="font-bold text-rose-700 dark:text-rose-300">₹{girlChildMonthlySavings.toLocaleString('en-IN')}/mo</span>
                      </div>
                      <input
                        type="range"
                        min="250"
                        max="12500"
                        step="250"
                        value={girlChildMonthlySavings}
                        onChange={(e) => setGirlChildMonthlySavings(Number(e.target.value))}
                        className="w-full accent-rose-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Seniors & Housing Toggles */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-stone-700 dark:text-stone-300 text-xs">
                    Senior Citizens in Family (60+ yrs):
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSeniorCitizenCount(Math.max(0, seniorCitizenCount - 1))}
                      className="w-6 h-6 rounded-md bg-stone-200 dark:bg-stone-700 font-bold cursor-pointer text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-stone-900 dark:text-stone-100 w-4 text-center">{seniorCitizenCount}</span>
                    <button
                      type="button"
                      onClick={() => setSeniorCitizenCount(seniorCitizenCount + 1)}
                      className="w-6 h-6 rounded-md bg-stone-200 dark:bg-stone-700 font-bold cursor-pointer text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={hasPuccaHouse}
                    onChange={(e) => setHasPuccaHouse(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded-sm cursor-pointer accent-amber-600"
                  />
                  <span className="text-stone-700 dark:text-stone-300">Family already owns a permanent Pucca House</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={isUrbanVendor}
                    onChange={(e) => setIsUrbanVendor(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded-sm cursor-pointer accent-amber-600"
                  />
                  <span className="text-stone-700 dark:text-stone-300">Operates as a Street Vendor / Micro Retailer (PM SVANidhi)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Results & Itemized Breakdown (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Total Highlight Card */}
          <div className="bg-linear-to-br from-amber-500 via-amber-600 to-amber-700 text-stone-950 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Coins className="w-36 h-36" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-stone-950/15 text-stone-950 px-3 py-1 rounded-full">
                  Estimated Total Welfare Value
                </span>
                <span className="text-xs font-bold text-stone-900 bg-white/70 px-2.5 py-0.5 rounded-full">
                  {calculation.eligibleCount} Program(s) Matched
                </span>
              </div>

              <div className="mt-3">
                <div className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-stone-950">
                  ₹{calculation.totalEstimatedPackage.toLocaleString('en-IN')}
                </div>
                <p className="text-xs sm:text-sm font-medium text-stone-900/80 mt-1">
                  Estimated combined package of direct cash transfers, capital subsidies, and annual healthcare cover.
                </p>
              </div>

              {/* Breakdown Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-stone-950/15 text-xs">
                <div className="bg-stone-950/10 p-3 rounded-2xl backdrop-blur-xs">
                  <span className="block text-[10px] text-stone-800 font-semibold uppercase">Annual Direct Cash</span>
                  <span className="text-base sm:text-lg font-bold text-stone-950">
                    ₹{calculation.totalAnnualRecurring.toLocaleString('en-IN')}<span className="text-xs font-normal">/yr</span>
                  </span>
                </div>

                <div className="bg-stone-950/10 p-3 rounded-2xl backdrop-blur-xs">
                  <span className="block text-[10px] text-stone-800 font-semibold uppercase">Health Cover Protection</span>
                  <span className="text-base sm:text-lg font-bold text-stone-950">
                    ₹{calculation.healthProtectionValue.toLocaleString('en-IN')}<span className="text-xs font-normal">/yr</span>
                  </span>
                </div>

                <div className="bg-stone-950/10 p-3 rounded-2xl backdrop-blur-xs">
                  <span className="block text-[10px] text-stone-800 font-semibold uppercase">Subsidies &amp; Capital Assets</span>
                  <span className="text-base sm:text-lg font-bold text-stone-950">
                    ₹{calculation.totalSubsidiesAndAssets.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Scheme Entitlement Cards */}
          <div className="space-y-3.5">
            <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Itemized Entitlements &amp; Subsidies</span>
              <span className="text-xs font-normal text-stone-500">Based on your household parameters</span>
            </h2>

            {calculation.items.map((item) => {
              const matchedScheme = schemes.find((s) => s.id === item.schemeIdMatch);
              const isSaved = item.schemeIdMatch ? savedSchemeIds.includes(item.schemeIdMatch) : false;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    item.eligible
                      ? 'bg-white dark:bg-stone-900 border-amber-200 dark:border-amber-900/60 shadow-xs hover:border-amber-400'
                      : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {item.category}
                        </span>
                        {item.eligible ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Eligible</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-stone-500 bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                            Criteria not met
                          </span>
                        )}
                        {item.isOneTime && (
                          <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full">
                            Capital Subsidy
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Criteria bullet tags */}
                      <div className="pt-1.5 flex flex-wrap gap-1.5 text-[11px]">
                        {item.reasons.map((r, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md ${
                              item.eligible
                                ? 'bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                            }`}
                          >
                            • {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Amount & CTA Cluster */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Benefit Value
                        </span>
                        <span className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 font-serif">
                          ₹{item.benefitAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {matchedScheme && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onViewDetails(matchedScheme)}
                            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <span>View Scheme</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onToggleSave(matchedScheme.id)}
                            className={`p-1.5 rounded-xl border cursor-pointer transition-colors ${
                              isSaved
                                ? 'bg-amber-500 text-white border-amber-600'
                                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:text-amber-600'
                            }`}
                            title={isSaved ? 'Remove from Saved' : 'Save for Application'}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Citizen Advisory Disclaimer */}
          <div className="bg-stone-100 dark:bg-stone-900/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-stone-900 dark:text-stone-200 block">
                Official Verification Notice:
              </span>
              <p>
                Estimated amounts are calculated using official Government of India guidelines (e.g. PM-KISAN ₹6,000, PM Surya Ghar subsidy slabs, Ayushman Bharat ₹5 Lakh coverage). Actual sanction depends on document validation (Aadhaar e-KYC, DBT seeding, state domicile) at the official government portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
