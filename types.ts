
export interface FlightInfo {
  airline: string;
  flightCode: string;
  departureTime: string;
  departureCity: string;
  departureTerminal: string;
  arrivalTime: string;
  arrivalCity: string;
  arrivalTerminal: string;
  date: string;
  duration: string;
  logo: string;
}

export enum PaymentMethod {
  CREDIT_DEBIT = 'credit_debit',
  BCA_VA = 'bca_va'
}
