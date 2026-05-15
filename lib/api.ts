const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export const API_ENDPOINTS = {
  userInitiate: `${API_BASE_URL}/api/user/initiate`,
  paymentInitiate: `${API_BASE_URL}/api/payment/initiate`,
} as const;
