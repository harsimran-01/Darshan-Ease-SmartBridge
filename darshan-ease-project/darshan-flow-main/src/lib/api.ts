const API_URL = "http://localhost:5000/api";

// ─── Helper ───────────────────────────────────────────────────────
function getToken(): string | null {
  try {
    const stored = localStorage.getItem("darshan_user");
    if (stored) return JSON.parse(stored).token;
  } catch {}
  return null;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data as T;
}

// ─── Auth ─────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  register: (name: string, email: string, password: string, age: number, role: string) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password, age, role }) }),
};

// ─── Temples ──────────────────────────────────────────────────────
export const templeApi = {
  getAll: () => request("/temples"),
  getById: (id: string) => request(`/temples/${id}`),
  create: (data: any) => request("/temples", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => request(`/temples/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => request(`/temples/${id}`, { method: "DELETE" }),
};

// ─── Slots ────────────────────────────────────────────────────────
export const slotApi = {
  getAll: (templeId?: string, date?: string) => {
    const params = new URLSearchParams();
    if (templeId) params.set("templeId", templeId);
    if (date) params.set("date", date);
    return request(`/slots?${params.toString()}`);
  },
  create: (data: any) => request("/slots", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => request(`/slots/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  block: (id: string) => request(`/slots/${id}/block`, { method: "PUT" }),
};

// ─── Bookings ─────────────────────────────────────────────────────
export const bookingApi = {
  create: (data: { templeId: string; slotId: string; bookingType?: string; isGroupBooking?: boolean; groupSize?: number }) =>
    request("/bookings", { method: "POST", body: JSON.stringify(data) }),

  getMyBookings: () => request("/bookings/my"),

  cancel: (id: string) => request(`/bookings/${id}/cancel`, { method: "PUT" }),

  reschedule: (id: string, newSlotId: string) =>
    request(`/bookings/${id}/reschedule`, { method: "PUT", body: JSON.stringify({ newSlotId }) }),
};

// ─── Parking ──────────────────────────────────────────────────────
export const parkingApi = {
  getByTemple: (templeId: string) => request(`/parking?templeId=${templeId}`),
  updateSpots: (id: string, occupiedSpots: number) =>
    request(`/parking/${id}`, { method: "PUT", body: JSON.stringify({ occupiedSpots }) }),
};

// ─── Prasad ───────────────────────────────────────────────────────
export const prasadApi = {
  getItems: () => request("/prasad/items"),
  placeOrder: (data: any) => request("/prasad/order", { method: "POST", body: JSON.stringify(data) }),
  getMyOrders: () => request("/prasad/my-orders"),
};

// ─── Notifications ────────────────────────────────────────────────
export const notificationApi = {
  getMy: () => request("/notifications"),
  markRead: (id: string) => request(`/notifications/${id}/read`, { method: "PUT" }),
  markAllRead: () => request("/notifications/read-all", { method: "PUT" }),
};

// ─── Festivals ────────────────────────────────────────────────────
export const festivalApi = {
  getAll: () => request("/festivals"),
  getById: (id: string) => request(`/festivals/${id}`),
};

// ─── Staff ────────────────────────────────────────────────────────
export const staffApi = {
  getAll: () => request("/staff"),
  allocate: (data: any) => request("/staff", { method: "POST", body: JSON.stringify(data) }),
};

// ─── Admin ────────────────────────────────────────────────────────
export const adminApi = {
  getStats: () => request("/admin/stats"),
  getAnalytics: () => request("/admin/analytics"),
};
