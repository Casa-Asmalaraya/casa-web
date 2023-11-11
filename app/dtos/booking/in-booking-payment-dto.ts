export interface InBookingPaymentDto {
  id?: number;
  paymentLink?: string;
  paymentAmount?: number;
  paymentStatus?: string;
  expiredAt?: number;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
