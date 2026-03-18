/* =========================================================
AERODESK PLATFORM CORE
========================================================= */

export type PlatformRole =
  | "admin"
  | "operator"
  | "agency"
  | "corporate"
  | "hotel"
  | "individual"

export type UserStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "blocked"

export type FirmRole =
  | "admin"
  | "manager"
  | "finance"
  | "operations"
  | "approver"
  | "viewer"
  | "EMPLOYEE"
  | "MANAGER"
  | "COST_CENTER_OWNER"
  | "FINANCE"
  | "TRAVEL_DESK_ADMIN"

/* =========================================================
USER
========================================================= */

export type User = {
  id: string
  email: string
  password?: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
  companyName?: string
  phoneNumber?: string
  address?: string
  avatar?: string
  operatorId?: string
  agencyId?: string
  corporateId?: string
  hotelPartnerId?: string
  firmRole?: FirmRole
  legalEntityName?: string
  gstin?: string
  gstNumber?: string
  gstVerificationStatus?: "pending" | "verified" | "rejected"
  stateCode?: string
  gstRegisteredAddress?: string
  ctdId?: string
  createdAt: string
  updatedAt?: string
}

/* =========================================================
USER ROLES
========================================================= */

export type UserRole =
  | "admin"
  | "operator"
  | "travel-agency"
  | "hotel"
  | "corporate"
  | "customer"
  | "Admin"
  | "Operator"
  | "Travel Agency"
  | "Hotel Partner"
  | "Corporate Admin"
  | "Requester"
  | "CTD Admin"
  | "Customer"

/* =========================================================
OPERATORS
========================================================= */

export type OperatorStatus =
  | "ACTIVE"
  | "PENDING_APPROVAL"
  | "SUSPENDED"
  | "BLOCKED"
  | "Approved"
  | "Pending Approval"
  | "Rejected"

export type Operator = {
  id: string
  companyName: string
  contactPersonName?: string
  contactEmail?: string
  contactPhone?: string
  nsopLicenseNumber?: string
  city?: string
  zone?: "North" | "South" | "East" | "West" | "Central"
  fleetSize?: number
  status: OperatorStatus
  createdAt: string
  updatedAt?: string
}

/* =========================================================
TRAVEL AGENCIES
========================================================= */

export type TravelAgency = {
  id: string
  companyName: string
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BLOCKED"
  gstNumber?: string
  contactEmail?: string
  phone?: string
  address?: string
  createdAt: string
  updatedAt?: string
}

/* =========================================================
CORPORATE ORGANIZATION
========================================================= */

export type CorporateOrganization = {
  id: string
  corporateId: string
  companyName: string
  industry?: string
  contactEmail?: string
  annualAviationBudget?: number
  usedBudget?: number
  status?: "ACTIVE" | "PENDING_SETUP" | "SUSPENDED" | "BLOCKED"
  createdAt: string
  updatedAt?: string
}

/* =========================================================
CORPORATE TRAVEL DESK
========================================================= */

export type CorporateTravelDeskStatus =
  | "ACTIVE"
  | "PENDING_SETUP"
  | "SUSPENDED"
  | "BLOCKED"

export type CorporateTravelDesk = {
  id: string
  companyName: string
  status: CorporateTravelDeskStatus
  adminExternalAuthId: string
  createdAt: string
  updatedAt?: string
}

/* =========================================================
CORPORATE TRAVEL TYPE
========================================================= */

export type CostCenter = {
  id: string
  corporateId: string
  costCenterId: string
  departmentName: string
  allocatedBudget: number
  usedBudget: number
  createdAt?: string
  updatedAt?: string
}

export type TravelType =
  | "CHARTER"
  | "JET_SEATS"

export type RequestStatus =
  | "REQUEST_CREATED"
  | "MANAGER_APPROVED"
  | "COST_CENTER_APPROVED"
  | "FINANCE_APPROVED"
  | "TRAVEL_DESK_PROCESSING"
  | "RFQ_SUBMITTED"
  | "QUOTE_RECEIVED"
  | "PAYMENT_APPROVED"
  | "BOOKING_CONFIRMED"
  | "TRIP_IN_PROGRESS"
  | "TRIP_COMPLETED"
  | "REJECTED"

export type EmployeeTravelRequest = {
  id: string
  requestId: string
  employeeId: string
  employeeName: string
  corporateId: string
  travelType: TravelType
  origin: string
  destination: string
  travelDate: string
  passengerCount: number
  purposeOfTravel?: string
  costCenterId: string
  requestStatus: RequestStatus
  estimatedBudget?: number
  createdAt: string
}

/* =========================================================
CORPORATE TRAVEL APPROVAL WORKFLOW
========================================================= */

export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"

export type TravelApproval = {
  id: string
  approvalId: string
  requestId: string
  approverRole: "MANAGER" | "COST_CENTER_OWNER" | "FINANCE"
  approverUserId: string
  approvalStatus: ApprovalStatus
  comments?: string
  createdAt: string
}

/* =========================================================
CORPORATE TRAVEL POLICY
========================================================= */

export type CorporateTravelPolicy = {
  id: string
  corporateId: string
  policyName: string
  policyDescription?: string
  maxPassengers?: number
  allowedAircraftTypes?: string[]
  approvalRequired?: boolean
  createdAt: string
  updatedAt?: string
}

/* =========================================================
HOTEL PARTNERS
========================================================= */

export type HotelPartner = {
  id: string
  companyName: string
  hotelName?: string
  contactEmail?: string
  contactPhone?: string
  city?: string
  address?: string
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BLOCKED"
  createdAt: string
  updatedAt?: string
}

/* =========================================================
AIRCRAFT
========================================================= */

export type AircraftStatus =
  | "AVAILABLE"
  | "IN_CHARTER"
  | "MAINTENANCE"
  | "MAINTENANCE_DUE"
  | "AOG"

export type Aircraft = {
  id: string
  operatorId: string
  name: string
  type: "Light Jet" | "Mid-size Jet" | "Heavy Jet" | "Turboprop"
  registration: string
  paxCapacity: number
  homeBase: string
  hourlyRate?: number
  status: AircraftStatus
  createdAt?: string
  updatedAt?: string
}

/* =========================================================
EMPTY LEG MARKETPLACE
========================================================= */

export type EmptyLeg = {
  id: string
  operatorId: string
  aircraftId: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  totalSeats: number
  availableSeats: number
  pricePerSeat: number
  currency: "INR" | "USD"
  status: "draft" | "published" | "approved" | "expired" | "cancelled"
  createdAt: string
  publishedAt?: string
  operatorName?: string
  aircraftType?: string
}

/* =========================================================
PASSENGERS
========================================================= */

export type Passenger = {
  fullName: string
  nationality: string
  idNumber: string
  idType: string
  dob?: string
  gender?: string
}

/* =========================================================
PASSENGER MANIFEST
========================================================= */

export type PassengerManifest = {
  id: string
  charterId: string
  status: "draft" | "submitted" | "approved" | "rejected"
  passengers: Passenger[]
  createdAt: string
  updatedAt: string
  submittedBy?: string
}

/* =========================================================
CHARTER RFQ
========================================================= */

export type CharterRFQStatus =
  | "Draft"
  | "New"
  | "Submitted"
  | "rfqSubmitted"
  | "Bidding Open"
  | "quoteAccepted"
  | "awaitingManifest"
  | "manifestSubmitted"
  | "manifestApproved"
  | "invoiceIssued"
  | "paymentSubmitted"
  | "paymentConfirmed"
  | "charterConfirmed"
  | "boarding"
  | "departed"
  | "arrived"
  | "flightCompleted"
  | "tripClosed"
  | "cancelled"

export type CharterRFQ = {
  id: string
  requestId: string
  customerId: string
  requesterExternalAuthId: string
  operatorId?: string
  agencyId?: string
  corporateId?: string
  customerName: string
  company?: string
  origin: string
  destination: string
  departureDate: string
  departureTime: string
  pax: number
  aircraftType: string
  status: CharterRFQStatus
  costCenter?: string
  businessPurpose?: string
  hotelRequired?: boolean
  hotelPreferences?: string
  catering?: string
  specialRequirements?: string
  createdAt: string
  updatedAt: string
  totalAmount?: number
  bidsCount?: number
  selectedQuoteId?: string
  expiryDate: string
}

/* =========================================================
CHARTER QUOTES
========================================================= */

export type CharterQuote = {
  id: string
  rfqId: string
  operatorId: string
  aircraftId: string
  totalAmount: number
  currency: "INR" | "USD"
  validUntil: string
  terms?: string
  isSelected: boolean
  breakdown?: {
    basePrice: number
    fuelCharge: number
    handlingFee: number
    pilotFee: number
  }
  createdAt: string
}

/* =========================================================
SEAT MARKETPLACE
========================================================= */

export type SeatRequestStatus =
  | "REQUEST_SUBMITTED"
  | "PENDING_OPERATOR_APPROVAL"
  | "APPROVED"
  | "WAITING_PAYMENT"
  | "PAYMENT_SUBMITTED"
  | "PAYMENT_CONFIRMED"
  | "CONFIRMED"
  | "COMPLETED"
  | "REJECTED"

export type SeatAllocationRequest = {
  id: string
  requestId: string
  flightId: string
  operatorId: string
  requesterId: string
  requesterName: string
  origin: string
  destination: string
  seatsRequested: number
  passengers: Passenger[]
  requestStatus: SeatRequestStatus
  totalAmount?: number
  createdAt: string
}

/* =========================================================
SEAT BOOKINGS
========================================================= */

export type SeatBooking = {
  id: string
  bookingReference: string
  emptyLegId: string
  userId: string
  bookerType: UserRole
  seatsBooked: number
  totalAmount: number
  passengers: Passenger[]
  status: "pending" | "confirmed" | "cancelled" | "completed"
  paymentStatus: "pending" | "paid" | "refunded"
  invoiceId?: string
  createdAt: string
}

/* =========================================================
BILLING ENGINE
========================================================= */

export type PlatformInvoiceStatus =
  | "PENDING"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED"

export type PlatformInvoice = {
  id: string
  entityName: string
  entityType: "operator" | "agency" | "corporate" | "hotel"
  totalAmount: number
  dueDate: string
  status: PlatformInvoiceStatus
  createdAt?: string
}

export type EntityBillingLedger = {
  id: string
  relatedTransactionId: string
  serviceType: "CHARTER" | "EMPTY_LEG" | "SEAT_MARKETPLACE" | "SUBSCRIPTION"
  grossAmount: number
  platformChargeAmount: number
  ledgerStatus: "pending" | "invoiced" | "settled" | "paid"
  createdAt?: string
}

export type PlatformChargeRule = {
  id: string
  entityType: "operator" | "agency" | "corporate" | "hotel"
  serviceType: "charter" | "empty_leg" | "seats" | "subscription"
  chargeType: "percentage" | "fixed" | "hybrid"
  percentageRate?: number
  fixedAmount?: number
  isActive: boolean
}

/* =========================================================
TAX CONFIGURATION
========================================================= */

export type TaxConfig = {
  id: string
  serviceType: "charter" | "empty_leg" | "seat_booking" | "subscription"
  taxRatePercent: number
  sacCode: string
  effectiveFrom: string
  isActive: boolean
}

/* =========================================================
INVOICING & PAYMENTS
========================================================= */

export type Invoice = {
  id: string
  invoiceNumber: string
  relatedEntityId: string
  charterId: string
  operatorId: string
  totalAmount: number
  currency?: "INR" | "USD"
  status: "draft" | "issued" | "paid" | "cancelled"
  bankDetails?: string
  items?: InvoiceItem[]
  createdAt: string
}

export type InvoiceItem = {
  description: string
  quantity: number
  unitPrice: number
  amount: number
  taxRate?: number
  taxAmount?: number
}

export type Payment = {
  id: string
  paymentReference: string
  charterId: string
  invoiceId: string
  relatedEntityId?: string
  utrReference: string
  amount?: number
  method?: "bank_transfer" | "card" | "upi" | "wallet"
  status: "pending" | "submitted" | "verified" | "rejected" | "completed" | "failed"
  createdAt: string
  verifiedAt?: string | null
  completedAt?: string
}

/* =========================================================
CORPORATE PAYMENTS
========================================================= */

export type CorporatePayment = {
  id: string
  corporateId: string
  corporateRequestId?: string
  costCenterId?: string
  paymentReference: string
  amount: number
  currency?: string
  paymentMethod?: "BANK_TRANSFER" | "UPI" | "CARD" | "WALLET"
  paymentStatus: "SUBMITTED" | "UNDER_REVIEW" | "VERIFIED" | "REJECTED"
  description?: string
  createdAt: string
  updatedAt?: string
}

/* =========================================================
REVENUE SHARE & COMMISSION ENGINE
========================================================= */

export type CommissionRule = {
  id: string
  serviceType: "charter" | "empty_leg" | "seats" | "subscription"
  commissionRatePercent: number
  effectiveFrom: string
  isActive: boolean
}

export type RevenueShareConfig = {
  id: string
  scopeType: "agency" | "operator" | "platform"
  serviceType?: "charter" | "empty_leg" | "seats"
  agencySharePercent: number
  aerodeskSharePercent: number
  isActive: boolean
}

export type CommissionLedgerEntry = {
  id: string
  transactionId: string
  entityId: string
  serviceType: "charter" | "empty_leg" | "seats"
  bookingChannel: "direct" | "agency" | "corporate"
  grossAmount: number
  agencyCommissionAmount: number
  aerodeskCommissionAmount: number
  totalCommission: number
  agencySharePercent: number
  status: "pending" | "settled" | "paid"
  createdAt: string
}

export type SettlementRecord = {
  id: string
  entityId: string
  entityName: string
  totalAgencyCommission: number
  settlementPeriodStart: string
  settlementPeriodEnd: string
  status: "pending" | "processing" | "processed" | "completed" | "paid"
  createdAt: string
  paymentReference?: string
}

/* =========================================================
AI DEMAND INTELLIGENCE
========================================================= */

export type CharterDemandForecast = {
  id: string
  origin: string
  destination: string
  routeCode: string
  predictedDemandScore: number
  timeframe: "24hours" | "3days" | "7days" | "30days"
  aircraftTypeDemand: string[]
  forecastWindow?: string
}

/* =========================================================
CHARTER PRICE INDEX
========================================================= */

export type CharterPriceIndex = {
  id: string
  route: string
  aircraftCategory: string
  averagePrice: number
  priceChangePercent: number
  demandIndex: number
  lastUpdated: string
}

/* =========================================================
GLOBAL CHARTER RADAR
========================================================= */

export type AircraftPosition = {
  id: string
  registration: string
  aircraftType: string
  operator: string
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  heading: number
  timestamp: string
  status: "available" | "scheduled" | "inflight"
  originAirport?: string
  destinationAirport?: string
}

export type AircraftAvailability = {
  id: string
  registration: string
  aircraftType: string
  operator: string
  currentAirport: string
  availableFrom: string
  availabilityWindow: "3hours" | "6hours" | "12hours"
  seats: number
  rangeKm?: number
}

/* =========================================================
OPERATIONS CENTER
========================================================= */

export type OperationalActivity = {
  id: string
  type: "rfq_created" | "quote_accepted" | "empty_leg_published" | "seat_booked"
  message: string
  timestamp: string
  entityId: string
  actor: string
}

/* =========================================================
ACTIVITY LOG (AUDIT TRAIL)
========================================================= */

export type ActivityLog = {
  id: string
  entityId?: string
  charterId?: string
  actionType: string
  performedBy: string
  role: string
  timestamp: string
  previousStatus?: string
  newStatus?: string
  metadata?: any
}

/* =========================================================
MONITORING
========================================================= */

export type SystemAlert = {
  id: string
  alertId: string
  type: string
  message: string
  status: "active" | "resolved"
  severity: "low" | "medium" | "high"
  createdAt: string
}

export type SystemLog = {
  id: string
  event: string
  userId: string
  module: string
  action: string
  timestamp: string
}

/* =========================================================
AUDIT
========================================================= */

export type AuditLog = {
  id: string
  timestamp: string
  user: string
  role: string
  action: string
  details: string
  targetId: string
}

/* =========================================================
USER ACTIVITY LOG
========================================================= */

export type UserActivityLog = {
  id: string
  logId?: string
  userId: string
  userName?: string
  action: string
  entityId?: string
  entityType?: string
  module?: string
  ipAddress?: string
  location?: string
  timestamp: string
}

/* =========================================================
PLATFORM FEATURE FLAGS
========================================================= */

export type FeatureFlag = {
  id: string
  name: string
  description?: string
  isEnabled: boolean
  createdAt?: string
  updatedAt?: string
}

/* =========================================================
DEMO ACCESS
========================================================= */

export type DemoAccessSettings = {
  id: string
  accessKey: string
  demoPassword: string
}

export type DemoAccessLog = {
  id: string
  accessId: string
  roleAccessed: string
  ipAddress: string
  accessTime: string
}

/* =========================================================
CREW MANAGEMENT
========================================================= */

export type CrewRole =
  | "PILOT"
  | "CO_PILOT"
  | "FLIGHT_ATTENDANT"
  | "ENGINEER"
  | "GROUND_STAFF"

export type CrewStatus =
  | "AVAILABLE"
  | "ON_DUTY"
  | "OFF_DUTY"
  | "ON_LEAVE"
  | "TRAINING"

export type Crew = {
  id: string
  operatorId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: CrewRole
  status: CrewStatus
  licenseNumber?: string
  licenseExpiry?: string
  medicalExpiry?: string
  totalFlightHours?: number
  certifications: string[]
  baseAirport?: string
  createdAt: string
  updatedAt?: string
}

export type CrewAssignment = {
  id: string
  crewId: string
  charterId?: string
  flightId?: string
  startTime: string
  endTime: string
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  notes?: string
  createdAt: string
}

/* =========================================================
MAINTENANCE
========================================================= */

export type MaintenanceType =
  | "SCHEDULED"
  | "UNSCHEDULED"
  | "AOG"
  | "INSPECTION"

export type MaintenanceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

export type MaintenanceRecord = {
  id: string
  aircraftId: string
  operatorId: string
  type: MaintenanceType
  status: MaintenanceStatus
  description: string
  scheduledDate: string
  completedDate?: string
  technicianName?: string
  estimatedHours: number
  actualHours?: number
  partsUsed?: string[]
  cost?: number
  notes?: string
  createdAt: string
  updatedAt?: string
}

/* =========================================================
HOTEL INVENTORY
========================================================= */

export type RoomType =
  | "STANDARD"
  | "DELUXE"
  | "SUITE"
  | "EXECUTIVE"
  | "PRESIDENTIAL"

export type HotelProperty = {
  id: string
  hotelPartnerId: string
  name: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  latitude?: number
  longitude?: number
  amenities: string[]
  totalRooms: number
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE"
  createdAt: string
  updatedAt?: string
}

export type RoomInventory = {
  id: string
  propertyId: string
  roomType: RoomType
  roomNumber?: string
  floor?: number
  capacity: number
  baseRate: number
  currency: "INR" | "USD"
  amenities: string[]
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "BLOCKED"
  createdAt: string
  updatedAt?: string
}

export type HotelBooking = {
  id: string
  bookingReference: string
  propertyId: string
  roomId?: string
  charterId?: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  totalAmount: number
  currency: "INR" | "USD"
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED"
  paymentStatus: "PENDING" | "PAID" | "REFUNDED"
  specialRequests?: string
  createdAt: string
  updatedAt?: string
}

/* =========================================================
NOTIFICATIONS
========================================================= */

export type NotificationType =
  | "RFQ_CREATED"
  | "RFQ_EXPIRING"
  | "QUOTE_RECEIVED"
  | "BOOKING_CONFIRMED"
  | "PAYMENT_RECEIVED"
  | "SEAT_REQUEST"
  | "APPROVAL_PENDING"
  | "SYSTEM_ALERT"

export type NotificationPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT"

export type Notification = {
  id: string
  userId: string
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  link?: string
  read: boolean
  archived: boolean
  createdAt: string
  expiresAt?: string
}

/* =========================================================
SUBSCRIPTION & BILLING
========================================================= */

export type SubscriptionTier =
  | "FREE"
  | "STARTER"
  | "PROFESSIONAL"
  | "ENTERPRISE"

export type SubscriptionStatus =
  | "ACTIVE"
  | "TRIAL"
  | "EXPIRED"
  | "CANCELLED"
  | "PAST_DUE"

export type Subscription = {
  id: string
  entityId: string
  entityType: "OPERATOR" | "AGENCY" | "CORPORATE" | "HOTEL"
  tier: SubscriptionTier
  status: SubscriptionStatus
  startDate: string
  endDate: string
  trialEndsAt?: string
  autoRenew: boolean
  price: number
  currency: "INR" | "USD"
  features: string[]
  createdAt: string
  updatedAt?: string
}
