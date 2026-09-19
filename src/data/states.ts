export interface StateInfo {
  name: string;
  code: string;
  type: 'State' | 'Union Territory';
  officialPortal: string;
  schemeCountApprox: number;
}

export const INDIAN_STATES_AND_UTS: StateInfo[] = [
  // 28 States
  { name: 'Andhra Pradesh', code: 'AP', type: 'State', officialPortal: 'https://www.ap.gov.in', schemeCountApprox: 45 },
  { name: 'Arunachal Pradesh', code: 'AR', type: 'State', officialPortal: 'https://arunachalpradesh.gov.in', schemeCountApprox: 28 },
  { name: 'Assam', code: 'AS', type: 'State', officialPortal: 'https://assam.gov.in', schemeCountApprox: 38 },
  { name: 'Bihar', code: 'BR', type: 'State', officialPortal: 'https://state.bihar.gov.in', schemeCountApprox: 42 },
  { name: 'Chhattisgarh', code: 'CG', type: 'State', officialPortal: 'https://cgstate.gov.in', schemeCountApprox: 34 },
  { name: 'Goa', code: 'GA', type: 'State', officialPortal: 'https://goaonline.gov.in', schemeCountApprox: 24 },
  { name: 'Gujarat', code: 'GJ', type: 'State', officialPortal: 'https://gujaratindia.gov.in', schemeCountApprox: 50 },
  { name: 'Haryana', code: 'HR', type: 'State', officialPortal: 'https://saralharyana.gov.in', schemeCountApprox: 40 },
  { name: 'Himachal Pradesh', code: 'HP', type: 'State', officialPortal: 'https://himachal.nic.in', schemeCountApprox: 30 },
  { name: 'Jharkhand', code: 'JH', type: 'State', officialPortal: 'https://jharkhand.gov.in', schemeCountApprox: 32 },
  { name: 'Karnataka', code: 'KA', type: 'State', officialPortal: 'https://sevasindhu.karnataka.gov.in', schemeCountApprox: 55 },
  { name: 'Kerala', code: 'KL', type: 'State', officialPortal: 'https://kerala.gov.in', schemeCountApprox: 48 },
  { name: 'Madhya Pradesh', code: 'MP', type: 'State', officialPortal: 'https://mp.gov.in', schemeCountApprox: 46 },
  { name: 'Maharashtra', code: 'MH', type: 'State', officialPortal: 'https://mahasharath.maharashtra.gov.in', schemeCountApprox: 58 },
  { name: 'Manipur', code: 'MN', type: 'State', officialPortal: 'https://manipur.gov.in', schemeCountApprox: 22 },
  { name: 'Meghalaya', code: 'ML', type: 'State', officialPortal: 'https://meghalaya.gov.in', schemeCountApprox: 20 },
  { name: 'Mizoram', code: 'MZ', type: 'State', officialPortal: 'https://mizoram.gov.in', schemeCountApprox: 18 },
  { name: 'Nagaland', code: 'NL', type: 'State', officialPortal: 'https://nagaland.gov.in', schemeCountApprox: 19 },
  { name: 'Odisha', code: 'OD', type: 'State', officialPortal: 'https://odisha.gov.in', schemeCountApprox: 52 },
  { name: 'Punjab', code: 'PB', type: 'State', officialPortal: 'https://punjab.gov.in', schemeCountApprox: 36 },
  { name: 'Rajasthan', code: 'RJ', type: 'State', officialPortal: 'https://jansoochna.rajasthan.gov.in', schemeCountApprox: 48 },
  { name: 'Sikkim', code: 'SK', type: 'State', officialPortal: 'https://sikkim.gov.in', schemeCountApprox: 22 },
  { name: 'Tamil Nadu', code: 'TN', type: 'State', officialPortal: 'https://www.tn.gov.in', schemeCountApprox: 54 },
  { name: 'Telangana', code: 'TS', type: 'State', officialPortal: 'https://telangana.gov.in', schemeCountApprox: 44 },
  { name: 'Tripura', code: 'TR', type: 'State', officialPortal: 'https://tripura.gov.in', schemeCountApprox: 24 },
  { name: 'Uttar Pradesh', code: 'UP', type: 'State', officialPortal: 'https://up.gov.in', schemeCountApprox: 62 },
  { name: 'Uttarakhand', code: 'UK', type: 'State', officialPortal: 'https://uk.gov.in', schemeCountApprox: 28 },
  { name: 'West Bengal', code: 'WB', type: 'State', officialPortal: 'https://wb.gov.in', schemeCountApprox: 50 },

  // 8 Union Territories
  { name: 'Andaman and Nicobar Islands', code: 'AN', type: 'Union Territory', officialPortal: 'https://andaman.gov.in', schemeCountApprox: 16 },
  { name: 'Chandigarh', code: 'CH', type: 'Union Territory', officialPortal: 'https://chandigarh.gov.in', schemeCountApprox: 22 },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DH', type: 'Union Territory', officialPortal: 'https://daman.nic.in', schemeCountApprox: 18 },
  { name: 'Delhi', code: 'DL', type: 'Union Territory', officialPortal: 'https://delhi.gov.in', schemeCountApprox: 42 },
  { name: 'Jammu and Kashmir', code: 'JK', type: 'Union Territory', officialPortal: 'https://jk.gov.in', schemeCountApprox: 35 },
  { name: 'Ladakh', code: 'LA', type: 'Union Territory', officialPortal: 'https://ladakh.gov.in', schemeCountApprox: 18 },
  { name: 'Lakshadweep', code: 'LD', type: 'Union Territory', officialPortal: 'https://lakshadweep.gov.in', schemeCountApprox: 14 },
  { name: 'Puducherry', code: 'PY', type: 'Union Territory', officialPortal: 'https://py.gov.in', schemeCountApprox: 20 },
];

export const ALL_INDIAN_STATES = INDIAN_STATES_AND_UTS;
