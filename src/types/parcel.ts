// src/types/parcel.ts
export interface IParcelCreatePayload {
  type: string;              // e.g. "document", "package"
  weight: number;            // parcel weight
  deliveryDate: string;      // ISO date string
  pickupPhone: string;       // sender pickup phone
  deliveryPhone: string;     // sender delivery phone

  pickupAddress: {
    division: string;
    area: string;
    postOffice: string;
    district?: string;
    extra?: string;
  };

  deliveryAddress: {
    division: string;
    area: string;
    postOffice: string;
    district?: string;
    extra?: string;
  };
}



// src/types/parcel.ts

export type TParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

export interface IUpdateTrackingPayload {
  trackingId: string;
  currentStatus: TParcelStatus; // sender শুধু CANCELLED বা RETURNED দিতে পারবে
}



export type UserRef = {
  _id: string;
  name: string;
  email: string;
};

export type Address = {
  division: string;
  area: string;
  postOffice: string;
  district: string;
  extra?: string;
};


export type TAddress = {
  division: string;
  area: string;
  postOffice: string;
  district: string;
  extra?: string;
};
export type Sender = {
  userId: UserRef;   // ✅ nested object
  name: string;
  pickupAddress: TAddress;
  deliveryAddress: TAddress;
  pickupPhone: string;
  deliveryPhone: string;

};

export type Receiver = {
  userId: UserRef;   // ✅ nested object
  name: string;
  receiverPhone: string;
  pickupAddress: TAddress;
  deliveryAddress: TAddress;
  pickupPhone: string;
  deliveryPhone: string;
};

export type Ratings = {
  receiverToSender: {
    rating: number;
    feedback?: string;
  } | null;
  senderToReceiver: {
    rating: number;
    feedback?: string;
  } | null;
};



export type Parcel = {
  _id: string;
  trackingId: string;
  type: string;
  weight: number;
  fee: number;
  currentStatus: TParcelStatus;
  receiver?: Receiver; // optional, কিছু parcel এ receiver নাও থাকতে পারে
  sender?: Sender;   // sender structure একই রকম
  ratings?: Ratings;
};