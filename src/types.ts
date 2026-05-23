/**
 * Types and interfaces for the Bitcoin Interaction Portal
 */

export interface Asset {
  id: string;
  name: string;
  ticker: string;
  symbol: string;
  logoColor: string;
  bgColor: string;
  imageUrl?: string;
  isRunes?: boolean;
}

export interface SwapState {
  sourceAsset: Asset;
  destAsset: Asset;
  sourceAmount: string;
  destAmount: string;
  activeInput: 'source' | 'dest';
  isSwapping: boolean;
  swapSuccess: boolean;
  swapSuccessDetails?: {
    txId: string;
    bbtcAmount: string;
    rscAmount: string;
    timestamp: string;
  };
}

export interface SupportTicket {
  email: string;
  category: string;
  message: string;
  submitted: boolean;
}
