export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  endDate: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'Token' | 'NFT' | 'Equity';
  price: string;
  change: number; // Percentage
  image: string;
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD'
}

export type Language = 'zh_CN' | 'zh_Hant' | 'en';

// Pinata 相关类型 (只读版本)
export interface PinataFetchResult {
  success: boolean;
  data?: any;
  error?: string;
}

// 移除上传相关的类型，因为我们只使用读取功能