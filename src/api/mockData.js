import axios, { AxiosError } from "axios";

export const mockAppointment = {
  id: "APT-2026-0001",
  date: "Saturday, 6 September 2026 at 2:00 PM",
  status: "Scheduled",
  serviceType: "Full Engine Diagnostics & Brake Service",
  workDescription:
    "Performed comprehensive engine scan; identified minor sensor misalignment. Full brake pad replacement on rear axles completed. Fluid levels checked and topped up as per standard maintenance protocol. Road test performed - vehicle handling and braking within factory specifications.",
  customer: {
    name: "Alexander Thompson",
    email: "alex.t@example.com",
    phone: "+44 7700 900123",
  },
  vehicle: {
    make: "BMW 3 Series",
    year: "2022",
    plate: "LR72 JNK",
    chassis: "WBA31AG040...",
  },
  photos: [
    { id: 1, alt: "Close up photo of clean car engine bay, cinematic lighting" },
    { id: 2, alt: "Mechanic hand pointing at new brake pads on a car, workshop setting" },
  ],
};

export const mockInvoice = {
  id: "#INV-00942-01",
  dueDate: "13 Sep 2026",
  status: "Unpaid",
  totalDue: 567.0,
  subtotal: 472.5,
  vat: 94.5,
  vatRate: 20,
  lineItems: [
    { description: "Brake Pad Set (Rear)", amount: 185.0 },
    { description: "Diagnostic Inspection (1.5h)", amount: 120.0 },
    { description: "Labor - Installation", amount: 155.0 },
    { description: "Workshop Consumables", amount: 12.5 },
  ],
  paymentNote:
    'This invoice is eligible for "Pay Later" finance through our partner provider. Send invoice to notify customer.',
};

export const mockStaff = {
  name: "Marcus Sterling",
  role: "Service Manager",
};

const DELAY_MS = 800;
let loadErrorConsumed = false;

function queryParam(name) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

function cloneAppointment() {
  return {
    ...mockAppointment,
    customer: { ...mockAppointment.customer },
    vehicle: { ...mockAppointment.vehicle },
    photos: mockAppointment.photos.map((photo) => ({ ...photo })),
  };
}

function cloneInvoice() {
  return {
    ...mockInvoice,
    lineItems: mockInvoice.lineItems.map((item) => ({ ...item })),
  };
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ok(config, data, status = 200) {
  return {
    data,
    status,
    statusText: "OK",
    headers: { "content-type": "application/json" },
    config,
    request: {},
  };
}

function rejectError(config, { status, code, message, details }) {
  const response = status
    ? {
      status,
      statusText: message,
      data: { message, details },
      headers: {},
      config,
    }
    : undefined;

  return Promise.reject(
    new AxiosError(message, code, config, null, response),
  );
}

function maybeActionError(config) {
  const type = queryParam("actionError");
  if (!type) return null;

  if (type === "timeout") {
    return rejectError(config, {
      code: "ECONNABORTED",
      message: "timeout of 8000ms exceeded",
    });
  }
  if (type === "network") {
    return rejectError(config, {
      code: "ERR_NETWORK",
      message: "Network Error",
    });
  }
  if (type === "403") {
    return rejectError(config, {
      status: 403,
      code: "ERR_BAD_REQUEST",
      message: "Forbidden",
    });
  }
  if (type === "422") {
    return rejectError(config, {
      status: 422,
      code: "ERR_BAD_REQUEST",
      message: "Unprocessable Entity",
      details: [{ message: "Payment amount is invalid." }],
    });
  }
  return null;
}

const api = axios.create({
  baseURL: "/api",
  timeout: 8000,
  adapter: async (config) => {
    await wait(DELAY_MS);

    const method = (config.method || "get").toLowerCase();
    const url = config.url || "";

    if (method === "get" && url.includes("/appointments/")) {
      const shouldFail = queryParam("error") === "1" && !loadErrorConsumed;
      if (shouldFail) {
        loadErrorConsumed = true;
        return rejectError(config, {
          status: 500,
          code: "ERR_BAD_RESPONSE",
          message: "Failed to load appointment",
        });
      }
      return ok(config, {
        appointment: cloneAppointment(),
        invoice: cloneInvoice(),
      });
    }

    const actionFailure = maybeActionError(config);
    if (actionFailure) return actionFailure;

    if (method === "post" && url.includes("/send")) {
      return ok(config, {
        success: true,
        message: `Invoice sent to ${mockAppointment.customer.email}`,
      });
    }

    if (method === "post" && url.includes("/payments")) {
      return ok(config, {
        success: true,
        message: "Payment recorded successfully",
      });
    }

    if (method === "patch" && url.includes("/complete")) {
      return ok(config, {
        success: true,
        message: "Appointment marked as complete",
      });
    }

    return rejectError(config, {
      status: 404,
      code: "ERR_BAD_REQUEST",
      message: "Not found",
    });
  },
});

export function getActionErrorMessage(error, fallback) {
  if (!error) return fallback;

  const code = error.code;
  if (code === "ECONNABORTED" || code === "ETIMEDOUT") {
    return "The request timed out. Please check your connection and try again.";
  }
  if (code === "ERR_NETWORK" || error.message === "Network Error") {
    return "Unable to connect. Please check your internet connection and try again.";
  }

  const status = error.response?.status ?? error.status;
  if (status === 403) {
    return "You do not have permission to perform this action.";
  }
  if (status === 422) {
    const detail = error.response?.data?.details?.[0]?.message;
    return detail
      ? `Validation error: ${detail}`
      : "Some of the information provided is invalid. Please check and try again.";
  }

  return fallback;
}

export async function fetchAppointment(id) {
  const { data } = await api.get(`/appointments/${id}`);
  return data;
}

export async function sendInvoice(invoiceId) {
  const { data } = await api.post(`/invoices/${invoiceId}/send`);
  return data;
}

export async function recordPayment(invoiceId, payload) {
  const { data } = await api.post(`/invoices/${invoiceId}/payments`, payload);
  return data;
}

export async function markComplete(appointmentId) {
  const { data } = await api.patch(`/appointments/${appointmentId}/complete`);
  return data;
}
