// 10 order status sesuai requirement Project 05
export type OrderStatus =
  | "MENUNGGU_PENJEMPUTAN"
  | "MENUJU_OUTLET"
  | "SAMPAI_OUTLET"
  | "SEDANG_DICUCI"
  | "SEDANG_DISETRIKA"
  | "SEDANG_DIPACKING"
  | "MENUNGGU_PEMBAYARAN"
  | "SIAP_DIANTAR"
  | "SEDANG_DIKIRIM"
  | "DITERIMA_CUSTOMER"
  | "DIBATALKAN";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  MENUNGGU_PENJEMPUTAN: "Menunggu Penjemputan",
  MENUJU_OUTLET: "Menuju Outlet",
  SAMPAI_OUTLET: "Sampai Outlet",
  SEDANG_DICUCI: "Sedang Dicuci",
  SEDANG_DISETRIKA: "Sedang Disetrika",
  SEDANG_DIPACKING: "Sedang Dipacking",
  MENUNGGU_PEMBAYARAN: "Menunggu Pembayaran",
  SIAP_DIANTAR: "Siap Diantar",
  SEDANG_DIKIRIM: "Sedang Dikirim",
  DITERIMA_CUSTOMER: "Diterima Customer",
  DIBATALKAN: "Dibatalkan",
};

export type BadgeVariant = "mint" | "peach" | "coral" | "info" | "neutral";

export const ORDER_STATUS_VARIANTS: Record<OrderStatus, BadgeVariant> = {
  MENUNGGU_PENJEMPUTAN: "peach",
  MENUJU_OUTLET: "info",
  SAMPAI_OUTLET: "info",
  SEDANG_DICUCI: "info",
  SEDANG_DISETRIKA: "info",
  SEDANG_DIPACKING: "info",
  MENUNGGU_PEMBAYARAN: "peach",
  SIAP_DIANTAR: "mint",
  SEDANG_DIKIRIM: "info",
  DITERIMA_CUSTOMER: "mint",
  DIBATALKAN: "coral",
};
